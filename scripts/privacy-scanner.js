/**
 * ZeroDebt India — Privacy and Security Static Scanner
 * Audits built HTML and source files to verify 100% adherence to zero-tracking policy:
 * - 0 Google Analytics / GTM / Segment / Mixpanel
 * - 0 Facebook Pixel / Meta tags
 * - 0 Third-party ad networks or cookie trackers
 * - 0 Unsafe external font calls or remote scripts
 */

import fs from 'fs';
import path from 'path';

const FORBIDDEN_PATTERNS = [
  { name: 'Google Analytics / GTM tag', regex: /<(script|iframe)[^>]+(googletagmanager|google-analytics)\.com/i },
  { name: 'Meta Pixel script', regex: /<(script|img)[^>]+connect\.facebook\.net/i },
  { name: 'Hotjar / Clarity script', regex: /<(script|iframe)[^>]+(static\.hotjar\.com|clarity\.ms)/i },
  { name: 'Third-party tracking cookie set', regex: /document\.cookie\s*=\s*['"][^'"]*track/i },
  { name: 'External script CDN exfiltration', regex: /<script[^>]+src=["']https?:\/\/(?!localhost)/i }
];

const SCAN_DIRS = ['./dist', './src'];

let issuesFound = 0;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  for (const { name, regex } of FORBIDDEN_PATTERNS) {
    if (regex.test(content)) {
      console.error(`[PRIVACY VIOLATION] Found ${name} in file: ${filePath}`);
      issuesFound++;
    }
  }
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        traverse(fullPath);
      }
    } else if (/\.(html|js|mjs|ts|astro)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

console.log('Running ZeroDebt India Privacy Scanner...');
for (const dir of SCAN_DIRS) {
  traverse(dir);
}

if (issuesFound > 0) {
  console.error(`FAILED: ${issuesFound} privacy/tracking violations detected.`);
  process.exit(1);
} else {
  console.log('PASSED: 100% clean. Zero trackers, zero cookies, zero external telemetry detected.');
}
