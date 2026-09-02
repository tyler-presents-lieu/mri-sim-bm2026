#!/usr/bin/env bash
# Offline launcher for macOS/Linux.
# Serves offline-demo/app on http://localhost:8080 using Python's built-in
# http.server. No internet connection or extra dependencies required beyond
# a Python 3 install.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${SCRIPT_DIR}/app"
PORT=8080

if [ ! -d "${APP_DIR}" ]; then
  echo "Error: app directory not found at ${APP_DIR}" >&2
  exit 1
fi

cd "${APP_DIR}"

echo "Serving ${APP_DIR} at http://localhost:${PORT}"
echo "Press Ctrl+C to stop."

python3 -m http.server "${PORT}"
