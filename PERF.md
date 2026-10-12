# Addis Eats performance record (PERF.md)

## Measurement integrity

**No Lighthouse measurements are claimed in this repository yet.** The starting, unoptimized source revision was not supplied alongside this project, and this environment did not complete dependency installation, so it would be misleading to invent a baseline, final LCP/CLS/INP values, or deltas. Fill the table below with real reports from the same machine/browser/Lighthouse version and the same throttling configuration. Keep the baseline report before applying optimizations.

## Test protocol

- Target: production build, `http://localhost:3000/`
- Device: Lighthouse mobile emulation
- Throttling: `--throttling-method=simulate`
- Metrics: LCP (ms), CLS (unitless), INP (ms)
- Record date, Lighthouse version, commit, and browser version with each run.
- INP may be unavailable in a fresh lab run because it is a field metric. Record `N/A` when the report does not include it; do not replace it with Total Blocking Time (TBT).

## Results

| Stage | LCP (ms) | CLS | INP (ms) | Evidence / interpretation |
|---|---:|---:|---:|---|
| Baseline, before any changes | NOT MEASURED | NOT MEASURED | NOT MEASURED | Run Lighthouse against the original unoptimized commit before editing it. Save the JSON and HTML report. |
| After image conversion and sizing | NOT MEASURED | NOT MEASURED | NOT MEASURED | `next/image` provides responsive image delivery; explicit intrinsic dimensions reserve layout space. Compare with baseline. |
| After hero priority | NOT MEASURED | NOT MEASURED | NOT MEASURED | Only the largest above-the-fold hero image uses `priority`; this may improve LCP if that image is the LCP element. |
| After local font migration | NOT MEASURED | NOT MEASURED | NOT MEASURED | `next/font/local` self-hosts Inter and avoids a separate Google Fonts stylesheet connection; compare CLS and LCP rather than assuming improvement. |
| After lazy third-party script | NOT MEASURED | NOT MEASURED | NOT MEASURED | `next/script` with `lazyOnload` defers optional analytics until the browser is idle. Analytics is off unless configured. |
| Final optimized production build | NOT MEASURED | NOT MEASURED | NOT MEASURED | Run the same Lighthouse settings after all changes. No delta can be stated until these runs are complete. |

## Optimizations present in the code

1. **Images:** the hero uses `next/image`, intrinsic width/height, meaningful alt text, and a responsive `sizes` attribute. Search the project for `<img` to check for regressions.
2. **Priority:** exactly one image has `priority`—the hero image. Do not add it to other images without measurement evidence.
3. **Fonts:** `app/layout.tsx` uses `next/font/local` with the self-hosted Inter files in `public/fonts/`; no external font `<link>` is required.
4. **Third-party scripts:** optional analytics uses `next/script` with `strategy="lazyOnload"`. Keep it unset in `.env.local` unless the deployment intentionally needs it.
5. **Remote images:** current images are local under `/public`, so there are no remote image hosts to allow. `next.config.ts` explicitly sets `remotePatterns: []`. If a remote image is introduced, add only its exact HTTPS host to `remotePatterns`.
6. **Environment files:** `.env.example` is committed as a safe template. `.gitignore` excludes `.env`, `.env.local`, `.env.*.local`, and `.env*.local`. Never put a secret in a `NEXT_PUBLIC_*` variable because those values are exposed to the browser. `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ANALYTICS_SRC` are public configuration, not secrets.

## Run the production measurement

In PowerShell, from the project root:

```powershell
npm install
npm run build
npm run start
```

Leave that terminal running. In a second terminal:

```powershell
npm run lighthouse:prod
npm run lighthouse:summary -- performance/lighthouse-after.json
```

The raw report files are written to `performance/lighthouse-after.json` and `performance/lighthouse-after.html`. Copy the measured values into this document and retain the raw files as evidence (they are gitignored by default to avoid committing large, machine-specific reports).

### How to measure the true baseline

Before changing the original project, run the same production-build and Lighthouse commands and save the output as `performance/lighthouse-before.json` and `performance/lighthouse-before.html`. The original pre-optimization source is not included in this archive, so a true historical baseline cannot be recreated from this optimized source alone. For a fair step-by-step attribution, create a commit after each change and repeat the same run; do not attribute the whole final delta to a single optimization.
