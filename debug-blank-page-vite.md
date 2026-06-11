# Debug Session: blank-page-vite

- Status: OPEN
- Symptom: The site renders a blank page and the browser console shows Vite connection resets/refusals.
- Goal: Identify whether the issue is caused by the dev server, dependency resolution, or a client-side runtime crash.

## Hypotheses

1. The Vite dev server is not starting correctly, so the browser only shows failed module requests and a blank page.
2. The app has a client-side runtime exception during initial render, causing React to fail before paint.
3. One of the heavier dependencies, likely the 3D stack, is causing the runtime to break on startup.
4. The project dependency state is inconsistent, so the app resolves differently between install/build/run.
5. Browser extension logs are noisy but unrelated, and the real fault is inside the local project boot process.

## Evidence Log

- Reproduced locally with `npx vite --host 0.0.0.0 --port 5173`.
- Vite starts, then exits during dependency optimization.
- Terminal evidence:
  - `Could not resolve "potpack"`
  - Source: `node_modules/three-stdlib/misc/ProgressiveLightmap.js:2`
  - Impact: dev server exits, browser receives connection reset/refused errors, resulting in a blank page.
- Hypothesis status:
  - H1 confirmed: the dev server is failing to stay up.
  - H3 partially confirmed: the failure is inside the 3D dependency chain.
  - H4 confirmed: dependency state is incomplete for the chosen 3D stack.
  - H2 not yet supported: no app-render exception observed because boot fails earlier.
  - H5 supported: browser extension warnings are not the primary blocker.
- Fix applied:
  - Added `potpack` to project dependencies.
  - Installed the missing package with `npm.cmd install potpack`.
- Post-fix verification:
  - `npx vite --host 0.0.0.0 --port 5173` reaches `VITE v7.3.5 ready`.
  - Production build now outputs `dist/index.html` and bundled assets successfully.
- Root cause:
  - The 3D dependency chain via `three-stdlib` required `potpack`, but it was not installed in the project dependency set.

## Next Step

- Have the user restart the local dev server and confirm whether the page now renders normally.
