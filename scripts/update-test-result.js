#!/usr/bin/env node

import {
  updateTestExecution,
  batchUpdateTestExecutions,
  resetTestExecution,
  getAvailableSheets,
  getTestCaseIds,
  getTestCaseDetails,
  VALID_EXECUTION_RESULTS
} from '../tests/utils/excel-updater.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse command line arguments
 * @returns {object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    sheet: null,
    testId: null,
    result: null,
    observed: '',
    executedBy: '',
    date: '',
    comments: '',
    reset: false,
    backup: false,
    batch: null,
    list: false,
    listTests: false,
    details: false,
    help: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];
    
    switch (arg) {
      case '--sheet':
      case '-s':
        result.sheet = nextArg;
        i++;
        break;
      case '--testId':
      case '-t':
        result.testId = nextArg;
        i++;
        break;
      case '--result':
      case '-r':
        result.result = nextArg;
        i++;
        break;
      case '--observed':
      case '-o':
        result.observed = nextArg;
        i++;
        break;
      case '--executedBy':
      case '-e':
        result.executedBy = nextArg;
        i++;
        break;
      case '--date':
      case '-d':
        result.date = nextArg;
        i++;
        break;
      case '--comments':
      case '-c':
        result.comments = nextArg;
        i++;
        break;
      case '--reset':
        result.reset = true;
        break;
      case '--backup':
      case '-b':
        result.backup = true;
        break;
      case '--batch':
        result.batch = nextArg;
        i++;
        break;
      case '--list':
      case '-l':
        result.list = true;
        break;
      case '--list-tests':
        result.listTests = true;
        break;
      case '--details':
        result.details = true;
        break;
      case '--help':
      case '-h':
        result.help = true;
        break;
    }
  }
  
  return result;
}

/**
 * Display help message
 */
function showHelp() {
  console.log(`
Update Test Result - CLI tool for updating test execution results in Excel

Usage:
  node scripts/update-test-result.js [options]

Options:
  --sheet, -s <name>       Sheet name (e.g., BasicFlightSearch, FilterAndSort, DateSelection, MultiCity)
  --testId, -t <id>        Test case ID (e.g., BFS-001, FS-001)
  --result, -r <result>    Execution result (Pass, Fail, Not Run, Blocked)
  --observed, -o <text>    Observed results (for failures)
  --executedBy, -e <name>  Name of executor (e.g., 'AI Agent', 'Automated')
  --date, -d <date>        Execution date in YYYY-MM-DD format
  --comments, -c <text>    Optional comments
  --reset                  Reset test execution to default values
  --backup, -b             Create backup before updating
  --batch <file>           Batch update from JSON file
  --list, -l               List available sheets
  --list-tests             List test case IDs (requires --sheet)
  --details                Get test case details (requires --sheet and --testId)
  --help, -h               Show this help message

Examples:
  # Update single test result with Pass
  node scripts/update-test-result.js --sheet BasicFlightSearch --testId BFS-001 --result Pass --executedBy "AI Agent" --date 2025-12-01

  # Update with failure and observed results
  node scripts/update-test-result.js --sheet BasicFlightSearch --testId BFS-002 --result Fail --observed "Search button was disabled" --executedBy "AI Agent" --date 2025-12-01

  # Reset test execution
  node scripts/update-test-result.js --sheet BasicFlightSearch --testId BFS-001 --reset

  # Update with backup
  node scripts/update-test-result.js --sheet BasicFlightSearch --testId BFS-001 --result Pass --executedBy "Automated" --date 2025-12-01 --backup

  # Batch update from JSON file
  node scripts/update-test-result.js --batch updates.json

  # List available sheets
  node scripts/update-test-result.js --list

  # List test case IDs in a sheet
  node scripts/update-test-result.js --sheet BasicFlightSearch --list-tests

  # Get test case details
  node scripts/update-test-result.js --sheet BasicFlightSearch --testId BFS-001 --details

Batch Update JSON Format:
  {
    "updates": [
      {
        "sheetName": "BasicFlightSearch",
        "testCaseId": "BFS-001",
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
`);
}

/**
 * Main function
 */
