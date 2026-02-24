#!/usr/bin/env python3
"""Validate that backend scoring matches the shared scores.json."""
import json
import sys
from pathlib import Path

from scoring import QUESTION_SCORES

SCORES_JSON = Path(__file__).parent.parent / "src" / "data" / "scores.json"


def main():
    with open(SCORES_JSON) as f:
        frontend_scores = json.load(f)

    mismatches = []
    for q_id_str, options in frontend_scores.items():
        q_id = int(q_id_str)
        if q_id not in QUESTION_SCORES:
            mismatches.append(f"Q{q_id}: missing in backend")
            continue
        for opt_id, scores in options.items():
            backend = QUESTION_SCORES[q_id].get(opt_id)
            if backend is None:
                mismatches.append(f"Q{q_id}.{opt_id}: missing in backend")
            elif dict(backend) != scores:
                mismatches.append(f"Q{q_id}.{opt_id}: frontend={scores} backend={dict(backend)}")

    if mismatches:
        print("SCORING MISMATCH DETECTED:")
        for m in mismatches:
            print(f"  - {m}")
        sys.exit(1)
    else:
        print("All scores are in sync.")
        sys.exit(0)


if __name__ == "__main__":
    main()
