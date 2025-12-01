# Copilot Instructions

This document provides instructions for GitHub Copilot when working with this repository.

## Project Overview

This is a Playwright MCP (Model Context Protocol) Google Flights Demo project that demonstrates data-driven testing using Playwright with Excel/CSV test data.

## Agent Workflow

The agent follows a strict 7-phase workflow defined in `agent/workflow.md`:
- Phase 0: Intake & Intent Validation
- Phase 1: Pre-flight Validation & Environment Setup
- Phase 2: Plan & Data Preparation
- Phase 3: Execute Tests / Exploration
- Phase 4: Capture Evidence & Persist Results
- Phase 5: Review, Tune & Iterate
- Phase 6: Closeout & Narrative Report

Always follow these phases in order for consistent, reproducible results.

## Key Files and Directories

- `tests/` - Test specifications and test data
- `scripts/` - Utility scripts for data conversion and result updates
- `screenshots/` - Screenshot artifacts from test runs
- `test-results/` - Test result artifacts and reports
- `logs/` - Audit logs from test runs
- `agent/` - Agent configuration and workflow documentation

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in headed mode
npm run test:headed

# Run data-driven tests
npm run test:data

# Convert CSV to XLSX
npm run convert:csv
```
