# Offline Demo — Operator Instructions

This folder is a self-contained, offline-runnable copy of the demo. It does
**not** require an internet connection. Follow the steps for your operating
system to launch it on presentation day.

## What you need

- The `offline-demo` folder (this folder), unzipped to a local disk.
- Python 3 installed on the machine you're demoing on (most macOS/Linux
  machines have it; on Windows you may need to install it from
  python.org — check this **before** presentation day).
  Nothing else needs to be installed: `app/` is a static copy of the
  demo (HTML/CSS/JS only, no external fonts, images, or API calls), so
  it only needs Python's built-in `http.server` module, not FastAPI,
  Uvicorn, or any `pip install` step.

## Running on macOS / Linux

1. Open a terminal.
2. Navigate to this folder (or just double-click `start.sh` if your file
   manager allows running scripts).
3. If running from the terminal:
   ```bash
   cd /path/to/offline-demo
   ./start.sh
   ```
   If you get a "permission denied" error, run:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
4. Leave the terminal window open — it is running the local server.

## Running on Windows

1. Open File Explorer and navigate to this folder.
2. Double-click `start.bat`.
   - A command window will open and stay open while the server runs.
3. If double-clicking does nothing, open Command Prompt and run:
   ```bat
   cd \path\to\offline-demo
   start.bat
   ```

## Expected Startup Behavior

- A terminal/command window opens and prints something like:
  ```text
  Serving .../offline-demo/app at http://localhost:8080
  Press Ctrl+C to stop.
  ```
- Open a web browser and go to: **http://localhost:8080**
- The demo should load within a few seconds. Keep the terminal/command
  window open for the entire demo — closing it stops the server.
- To stop the server when you're done, go back to that window and press
  `Ctrl+C`.

## Troubleshooting

**"Port 8080 already in use" / address already in use**
- Another process is using port 8080. Close other local servers, or edit
  `start.sh` / `start.bat` and change `PORT=8080` (or `%PORT%`) to another
  number like `8081`, then browse to that port instead.

**"python3: command not found" (macOS/Linux) or "py is not recognized"
(Windows)**
- Python 3 is not installed or not on PATH. Install Python 3 from
  python.org before presentation day, or find an alternate machine with
  Python already installed.

**Nothing happens when double-clicking the script**
- Some systems block script execution from File Explorer/Finder. Open a
  terminal/Command Prompt manually and run the script from there (see
  steps above).

**Wrong working directory / "app directory not found" error**
- Make sure you're running the script from inside the unzipped
  `offline-demo` folder, and that the `app/` folder exists alongside
  `start.sh` / `start.bat`. Don't move the scripts out of this folder.

**Browser shows a blank page or 404**
- Confirm the URL is exactly `http://localhost:8080` (not `https://`).
- Confirm the terminal/command window is still open and hasn't shown an
  error.

## Fallback (if the launcher fails entirely)

If `start.sh` / `start.bat` fail to run for any reason and the app is a
static site, you can often skip the local server entirely:

1. Open the `app/` folder directly in a file manager.
2. Double-click `index.html` (if present) to open it directly in your
   browser via a `file://` URL.
3. This may not support every feature (some browsers block certain requests
   from `file://` pages), but it is a reasonable last-resort fallback to
   keep the demo visually working.

## Keeping this package in sync with the main app

`app/` is a snapshot of the live demo in `web/` (`web/index.html` and
`web/static/`). If that source changes, regenerate this folder before your
next presentation by running, from the repository root:

```bash
./offline-demo/sync-app.sh
```

Then re-run the offline smoke test in `OFFLINE_PLAN.md` before your next
presentation.
