#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

ENV_FILE="${SCRIPT_DIR}/.env"
if [[ -f "$ENV_FILE" ]]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

: "${CF_STACK_NAME:=sleep-type-infra}"
: "${AWS_REGION:=ap-northeast-2}"
: "${STAGE:=prod}"
: "${DOMAIN_NAME:=sleeptypequiz.com}"

require_var() {
  local var="$1"
  if [[ -z "${!var:-}" ]]; then
    echo "ERROR: $var is not set" >&2
    exit 1
  fi
}

cf_output() {
  local key="$1"
  aws cloudformation describe-stacks \
    --stack-name "$CF_STACK_NAME" \
    --region "$AWS_REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='${key}'].OutputValue" \
    --output text
}

step() { echo; echo "==> $*"; }

deploy_infrastructure() {
  step "Deploying CloudFormation stack: $CF_STACK_NAME"
  require_var DB_PASSWORD
  require_var HOSTED_ZONE_ID
  require_var ACM_CERTIFICATE_ARN

  aws cloudformation deploy \
    --stack-name "$CF_STACK_NAME" \
    --template-file "${SCRIPT_DIR}/cloudformation/infrastructure.yml" \
    --region "$AWS_REGION" \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides \
      DomainName="$DOMAIN_NAME" \
      AcmCertificateArn="$ACM_CERTIFICATE_ARN" \
      HostedZoneId="$HOSTED_ZONE_ID" \
      DBPassword="$DB_PASSWORD" \
      Stage="$STAGE"

  export VPC_SECURITY_GROUP_ID="$(cf_output LambdaSecurityGroupId)"
  export VPC_SUBNET_ID_1="$(cf_output PrivateSubnet1Id)"
  export VPC_SUBNET_ID_2="$(cf_output PrivateSubnet2Id)"
  export DB_HOST="$(cf_output RDSEndpoint)"
  export S3_BUCKET_NAME="$(cf_output FrontendBucketName)"
  export CLOUDFRONT_DISTRIBUTION_ID="$(cf_output CloudFrontDistributionId)"
}

run_schema() {
  step "Running schema.sql against RDS"
  require_var DB_HOST
  require_var DB_USER
  require_var DB_PASSWORD
  require_var DB_NAME

  PGPASSWORD="$DB_PASSWORD" psql \
    -h "$DB_HOST" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    -f "${SCRIPT_DIR}/schema.sql"
}

deploy_backend() {
  step "Deploying Lambda functions via Serverless Framework"
  require_var VPC_SECURITY_GROUP_ID
  require_var VPC_SUBNET_ID_1
  require_var VPC_SUBNET_ID_2

  cd "$SCRIPT_DIR"
  npx serverless deploy --stage "$STAGE" --region "$AWS_REGION"
  cd "$ROOT_DIR"
}

deploy_frontend() {
  step "Building frontend"
  cd "$ROOT_DIR"
  npm ci
  npm run build

  step "Syncing to S3: s3://${S3_BUCKET_NAME}"
  require_var S3_BUCKET_NAME

  aws s3 sync dist/ "s3://${S3_BUCKET_NAME}/" \
    --region "$AWS_REGION" \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html"

  aws s3 sync dist/ "s3://${S3_BUCKET_NAME}/" \
    --region "$AWS_REGION" \
    --exclude "*" \
    --include "*.html" \
    --cache-control "public, max-age=3600, must-revalidate" \
    --content-type "text/html; charset=utf-8"

  step "Invalidating CloudFront cache"
  require_var CLOUDFRONT_DISTRIBUTION_ID

  aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --paths "/*"
}

COMMANDS="${*:-all}"

case "$COMMANDS" in
  infra)      deploy_infrastructure ;;
  schema)     run_schema ;;
  backend)    deploy_backend ;;
  frontend)   deploy_frontend ;;
  all)
    deploy_infrastructure
    run_schema
    deploy_backend
    deploy_frontend
    step "Deploy complete: https://${DOMAIN_NAME}"
    ;;
  *)
    echo "Usage: $0 [infra|schema|backend|frontend|all]"
    exit 1
    ;;
esac
