#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BACKUP_DIR="$ROOT_DIR/backups/brief-redesign-20260215-153456"

cp "$BACKUP_DIR/shared/briefRenderer.js" "$ROOT_DIR/shared/briefRenderer.js"
cp "$BACKUP_DIR/core/styles.css" "$ROOT_DIR/core/styles.css"
cp "$BACKUP_DIR/core/components/accordion.js" "$ROOT_DIR/core/components/accordion.js"
cp "$BACKUP_DIR/pages/service-live/page.js" "$ROOT_DIR/pages/service-live/page.js"
cp "$BACKUP_DIR/pages/service-video/page.js" "$ROOT_DIR/pages/service-video/page.js"
cp "$BACKUP_DIR/pages/service-support/page.js" "$ROOT_DIR/pages/service-support/page.js"

echo "Rollback complete: brief redesign reverted from backups/brief-redesign-20260215-153456"
