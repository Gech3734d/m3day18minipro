# Lighthouse performance record

This report is intentionally not filled with invented measurements. Lighthouse scores depend on the machine, browser, network simulation, exact production build, and deployment. Run the commands below and copy the values from the generated Lighthouse JSON/HTML into the table. Do not mark a comparison complete until both runs use the same Lighthouse version, form factor, URL, and throttling method.

## Test setup

- URL: `http://localhost:3000/` (replace with deployed URL for the final verification)
- Build: production (`npm run build`, then `npm run start`)
- Lighthouse form factor: mobile
- Throttling: simulated mobile throttling (`--throttling-method=simulate`)
- Metrics to record: LCP (ms), CLS (unitless), INP (ms; field data may be unavailable on a fresh local run)
- Browser/device and date: fill in when measured

## Measurements

| Stage | LCP (ms) | CLS | INP (ms) | Notes |
|---|---:|---:|---:|---|
| Baseline before changes | Not measured in this environment | Not measured | Not measured | Run Lighthouse against the original commit/build before applying the optimizations. |
| Change 1 — replace `<img>` with `next/image`, add intrinsic dimensions and accurate `sizes` | Record result | Record result | Record result | Compare against baseline. |
| Change 2 — prioritize the single largest above-the-fold image | Record result | Record result | Record result | Only the hero image has `priority`. |
| Change 3 — self-host font through `next/font/local` | Record result | Record result | Record result | Compare CLS and font loading; avoid claiming improvement without measurement. |
| Change 4 — third-party script uses `next/script` with `lazyOnload` | Record result | Record result | Record result | Optional analytics is off unless `NEXT_PUBLIC_ANALYTICS_SRC` is configured. |
| Final optimized build | Record result | Record result | Record result | Repeat on the deployed URL in a private window. |

## Commands

From the project root, in PowerShell:

```powershell
npm install
npm run build
npm run start
```

Keep that terminal running. In a second terminal, run:

```powershell
npm run lighthouse:prod
```

The command writes `performance/lighthouse-after.html` and `performance/lighthouse-after.json`. Lighthouse may not report a meaningful INP metric without real-user field data or an interaction run; record it as unavailable rather than substituting TBT. For a trace with interactions, use Lighthouse's timespan/user-flow mode or Chrome DevTools and document the exact method.

For a fair before/after comparison, check out/build the unoptimized starting revision first and run Lighthouse before applying the changes. Then apply one change at a time, build production each time, and record LCP/CLS/INP. This source archive starts at the optimized implementation, so the original pre-change numbers cannot be reconstructed honestly from this archive alone.

## Implemented changes in this app

1. The hero illustration uses `next/image` with intrinsic `width={960}` and `height={720}`, meaningful alt text, and a responsive `sizes` attribute.
2. Only that largest above-the-fold image has `priority`; other images must not receive priority without evidence.
3. The body font is self-hosted in `public/fonts/` and loaded via `next/font/local` with `display: "swap"` and preload.
4. Optional analytics is rendered with `next/script` and `strategy="lazyOnload"`; it is disabled when the environment variable is empty.
5. `.env.example` documents public configuration, while `.gitignore` excludes `.env.local`, `.env.*.local`, and `.env*.local` files.
