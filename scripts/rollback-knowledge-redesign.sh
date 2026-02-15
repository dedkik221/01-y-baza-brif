#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BACKUP_DIR="$ROOT_DIR/backups/knowledge-redesign-20260215-152624"

cp "$BACKUP_DIR/core/styles.css" "$ROOT_DIR/core/styles.css"
cp "$BACKUP_DIR/pages/knowledge-article/page.js" "$ROOT_DIR/pages/knowledge-article/page.js"
cp "$BACKUP_DIR/shared/mockData.js" "$ROOT_DIR/shared/mockData.js"
rm -f "$ROOT_DIR/shared/knowledgeRenderer.js"

echo "Rollback complete: knowledge redesign reverted to backup 20260215-152624"
