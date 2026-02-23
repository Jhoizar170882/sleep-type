import os
import psycopg2
from psycopg2 import pool

_connection_pool: pool.SimpleConnectionPool | None = None


def _db_config() -> dict:
    return {
        "host": os.environ["DB_HOST"],
        "dbname": os.environ["DB_NAME"],
        "user": os.environ["DB_USER"],
        "password": os.environ["DB_PASSWORD"],
        "port": int(os.environ.get("DB_PORT", "5432")),
        "connect_timeout": 10,
        "sslmode": "require",
    }


def _get_pool() -> pool.SimpleConnectionPool:
    global _connection_pool
    if _connection_pool is None or _connection_pool.closed:
        _connection_pool = pool.SimpleConnectionPool(
            minconn=1,
            maxconn=5,
            **_db_config(),
        )
    return _connection_pool


def get_connection() -> psycopg2.extensions.connection:
    for attempt in range(2):
        conn = _get_pool().getconn()
        if conn.closed == 0:
            return conn
        _get_pool().putconn(conn)
    return _get_pool().getconn()


def release_connection(conn: psycopg2.extensions.connection) -> None:
    _get_pool().putconn(conn)
