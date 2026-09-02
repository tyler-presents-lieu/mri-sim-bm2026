# Implementation Log - 2026-09-01

## Completed

- Set up a FastAPI/PDM local presentation server serving the browser canvas app.
- Built slide 1: a single stationary spin at a fixed random angle that aligns when the main field is applied.
- Added three simultaneous equivalent views: isometric 3D, top-down, and phase-color.
- Added slide navigation by arrow buttons, arrow keys, and a slide jump menu.
- Built slide 2: a single aligned spin with a presenter-controlled RF-frequency slider. Releasing the slider applies a pulse; resonance at 0.10 Hz gives the strongest tip.
- Built slide 3: a horizontal line of spins under a visible low-to-high field gradient. Releasing the RF-frequency slider applies a narrow excitation pulse at the matching location.
- Applied a twilight-inspired cyclic phase palette. In phase views, phase colors the spin background and brightness encodes excitation magnitude.
- Added a compact hover/focus phase-brightness slider for live presentation adjustment.
- Corrected the projection cue: the vertical $B_0$ arrow is now shown only in the isometric view, not the top-down views.
- Added RF carrier-wave and scrolling signal-amplitude strips to the resonance and position-selection slides.

## Verification

- `node --check web/static/main.js` passes.
- The running server on port 8000 returns the current HTML and JavaScript controls.

## Next Slides

- Uniform 2D grid with coherent precession.
- X-gradient dephasing over three seconds.
- Independent X/Y gradients and the receive-signal bridge.

## 2026-09-02 Progress

- Started slide 4 with a selectable uniform-field grid scene and configurable grid size.
- Added a reset control and numeric scene shortcuts while preserving the existing dashboard navigation.
- Updated the position-selection scene to draw a continuous field/frequency curve tied to each spin's position-dependent frequency.
- Added slide 5 for x-gradient dephasing, including a configurable normalized gradient and position-dependent phase spread.
- Reduced the heading scale to keep the simulation dashboard as the visual focus.
- Hardened direct scene selection and changed the navigator labels to reflect the five currently implemented scenes.
- Fixed slide 5 navigation: the renderer existed, but its scene definition was missing from the JavaScript scene registry, so index 4 was clamped back to slide 4.
- Added slide 6 for independent X/Y gradients with separate controls and two-dimensional phase variation.
- Added slide 7 as a signal bridge, showing the gradient grid alongside the aggregate receive trace.
- Added a version query to the JavaScript asset URL so browsers cannot retain the pre-slide-4 renderer while loading the newer scene selector.
- Compressed the shared header and subtitle spacing so the simulation dashboard dominates each scene.
- Reworked the signal-bridge trace to sample the normalized complex sum of the displayed grid spins, rather than an analytic dephasing proxy; the live readout now shows combined signal strength directly.

## Verification Notes

- `node --check web/static/main.js` passes.
- Automated browser and model tests are still not present in this repository; manual browser rehearsal remains next.
- The active server returns the new slide 5 markup and `/api/health` returns `{"status":"ok"}`.
- The active server serves the slide 6/7 selectors and signal-bridge renderer markers.