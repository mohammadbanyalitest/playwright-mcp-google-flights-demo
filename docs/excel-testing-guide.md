# 📊 Excel Testing Guide

> Guide for updating test execution results in the Excel file using the CLI tool and programmatic API

---

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Command Line Usage](#command-line-usage)
- [Programmatic API](#programmatic-api)
- [Batch Updates](#batch-updates)
- [Integration with Tests](#integration-with-tests)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Excel updater utility allows you to automatically update test execution results in the `test-scenarios/flight-test-scenarios.xlsx` file. This is useful when:

- Running tests via VS Code Chat/AI agents
- Automating test result tracking
- Batch updating multiple test results
- Resetting test execution status

### Excel File Structure

The Excel file contains 4 sheets:
- **BasicFlightSearch** - Basic flight search test scenarios (BFS-001 to BFS-012)
- **FilterAndSort** - Filter and sort test scenarios (FS-001 to FS-012)
- **DateSelection** - Date selection test scenarios (DS-001 to DS-012)
- **MultiCity** - Multi-city booking test scenarios (MC-001 to MC-010)

### Updated Columns

The utility updates the following columns:
- **Execution Result*** - Pass, Fail, Not Run, or Blocked
- **Observed Results (In case of failure)*** - Actual results if failed
- **Executed By*** - Name of executor (e.g., 'AI Agent', 'Automated')
- **Execution Date*** - Date in YYYY-MM-DD format
- **Comments** - Optional comments

---

## Installation

The Excel updater is included in this repository. No additional installation is required.

Ensure dependencies are installed:

```bash
npm install
```

---

## Command Line Usage

### Basic Syntax

```bash
node scripts/update-test-result.js [options]
```

Or use npm scripts:

```bash
npm run update:result -- [options]
npm run update:result:pass -- --sheet <sheet> --testId <id> [other options]
npm run update:result:fail -- --sheet <sheet> --testId <id> [other options]
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--sheet` | `-s` | Sheet name (required) |
| `--testId` | `-t` | Test case ID (required) |
| `--result` | `-r` | Execution result (Pass, Fail, Not Run, Blocked) |
| `--observed` | `-o` | Observed results (for failures) |
| `--executedBy` | `-e` | Name of executor |
| `--date` | `-d` | Execution date (YYYY-MM-DD) |
| `--comments` | `-c` | Optional comments |
| `--reset` | | Reset test execution to default |
| `--backup` | `-b` | Create backup before updating |
| `--batch` | | Batch update from JSON file |
| `--list` | `-l` | List available sheets |
| `--list-tests` | | List test case IDs (requires --sheet) |
| `--details` | | Get test case details |
| `--help` | `-h` | Show help message |

### Examples

#### Update Single Test - Pass

```bash
node scripts/update-test-result.js \
  --sheet BasicFlightSearch \
  --testId BFS-001 \
  --result Pass \
  --executedBy "AI Agent (Claude)" \
  --date 2025-12-01 \
  --comments "Executed via VS Code Chat"
```

#### Update Single Test - Fail

```bash
node scripts/update-test-result.js \
  --sheet BasicFlightSearch \
  --testId BFS-002 \
  --result Fail \
  --observed "Search button was disabled" \
  --executedBy "AI Agent" \
  --date 2025-12-01
```

#### Reset Test Execution

```bash
node scripts/update-test-result.js \
  --sheet BasicFlightSearch \
  --testId BFS-001 \
  --reset
```

#### Update with Backup

```bash
node scripts/update-test-result.js \
  --sheet BasicFlightSearch \
  --testId BFS-001 \
  --result Pass \
  --executedBy "Automated" \
  --date 2025-12-01 \
  --backup
```

#### List Available Sheets

```bash
node scripts/update-test-result.js --list
```

Output:
```
Available sheets:
  - BasicFlightSearch
  - FilterAndSort
  - DateSelection
  - MultiCity
```

#### List Test Case IDs

```bash
node scripts/update-test-result.js --sheet BasicFlightSearch --list-tests
```

Output:
```
Test case IDs in BasicFlightSearch:
  - BFS-001
  - BFS-002
  - BFS-003
  ...
```

#### Get Test Case Details

```bash
node scripts/update-test-result.js --sheet BasicFlightSearch --testId BFS-001 --details
```

---

## Programmatic API

### Import the Module

```javascript
import { 
  updateTestExecution,
  batchUpdateTestExecutions,
  resetTestExecution,
  getAvailableSheets,
  getTestCaseIds,
  getTestCaseDetails
} from './tests/utils/excel-updater.js';
```

### Update Single Test

```javascript
await updateTestExecution('BasicFlightSearch', 'BFS-001', {
  executionResult: 'Pass',
  observedResults: '',
  executedBy: 'AI Agent',
  executionDate: new Date().toISOString().split('T')[0],
  comments: 'Test executed successfully via Playwright'
});
```

### Update with Options

```javascript
const result = await updateTestExecution('BasicFlightSearch', 'BFS-001', {
  executionResult: 'Fail',
  observedResults: 'Flight search returned empty results',
  executedBy: 'Automated Test',
  executionDate: '2025-12-01',
  comments: 'API returned error 500'
}, {
  createBackup: true  // Create backup before updating
});

console.log('Update result:', result);
```

### Reset Test Execution

```javascript
await resetTestExecution('BasicFlightSearch', 'BFS-001');
```

### Get Available Sheets

```javascript
const sheets = getAvailableSheets();
console.log(sheets); // ['BasicFlightSearch', 'FilterAndSort', 'DateSelection', 'MultiCity']
```

### Get Test Case IDs

```javascript
const testIds = getTestCaseIds('BasicFlightSearch');
console.log(testIds); // ['BFS-001', 'BFS-002', ...]
```

### Get Test Case Details

```javascript
const details = getTestCaseDetails('BasicFlightSearch', 'BFS-001');
console.log(details);
```

---

## Batch Updates

### Command Line Batch Update

Create a JSON file with the updates:

```json
{
  "updates": [
    {
      "sheetName": "BasicFlightSearch",
      "testCaseId": "BFS-001",
      "executionData": {
        "executionResult": "Pass",
        "executedBy": "AI Agent",
        "executionDate": "2025-12-01",
        "comments": "Automated execution"
      }
    },
    {
      "sheetName": "BasicFlightSearch",
      "testCaseId": "BFS-002",
      "executionData": {
        "executionResult": "Fail",
        "observedResults": "Search returned no results",
        "executedBy": "AI Agent",
        "executionDate": "2025-12-01"
      }
    },
    {
      "sheetName": "FilterAndSort",
      "testCaseId": "FS-001",
      "executionData": {
        "executionResult": "Pass",
        "executedBy": "AI Agent",
        "executionDate": "2025-12-01"
      }
    }
  ],
  "options": {
    "createBackup": true
  }
}
```

Run the batch update:

```bash
node scripts/update-test-result.js --batch updates.json
```

### Programmatic Batch Update

```javascript
import { batchUpdateTestExecutions } from './tests/utils/excel-updater.js';

const updates = [
  {
    sheetName: 'BasicFlightSearch',
    testCaseId: 'BFS-001',
    executionData: {
      executionResult: 'Pass',
      executedBy: 'AI Agent',
      executionDate: '2025-12-01'
    }
  },
  {
    sheetName: 'BasicFlightSearch',
    testCaseId: 'BFS-002',
    executionData: {
      executionResult: 'Pass',
      executedBy: 'AI Agent',
      executionDate: '2025-12-01'
    }
  }
];

const result = await batchUpdateTestExecutions(updates, { createBackup: true });
console.log(`Updated ${result.successCount} of ${result.totalUpdates} tests`);
```

---

## Integration with Tests

### Example Playwright Test with Excel Update

Create a test file that updates the Excel file after execution:

```javascript
// tests/example-with-update.spec.js
import { test, expect } from '@playwright/test';
import { updateTestExecution } from './utils/excel-updater.js';

test('BFS-001: Round-trip domestic flight - Solo traveler', async ({ page }) => {
  const testCaseId = 'BFS-001';
  const sheetName = 'BasicFlightSearch';
  const executionDate = new Date().toISOString().split('T')[0];
  
  try {
    // Navigate to Google Flights
    await page.goto('https://www.google.com/travel/flights');
    
    // Perform test steps...
    // ...
    
    // Test passed - update Excel
    await updateTestExecution(sheetName, testCaseId, {
      executionResult: 'Pass',
      executedBy: 'Playwright Automated',
      executionDate,
      comments: 'Automated test execution'
    });
    
  } catch (error) {
    // Test failed - update Excel with failure details
    await updateTestExecution(sheetName, testCaseId, {
      executionResult: 'Fail',
      observedResults: error.message,
      executedBy: 'Playwright Automated',
      executionDate,
      comments: 'Test failed during automated execution'
    });
    
    throw error; // Re-throw to mark test as failed
  }
});
```

### Using with VS Code Chat/AI Agents

After running a test via VS Code Chat, you can update the Excel file:

```bash
# After successful test
node scripts/update-test-result.js \
  --sheet BasicFlightSearch \
  --testId BFS-001 \
  --result Pass \
  --executedBy "AI Agent (Claude)" \
  --date $(date +%Y-%m-%d) \
  --comments "Executed via VS Code Chat"

# After failed test
node scripts/update-test-result.js \
  --sheet BasicFlightSearch \
  --testId BFS-001 \
  --result Fail \
  --observed "Error: Element not found" \
  --executedBy "AI Agent (Claude)" \
  --date $(date +%Y-%m-%d)
```

---

## Troubleshooting

### Common Issues

#### Excel file not found

**Error:** `Excel file not found: /path/to/file.xlsx`

**Solution:** Ensure the Excel file exists at `test-scenarios/flight-test-scenarios.xlsx`. You can regenerate it:

```bash
npm run generate:scenarios
```

#### Sheet not found

**Error:** `Sheet not found: "SheetName". Available sheets: ...`

**Solution:** Use the correct sheet name. List available sheets:

```bash
node scripts/update-test-result.js --list
```

#### Test Case ID not found

**Error:** `Test Case ID not found: "XXX-999" in sheet "SheetName"`

**Solution:** Verify the test case ID exists. List test IDs:

```bash
node scripts/update-test-result.js --sheet BasicFlightSearch --list-tests
```

#### Invalid execution result

**Error:** `Invalid execution result: "...". Valid values are: Pass, Fail, Not Run, Blocked`

**Solution:** Use one of the valid execution result values.

#### Invalid date format

**Error:** `Invalid date format: "...". Expected format: YYYY-MM-DD`

**Solution:** Use the correct date format (e.g., 2025-12-01).

#### File permission issues

**Error:** Permission denied or file is locked

**Solution:** 
1. Close the Excel file if it's open in another application
2. Ensure you have write permissions to the file
3. Check if the file is read-only

### Getting Help

```bash
node scripts/update-test-result.js --help
```

---

## Valid Values Reference

### Execution Results
- `Pass` - Test passed
- `Fail` - Test failed
- `Not Run` - Test has not been executed
- `Blocked` - Test is blocked by another issue

### Sheet Names
- `BasicFlightSearch` - Basic flight search tests
- `FilterAndSort` - Filter and sort tests
- `DateSelection` - Date selection tests
- `MultiCity` - Multi-city booking tests

### Test Case ID Prefixes
- `BFS-XXX` - Basic Flight Search
- `FS-XXX` - Filter and Sort
- `DS-XXX` - Date Selection
- `MC-XXX` - Multi-City

---

<div align="center">

**Need more help?**

[📘 Setup Guide](setup-guide.md) | [📚 Best Practices](best-practices.md) | [🎬 Demo Script](demo-script.md)

</div>
