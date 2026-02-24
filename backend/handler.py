import hashlib
import json
import logging
import os
import time
from decimal import Decimal

import db
import scoring

logger = logging.getLogger()
logger.setLevel(logging.INFO)

_stats_cache: dict | None = None
_stats_cache_time: float = 0
STATS_CACHE_TTL = 60  # seconds

CORS_HEADERS = {
    "Access-Control-Allow-Origin": os.environ.get("ALLOWED_ORIGIN", "*"),
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Content-Type": "application/json",
}

try:
    db._get_pool()
except Exception:
    logger.warning("Database pool initialization deferred — env vars may not be set yet")


def _json_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")


def _ok(body: dict, status: int = 200) -> dict:
    return {
        "statusCode": status,
        "headers": CORS_HEADERS,
        "body": json.dumps(body, default=_json_default),
    }


def _error(message: str, status: int = 400) -> dict:
    return {
        "statusCode": status,
        "headers": CORS_HEADERS,
        "body": json.dumps({"error": message}),
    }


def sleep_type_submit(event: dict, _context) -> dict:
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return _error("Invalid JSON body")

    answers = body.get("answers")
    locale = body.get("locale", "ko")

    if not isinstance(answers, list) or len(answers) != 10:
        return _error("'answers' must be a list of exactly 10 items")

    if locale not in {"ko", "en", "ja", "zh", "es", "fr", "de", "pt", "vi", "th"}:
        return _error("'locale' must be one of: 'ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'vi', 'th'")

    for item in answers:
        if not isinstance(item, dict):
            return _error("Each answer must be an object")
        if "questionId" not in item or "optionId" not in item:
            return _error("Each answer must have 'questionId' and 'optionId'")
        if not isinstance(item["questionId"], int):
            return _error("'questionId' must be an integer")
        if item["questionId"] not in scoring.VALID_QUESTION_IDS:
            return _error(f"'questionId' must be between 1 and 10")
        if item["optionId"] not in scoring.VALID_OPTION_IDS:
            return _error(f"'optionId' must be one of: {sorted(scoring.VALID_OPTION_IDS)}")

    seen_question_ids = {a["questionId"] for a in answers}
    if len(seen_question_ids) != len(answers):
        return _error("Duplicate questionId entries are not allowed")

    try:
        result = scoring.calculate_chronotype(answers)
    except ValueError as exc:
        return _error(str(exc))

    user_agent = (event.get("headers") or {}).get("User-Agent", "")
    ip_address = (
        (event.get("requestContext") or {})
        .get("identity", {})
        .get("sourceIp", "")
    )

    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO quiz_results (chronotype, scores, locale, user_agent, ip_hash)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (
                    result["chronotype"],
                    json.dumps(result["scores"]),
                    locale,
                    user_agent[:256] if user_agent else None,
                    hashlib.sha256(ip_address.encode()).hexdigest() if ip_address else None,
                ),
            )
            cur.execute("SELECT COUNT(*) FROM quiz_results")
            total_tests = cur.fetchone()[0]
        conn.commit()
    except Exception:
        conn.rollback()
        logger.exception("Database error in /api/submit")
        return _error("Internal server error", 500)
    finally:
        db.release_connection(conn)

    return _ok(
        {
            "chronotype": result["chronotype"],
            "scores": result["scores"],
            "totalTests": total_tests,
        },
        201,
    )


def sleep_type_stats(_event: dict, _context) -> dict:
    global _stats_cache, _stats_cache_time
    now = time.time()
    if _stats_cache and (now - _stats_cache_time) < STATS_CACHE_TTL:
        return _ok(_stats_cache)

    conn = db.get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) FROM quiz_results")
            total_tests = cur.fetchone()[0]

            cur.execute(
                """
                SELECT chronotype, COUNT(*) AS cnt
                FROM quiz_results
                GROUP BY chronotype
                """
            )
            rows = cur.fetchall()
    except Exception:
        logger.exception("Database error in /api/stats")
        return _error("Internal server error", 500)
    finally:
        db.release_connection(conn)

    distribution: dict[str, float] = {}
    if total_tests > 0:
        counts: dict[str, int] = {row[0]: row[1] for row in rows}
        for animal in scoring.CHRONOTYPES:
            pct = round(counts.get(animal, 0) / total_tests * 100, 1)
            distribution[animal] = pct
    else:
        distribution = {animal: 0.0 for animal in scoring.CHRONOTYPES}

    result_body = {"totalTests": total_tests, "distribution": distribution}
    _stats_cache = result_body
    _stats_cache_time = time.time()
    return _ok(result_body)
