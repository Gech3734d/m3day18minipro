import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const file = process.argv[2] || "performance/lighthouse-after.json";
let report;
try {
  report = JSON.parse(readFileSync(resolve(file), "utf8"));
} catch (error) {
  console.error(`Could not read Lighthouse JSON at ${file}. Run Lighthouse first.`, error.message);
  process.exit(1);
}
const audits = report.audits || {};
const metric = (id) => audits[id]?.numericValue;
const formatMs = (value) => Number.isFinite(value) ? `${Math.round(value)} ms` : "Not available in this Lighthouse run";
const cls = metric("cumulative-layout-shift");
const lcp = metric("largest-contentful-paint");
const inp = metric("interaction-to-next-paint");
console.log(`Report: ${file}`);
console.log(`URL: ${report.finalDisplayedUrl || report.requestedUrl || "unknown"}`);
console.log(`LCP: ${formatMs(lcp)}`);
console.log(`CLS: ${Number.isFinite(cls) ? cls.toFixed(3) : "Not available in this Lighthouse run"}`);
console.log(`INP: ${formatMs(inp)}`);
console.log("Note: a lab Lighthouse run may not provide INP. Do not substitute TBT for INP.");
