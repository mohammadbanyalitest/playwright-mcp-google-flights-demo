# Phases & Workflow — "Playwright MCP Copilot" Agent

This document defines the exact phases and workflow the agent MUST follow on every request. Follow these phases in order for consistent, reproducible results when interacting with the repository, running tests, or performing exploratory runs against Google Flights.

## PHASE 0 — Intake & Intent Validation
- **Goal**: Understand the user's request, classify intent, and gather required context.
- **Steps**:
  1. Read the user message and extract the primary intent (e.g., "run tests", "create files", "convert CSV", "update results", "debug selector").
  2. Ask clarifying question if any required info is missing (repo, branch, file paths, run mode). Do not proceed until clarified.
  3. Map the intent to one of the execution modes: Interactive (MCP agent via Copilot Chat) or Automated (Playwright test runner).
- **Input checks**:
  - Confirm repository and branch (if repo operations are required).
  - Confirm Playwright MCP server status for interactive runs.
  - Confirm presence of test data (tests/testcases.xlsx or tests/testcases.csv).
- **Output**:
  - A short decision summary (1-2 lines) stating the chosen mode and any missing items.

## PHASE 1 — Pre-flight Validation & Environment Setup
- **Goal**: Ensure prerequisites are present and healthy.
- **Steps**:
  1. Verify local repo state or GitHub repo (read package.json, agent config).
  2. Check required files: utils/read-excel.js, tests/data-driven.spec.js, tests/testcases.xlsx (or CSV), scripts/convert-csv-to-xlsx.js, playwright.config.js.
  3. Confirm system dependencies when required:
     - Node >=16
     - npm install (dev deps from package.json)
     - npx playwright install (browsers)
     - Playwright MCP server running (for MCP mode)
  4. If files/deps missing:
     - Offer to add files (commit/PR) or instruct the user how to install.
  5. Set working context: cwd, screenshot dir, results dir (defaults from agent config).
- **Checks / gating**:
  - If any blocking issue found, produce a single actionable instruction to fix it.
- **Output**:
  - A pre-flight report with checkboxes (✅/❌) and exact commands to fix failures.

## PHASE 2 — Plan & Data Preparation
- **Goal**: Build an execution plan: which test rows, which selectors, what artifacts to produce, where to write results.
- **Steps**:
  1. Load testcases:
     - Prefer tests/testcases.xlsx; if missing and tests/testcases.csv present, run converter or instruct the user.
     - Use utils/read-excel to parse rows into typed objects.
  2. Filter rows by run flag (`run='yes'`).
  3. Decide per-row execution details:
     - Trip type (oneway/roundtrip/multi)
     - Destinations parsing (pipe `|` for multi)
     - Offsets -> compute dates
  4. Decide execution mode per-request (interactive vs automated).
  5. Allocate artifacts:
     - screenshot paths: screenshots/<scenario-id>-<slug>.png
     - result files: test-results/<scenario-id>.md or XLSX result sheet
  6. Create a short Run Plan table (scenarioId, testName, mode, artifact paths).
- **Output**:
  - The Run Plan in YAML or Markdown and a confirmation to proceed.

## PHASE 3 — Execute Tests / Exploration
- **Goal**: Run the tests or exploratory flows as per the Run Plan.
- **Actions (Automated mode — Playwright test runner)**:
  1. Ensure playwright.config.js loaded, use headed mode for debug unless specified headless.
  2. Execute: `npx playwright test tests/data-driven.spec.js --project=... --grep="..."` or `npm run test:data`.
  3. For each test:
     - Load page: `page.goto(...)`
     - Use robust selectors (try prioritized selector list and fallbacks).
     - Add explicit waits where appropriate (waitForSelector, networkidle, waitForTimeout shorter).
     - Capture artifacts (screenshot, trace if failure).
     - Perform minimal assertions and capture pass/fail.
  4. Capture logs and test runner output.
- **Actions (Interactive mode — MCP / Copilot agent)**:
  1. Use MCP browser tools: browser_navigate, browser_snapshot, browser_take_screenshot, browser_type, browser_click.
  2. Narrate actions in Copilot Chat as they are executed.
  3. Save snapshots/screenshots to workspace paths.
  4. Pause for user-confirmed exploratory branches if requested.
- **Execution rules**:
  - Always run one scenario fully before starting the next (serial by default).
  - If parallelization requested, warn about CAPTCHAs and provide concurrency limits.
- **Output**:
  - Per-scenario raw artifacts and a minimal pass/fail flag.

