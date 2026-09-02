# Offline Deployment Plan (Tier 2)

## Current status

`offline-demo/app` now contains a working, static copy of the demo
(`web/index.html` + `web/static/`). The demo is a self-contained canvas
animation with no server-side API calls, external fonts, or CDN
dependencies, so `offline-demo/start.sh` / `start.bat` can serve it with
nothing more than Python's built-in `http.server` — no `pip install` of
FastAPI/Uvicorn is required on the presentation machine. If `web/` changes,
run `./offline-demo/sync-app.sh` from the repo root to refresh `app/`, then
redo the validation checklist below.

## Objective

Build a **Tier 2 offline runnable demo package** for `mri-sim-bm2026` so the
presentation can run on any computer with **no internet connection**. This is
not slides or a video — it is the actual working demo, packaged so it can be
launched from a USB drive or local disk.

## Folder Layout

Create this exact structure at the repo root:

```text
offline-demo/
  app/                 # built app or runtime code (what actually runs)
  assets/              # images/videos/models/static files used by the demo
  data/                # sample/demo datasets needed at runtime
  deps/                # vendored dependencies (only if needed offline)
  start.sh             # macOS/Linux launcher
  start.bat            # Windows launcher
  README-OFFLINE.md    # operator instructions for presentation day
```

## Implementation Workflow

This workflow is intentionally **stack-agnostic** — it works whether the app
ends up being a static web build, a Python/Node script, or a compiled binary.

1. **Build app artifacts in Codespaces.**
   Run whatever build/export step the project stack requires (e.g. `npm run
   build`, `python -m build`, PyInstaller, etc.) so you have a runnable
   artifact instead of raw source that needs live tooling.

2. **Copy runtime artifacts/assets/data into `offline-demo/`.**
   - App output/build → `offline-demo/app/`
   - Images, video, models, static files → `offline-demo/assets/`
   - Sample/demo datasets → `offline-demo/data/`

3. **Vendor dependencies if needed.**
   If the runtime needs packages installed and the target machine may not
   have internet, pre-fetch them into `offline-demo/deps/` (for example,
   `pip wheel -r requirements.txt -w offline-demo/deps/wheels` or `npm pack`
   equivalents) so install steps can run with `--no-index` /
   `--offline` flags.

4. **Run an offline smoke test (no network).**
   Disable networking (turn off Wi-Fi / disconnect) on a test machine, unzip
   the package, and run `start.sh` or `start.bat`. Walk through the full demo
   interaction path you plan to show. Fix anything that silently depends on
   the network.

5. **Zip the package for transfer.**
   Zip the entire `offline-demo/` folder (e.g. `mri-sim-offline-demo.zip`)
   and copy it to a USB drive and/or local storage for transfer to the
   presentation machine.

## Pre-Presentation Validation Checklist

Do this on a **second machine**, or after disconnecting the network, before
the day of the talk:

- [ ] Disable Wi-Fi / unplug network.
- [ ] Unzip the package to a clean folder.
- [ ] Run `start.sh` (macOS/Linux) or `start.bat` (Windows).
- [ ] Confirm startup completes in a reasonable time (target: under 30s).
- [ ] Open the demo in a browser and walk the exact path you'll show live.
- [ ] Repeat the test after a full cold reboot.
- [ ] Note the fallback plan (see `offline-demo/README-OFFLINE.md`) in case
      the launcher fails on stage.

## Backup Recommendations

- Keep the verified zip on **two separate USB drives**.
- Also copy the zip to local storage (e.g. Downloads) on the presentation
  device as a third copy.
- Bring a printed or offline copy of `offline-demo/README-OFFLINE.md` in case
  you need to hand the laptop to someone else to run it.
- Re-validate the package any time the app or its assets change — an
  out-of-date offline package is worse than none.
