"""Local web server for the MRI teaching simulator."""

from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


PROJECT_ROOT = Path(__file__).resolve().parents[2]
WEB_ROOT = PROJECT_ROOT / "web"

app = FastAPI(title="MRI Simulator")
app.mount("/static", StaticFiles(directory=WEB_ROOT / "static"), name="static")


@app.get("/api/health")
def health_check() -> dict[str, str]:
    """Report that the local simulator server is available."""
    return {"status": "ok"}


@app.get("/")
def index() -> FileResponse:
    """Serve the first interactive presentation view."""
    return FileResponse(WEB_ROOT / "index.html")