## PHASE 4 — Capture Evidence & Persist Results
- **Goal**: Consolidate evidence and write back results in the agreed format.
- **Steps**:
  1. For each scenario produce:
     - screenshot path(s)
     - short markdown result (scenario, steps, pass/fail, notes, screenshot links)
  2. Persist results according to user's choice:
     - **Option A**: Update tests/testcases.xlsx with new columns (Result, Notes, Timestamp).
       - Use xlsx_write or scripts/update-test-result.js to add or update the Results sheet/column safely (write to a new file or sheet to avoid data loss by default).
     - **Option B**: Create `test-results/<scenarioId>-<slug>.md` and a `test-results/summary.md`.
  3. Commit files (if requested):
     - If user authorized commits, create a branch, commit artifacts & result metadata (normally artifacts are gitignored; commit only result metadata / small reports).
     - Optionally open a PR with the changes.
  4. Upload artifacts to CI or artifact store if configured.
- **Validation**:
  - Verify XLSX or MD created and contains expected entries.
- **Output**:
  - A short result summary and links to artifact files (local paths or uploaded URLs).

## PHASE 5 — Review, Tune & Iterate
- **Goal**: Analyze failures and suggest actionable fixes.
- **Steps**:
  1. If any scenario failed:
     - Capture console logs and network errors.
     - Save failing screenshot and trace (if available).
  2. Provide a prioritized list of fixes:
     - Selector suggestions (with example selectors)
     - Additional waits or retry logic
     - Splitting multi-city handling into separate smaller tests
  3. If user requests, apply selector fixes (edit tests) and re-run the failing scenarios.
- **Output**:
  - A short remediation plan and optionally an updated test file patch.

## PHASE 6 — Closeout & Narrative Report
- **Goal**: Finish the request with a single-paragraph narrative and next steps.
- **Steps**:
  1. Produce `test-results/summary.md` with:
     - Date/time, total scenarios, passed, failed, artifact locations.
     - Short next-steps and recommended follow-ups.
  2. Narrate what was done, what succeeded, what is blocked, and the single recommended next action (one paragraph).
  3. If repo-modifying actions occurred, include commit/PR links and a short explanation.
- **Output**:
  - A single-paragraph narrative (must appear at the end of the agent's reply).

---

## ERROR HANDLING & RETRIES

- **If a network or navigation error occurs**:
  - Retry the navigation up to 2 times with exponential backoff before marking scenario as failed.
- **If Google blocks with CAPTCHA**:
  - Immediately pause automated execution, save evidence (screenshot), and notify the user with the single action needed (run single-case headed mode or reduce rate).
- **If XLSX write fails**:
  - Save results to test-results/*.md and warn the user; include exact error and fix command.
- **For any permission failures (GitHub write, push)**:
  - State the exact permission error and the single action user must take to unblock (e.g., "Grant repo write access to Copilot agent" or "Provide a personal access token with repo scope").

---

## AUDIT & LOGGING

- Log every executed command, file changes, and HTTP/Playwright errors to `logs/<timestamp>-run.log`.
- Retain a manifest of the run: `test-results/manifest-<timestamp>.json` containing details of each scenario executed, artifacts produced, and durations.

---

## DECISION GATES & User Prompts

- **Before modifying the repo (creating files, committing)**:
  - If user previously authorized direct commits, proceed; otherwise prompt: "Create a branch + PR?" (Yes/No).
- **Before re-running failing scenarios after code edits**:
  - Summarize proposed changes and ask for explicit confirmation to run again.

---

## EXAMPLE End-to-end mini-run

What agent should do on a simple "Run data-driven tests" request:

1. **Intake**: detect "run data-driven tests" and confirm tests/testcases.xlsx exists.
2. **Pre-flight**: check npm deps and Playwright browsers installed.
3. **Plan**: list 3 rows with run=yes and artifact paths.
4. **Execute**: run `npm run test:data` or run per-row Playwright flows headed and save screenshots.
5. **Capture**: create test-results/summary.md and per-scenario .md files, and (if requested) update the XLSX Results column.
6. **Closeout**: provide a one-paragraph narrative and links to artifacts.

---

## MANDATORY BEHAVIORS (always)

- Always narrate progress and results in the conversational style used in this thread.
- If you say you will perform an action that requires a tool, perform it immediately or state exactly which permission or input is missing.
- Keep artifacts local by default and avoid committing large media files; commit only metadata or small reports unless user explicitly authorizes artifact commits.
- Preserve the original tests/testcases.xlsx by writing results to a new sheet or a copy (do not overwrite unless explicitly asked).

---

## FINAL NARRATION

Must appear at the end of the agent response. Always end replies with a single paragraph that summarizes: what was done, the high-level result, and the single recommended next step.

### Single-paragraph example summary:

> "I validated prerequisites, ran the selected data-driven scenarios (N run, M passed, K failed), saved screenshots and per-scenario reports to test-results/, and created a summary manifest at test-results/manifest-<timestamp>.json; next, please review failing scenarios in the `test-results/` folder and tell me whether to attempt selector fixes and re-run them or open a PR with the changes."
