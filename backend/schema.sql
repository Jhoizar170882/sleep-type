CREATE TABLE IF NOT EXISTS quiz_results (
  id         SERIAL PRIMARY KEY,
  chronotype VARCHAR(10)  NOT NULL,
  scores     JSONB        NOT NULL,
  locale     VARCHAR(5)   DEFAULT 'ko',
  user_agent TEXT,
  ip_hash    VARCHAR(64),
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chronotype ON quiz_results(chronotype);
CREATE INDEX IF NOT EXISTS idx_created_at  ON quiz_results(created_at);
