#!/usr/bin/env bash
# Regenerates offline-demo/app from the live web/ source.
#
# The demo frontend (web/index.html + web/static/*) is a self-contained,
# client-side canvas animation with no external network calls, fonts, or
# CDN dependencies, so it can be served offline with nothing more than
# Python's built-in http.server (see start.sh / start.bat). This script
# copies the current source into offline-demo/app so the offline package
# stays in sync whenever web/ changes.
#
# Usage: run from the repo root or from offline-demo/:
#   ./offline-demo/sync-app.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
WEB_DIR="${REPO_ROOT}/web"
APP_DIR="${SCRIPT_DIR}/app"

if [ ! -d "${WEB_DIR}" ]; then
  echo "Error: web directory not found at ${WEB_DIR}" >&2
  exit 1
fi

rm -rf "${APP_DIR}"
mkdir -p "${APP_DIR}"
cp "${WEB_DIR}/index.html" "${APP_DIR}/index.html"
cp -r "${WEB_DIR}/static" "${APP_DIR}/static"
if [ -d "${SCRIPT_DIR}/assets" ]; then
  cp -r "${SCRIPT_DIR}/assets" "${APP_DIR}/assets"
fi

echo "Synced ${WEB_DIR} -> ${APP_DIR}"