function main() {
  const args = parseArgs();
  
  // Show help
  if (args.help) {
    showHelp();
    return;
  }
  
  // List available sheets
  if (args.list) {
    try {
      const sheets = getAvailableSheets();
      console.log('Available sheets:');
      sheets.forEach(sheet => console.log(`  - ${sheet}`));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    return;
  }
  
  // List test case IDs
  if (args.listTests) {
    if (!args.sheet) {
      console.error('Error: --sheet is required with --list-tests');
      process.exit(1);
    }
    try {
      const testIds = getTestCaseIds(args.sheet);
      console.log(`Test case IDs in ${args.sheet}:`);
      testIds.forEach(id => console.log(`  - ${id}`));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    return;
  }
  
  // Get test case details
  if (args.details) {
    if (!args.sheet || !args.testId) {
      console.error('Error: --sheet and --testId are required with --details');
      process.exit(1);
    }
    try {
      const details = getTestCaseDetails(args.sheet, args.testId);
      if (details) {
        console.log(`Test case details for ${args.testId}:`);
        console.log(JSON.stringify(details, null, 2));
      } else {
        console.log(`Test case ${args.testId} not found in ${args.sheet}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    return;
  }
  
  // Batch update from JSON file
  if (args.batch) {
    try {
      const batchFile = path.resolve(args.batch);
      if (!fs.existsSync(batchFile)) {
        console.error(`Error: Batch file not found: ${batchFile}`);
        process.exit(1);
      }
      
      let batchData;
      try {
        batchData = JSON.parse(fs.readFileSync(batchFile, 'utf-8'));
      } catch (parseError) {
        console.error(`Error: Failed to parse batch file JSON: ${batchFile}`);
        console.error(`  ${parseError.message}`);
        process.exit(1);
      }
      
      if (!batchData.updates || !Array.isArray(batchData.updates)) {
        console.error('Error: Batch file must contain an "updates" array');
        process.exit(1);
      }
      
      console.log(`Processing batch update with ${batchData.updates.length} updates...`);
      
      const result = batchUpdateTestExecutions(batchData.updates, batchData.options || {});
      
      console.log(`\nBatch update complete:`);
      console.log(`  Total updates: ${result.totalUpdates}`);
      console.log(`  Successful: ${result.successCount}`);
      console.log(`  Failed: ${result.errorCount}`);
      
      if (result.backupPath) {
        console.log(`  Backup created: ${result.backupPath}`);
      }
      
      if (result.errors.length > 0) {
        console.log('\nErrors:');
        result.errors.forEach(err => {
          console.log(`  - ${err.sheetName}/${err.testCaseId}: ${err.error}`);
        });
      }
      
      if (result.results.length > 0) {
        console.log('\nSuccessful updates:');
        result.results.forEach(res => {
          console.log(`  - ${res.sheetName}/${res.testCaseId}: ${res.updatedFields.executionResult}`);
        });
      }
      
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    return;
  }
  
  // Single update or reset
  if (!args.sheet) {
    console.error('Error: --sheet is required');
    showHelp();
    process.exit(1);
  }
  
  if (!args.testId) {
    console.error('Error: --testId is required');
    showHelp();
    process.exit(1);
  }
  
  try {
    let result;
    
    if (args.reset) {
      // Reset test execution
      console.log(`Resetting test execution for ${args.testId} in ${args.sheet}...`);
      result = resetTestExecution(args.sheet, args.testId, { createBackup: args.backup });
      console.log(`\n✅ Test execution reset successfully`);
    } else {
      // Validate result is provided
      if (!args.result) {
        console.error('Error: --result is required (or use --reset to reset)');
        process.exit(1);
      }
      
      // Validate result value
      if (!VALID_EXECUTION_RESULTS.includes(args.result)) {
        console.error(`Error: Invalid result value "${args.result}". Valid values: ${VALID_EXECUTION_RESULTS.join(', ')}`);
        process.exit(1);
      }
      
      // Build execution data
      const executionData = {
        executionResult: args.result
      };
      
      if (args.observed) {
        executionData.observedResults = args.observed;
      }
      
      if (args.executedBy) {
        executionData.executedBy = args.executedBy;
      }
      
      if (args.date) {
        executionData.executionDate = args.date;
      }
      
      if (args.comments) {
        executionData.comments = args.comments;
      }
      
      console.log(`Updating test execution for ${args.testId} in ${args.sheet}...`);
      result = updateTestExecution(args.sheet, args.testId, executionData, { createBackup: args.backup });
      console.log(`\n✅ Test execution updated successfully`);
    }
    
    // Display results
    console.log(`\nDetails:`);
    console.log(`  Sheet: ${result.sheetName}`);
    console.log(`  Test Case ID: ${result.testCaseId}`);
    console.log(`\nUpdated fields:`);
    Object.entries(result.updatedFields).forEach(([key, value]) => {
      if (value !== undefined) {
        console.log(`  ${key}: ${value || '(empty)'}`);
      }
    });
    
    console.log(`\nPrevious values:`);
    Object.entries(result.previousValues).forEach(([key, value]) => {
      console.log(`  ${key}: ${value || '(empty)'}`);
    });
    
    if (result.backupPath) {
      console.log(`\nBackup created: ${result.backupPath}`);
    }
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
