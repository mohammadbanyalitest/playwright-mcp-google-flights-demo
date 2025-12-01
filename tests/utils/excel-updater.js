import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default path to the Excel file
const DEFAULT_EXCEL_PATH = path.join(__dirname, '..', '..', 'test-scenarios', 'flight-test-scenarios.xlsx');

// Valid execution result values
const VALID_EXECUTION_RESULTS = ['Pass', 'Fail', 'Not Run', 'Blocked'];

// Column mapping based on Excel structure
const COLUMN_MAP = {
  testCaseId: 'Test Case ID*',
  area: 'Area*',
  testCaseName: 'Test Case Name*',
  testCaseDescription: 'Test Case Description*',
  stepsToReproduce: 'Steps To Reproduce*',
  expectedResults: 'Expected Results*',
  executionResult: 'Execution Result*',
  observedResults: 'Observed Results (In case of failure)*',
  testCaseSeverity: 'Test Case Severity*',
  executedBy: 'Executed By*',
  executionDate: 'Execution Date*',
  createdBy: 'Created By*',
  comments: 'Comments'
};

/**
 * Validate the execution data
 * @param {object} executionData - The execution data to validate
 * @throws {Error} If validation fails
 */
function validateExecutionData(executionData) {
  if (!executionData) {
    throw new Error('Execution data is required');
  }

  if (!executionData.executionResult) {
    throw new Error('Execution result is required');
  }

  if (!VALID_EXECUTION_RESULTS.includes(executionData.executionResult)) {
    throw new Error(`Invalid execution result: "${executionData.executionResult}". Valid values are: ${VALID_EXECUTION_RESULTS.join(', ')}`);
  }

  if (executionData.executionDate) {
    // Validate date format (YYYY-MM-DD) and actual date validity
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(executionData.executionDate)) {
      throw new Error(`Invalid date format: "${executionData.executionDate}". Expected format: YYYY-MM-DD`);
    }
    // Validate that it's a real date (not 2025-13-32)
    const parsedDate = new Date(executionData.executionDate);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid date: "${executionData.executionDate}" is not a valid date`);
    }
  }
}

/**
 * Create a backup of the Excel file
 * @param {string} excelPath - Path to the Excel file
 * @returns {string} Path to the backup file
 */
function createBackup(excelPath) {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
  const dir = path.dirname(excelPath);
  const ext = path.extname(excelPath);
  const base = path.basename(excelPath, ext);
  const backupPath = path.join(dir, `${base}-backup-${timestamp}${ext}`);
  
  fs.copyFileSync(excelPath, backupPath);
  return backupPath;
}

/**
 * Read the workbook from file
 * @param {string} excelPath - Path to the Excel file
 * @returns {object} The XLSX workbook
 */
function readWorkbook(excelPath) {
  if (!fs.existsSync(excelPath)) {
    throw new Error(`Excel file not found: ${excelPath}`);
  }
  return XLSX.readFile(excelPath);
}

/**
 * Get sheet data as JSON
 * @param {object} workbook - The XLSX workbook
 * @param {string} sheetName - Name of the sheet
 * @returns {Array} Array of row objects
 */
function getSheetData(workbook, sheetName) {
  if (!workbook.SheetNames.includes(sheetName)) {
    throw new Error(`Sheet not found: "${sheetName}". Available sheets: ${workbook.SheetNames.join(', ')}`);
  }
  
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

/**
 * Find row index by Test Case ID
 * @param {Array} data - Sheet data as array of objects
 * @param {string} testCaseId - The test case ID to find
 * @returns {number} The index of the row, or -1 if not found
 */
function findRowByTestCaseId(data, testCaseId) {
  return data.findIndex(row => row[COLUMN_MAP.testCaseId] === testCaseId);
}

/**
 * Update test execution results in Excel file
 * @param {string} sheetName - Name of sheet (e.g., 'BasicFlightSearch')
 * @param {string} testCaseId - Test case ID (e.g., 'BFS-001')
 * @param {object} executionData - Execution results
 * @param {string} executionData.executionResult - 'Pass', 'Fail', 'Not Run', or 'Blocked'
 * @param {string} [executionData.observedResults] - Actual results if failed, empty if passed
 * @param {string} [executionData.executedBy] - Name of executor (e.g., 'AI Agent', 'Automated')
 * @param {string} [executionData.executionDate] - Date in format YYYY-MM-DD
 * @param {string} [executionData.comments] - Optional comments
 * @param {object} [options] - Additional options
 * @param {string} [options.excelPath] - Custom path to Excel file
 * @param {boolean} [options.createBackup] - Whether to create backup before updating
 * @returns {object} Result of the update operation
 */
function updateTestExecution(sheetName, testCaseId, executionData, options = {}) {
  const excelPath = options.excelPath || DEFAULT_EXCEL_PATH;
  
  // Validate inputs
  if (!sheetName) {
    throw new Error('Sheet name is required');
  }
  
  if (!testCaseId) {
    throw new Error('Test Case ID is required');
  }
  
  validateExecutionData(executionData);
  
  // Read the workbook
  const workbook = readWorkbook(excelPath);
  
  // Create backup if requested
  let backupPath = null;
  if (options.createBackup) {
    backupPath = createBackup(excelPath);
  }
  
  // Get sheet data
  const data = getSheetData(workbook, sheetName);
  
  // Find the row to update
  const rowIndex = findRowByTestCaseId(data, testCaseId);
  if (rowIndex === -1) {
    throw new Error(`Test Case ID not found: "${testCaseId}" in sheet "${sheetName}"`);
  }
  
  // Store original values for logging
  const originalRow = { ...data[rowIndex] };
  
  // Update the row with execution data
  data[rowIndex][COLUMN_MAP.executionResult] = executionData.executionResult;
  
  if (executionData.observedResults !== undefined) {
    data[rowIndex][COLUMN_MAP.observedResults] = executionData.observedResults;
  }
  
  if (executionData.executedBy !== undefined) {
    data[rowIndex][COLUMN_MAP.executedBy] = executionData.executedBy;
  }
  
  if (executionData.executionDate !== undefined) {
    data[rowIndex][COLUMN_MAP.executionDate] = executionData.executionDate;
  }
  
  if (executionData.comments !== undefined) {
    data[rowIndex][COLUMN_MAP.comments] = executionData.comments;
  }
  
  // Convert back to sheet and preserve column widths
  const originalSheet = workbook.Sheets[sheetName];
  const columnWidths = originalSheet['!cols'];
  
  const newSheet = XLSX.utils.json_to_sheet(data);
  if (columnWidths) {
    newSheet['!cols'] = columnWidths;
  }
  
  // Replace the sheet in workbook
  workbook.Sheets[sheetName] = newSheet;
  
  // Write the updated workbook
  XLSX.writeFile(workbook, excelPath);
  
  return {
    success: true,
    sheetName,
    testCaseId,
    updatedFields: {
      executionResult: executionData.executionResult,
      observedResults: executionData.observedResults,
      executedBy: executionData.executedBy,
      executionDate: executionData.executionDate,
      comments: executionData.comments
    },
    previousValues: {
      executionResult: originalRow[COLUMN_MAP.executionResult],
      observedResults: originalRow[COLUMN_MAP.observedResults],
      executedBy: originalRow[COLUMN_MAP.executedBy],
      executionDate: originalRow[COLUMN_MAP.executionDate],
      comments: originalRow[COLUMN_MAP.comments]
    },
    backupPath
  };
}

/**
 * Update multiple test execution results in batch
 * @param {Array} updates - Array of update objects
 * @param {string} updates[].sheetName - Name of sheet
 * @param {string} updates[].testCaseId - Test case ID
 * @param {object} updates[].executionData - Execution results
 * @param {object} [options] - Additional options
 * @returns {object} Results of all update operations
 */
function batchUpdateTestExecutions(updates, options = {}) {
  const excelPath = options.excelPath || DEFAULT_EXCEL_PATH;
  
  if (!Array.isArray(updates) || updates.length === 0) {
    throw new Error('Updates array is required and must not be empty');
  }
  
  // Read the workbook once
  const workbook = readWorkbook(excelPath);
  
  // Create backup if requested
  let backupPath = null;
  if (options.createBackup) {
    backupPath = createBackup(excelPath);
  }
  
  const results = [];
  const errors = [];
  
  // Group updates by sheet for efficiency
  const updatesBySheet = {};
  for (const update of updates) {
    const { sheetName } = update;
    if (!updatesBySheet[sheetName]) {
      updatesBySheet[sheetName] = [];
    }
    updatesBySheet[sheetName].push(update);
  }
  
  // Process each sheet
  for (const [sheetName, sheetUpdates] of Object.entries(updatesBySheet)) {
    try {
      // Validate sheet exists
      if (!workbook.SheetNames.includes(sheetName)) {
        throw new Error(`Sheet not found: "${sheetName}". Available sheets: ${workbook.SheetNames.join(', ')}`);
      }
      
      // Get sheet data
      const data = getSheetData(workbook, sheetName);
      const originalSheet = workbook.Sheets[sheetName];
      const columnWidths = originalSheet['!cols'];
      
      // Process each update for this sheet
      for (const update of sheetUpdates) {
        try {
          const { testCaseId, executionData } = update;
          
          // Validate execution data
          validateExecutionData(executionData);
          
          // Find the row
          const rowIndex = findRowByTestCaseId(data, testCaseId);
          if (rowIndex === -1) {
            throw new Error(`Test Case ID not found: "${testCaseId}" in sheet "${sheetName}"`);
          }
          
          // Store original values
          const originalRow = { ...data[rowIndex] };
          
          // Update the row
          data[rowIndex][COLUMN_MAP.executionResult] = executionData.executionResult;
          
          if (executionData.observedResults !== undefined) {
            data[rowIndex][COLUMN_MAP.observedResults] = executionData.observedResults;
          }
          
          if (executionData.executedBy !== undefined) {
            data[rowIndex][COLUMN_MAP.executedBy] = executionData.executedBy;
          }
          
          if (executionData.executionDate !== undefined) {
            data[rowIndex][COLUMN_MAP.executionDate] = executionData.executionDate;
          }
          
          if (executionData.comments !== undefined) {
            data[rowIndex][COLUMN_MAP.comments] = executionData.comments;
          }
          
          results.push({
            success: true,
            sheetName,
            testCaseId,
            updatedFields: {
              executionResult: executionData.executionResult,
              observedResults: executionData.observedResults,
              executedBy: executionData.executedBy,
              executionDate: executionData.executionDate,
              comments: executionData.comments
            },
            previousValues: {
              executionResult: originalRow[COLUMN_MAP.executionResult],
              observedResults: originalRow[COLUMN_MAP.observedResults],
              executedBy: originalRow[COLUMN_MAP.executedBy],
              executionDate: originalRow[COLUMN_MAP.executionDate],
              comments: originalRow[COLUMN_MAP.comments]
            }
          });
        } catch (error) {
          errors.push({
            success: false,
            sheetName,
            testCaseId: update.testCaseId,
            error: error.message
          });
        }
      }
      
      // Convert back to sheet and update workbook
      const newSheet = XLSX.utils.json_to_sheet(data);
      if (columnWidths) {
        newSheet['!cols'] = columnWidths;
      }
      workbook.Sheets[sheetName] = newSheet;
      
    } catch (error) {
      // Add error for all updates in this sheet
      for (const update of sheetUpdates) {
        errors.push({
          success: false,
          sheetName,
          testCaseId: update.testCaseId,
          error: error.message
        });
      }
    }
  }
  
  // Write the updated workbook
  XLSX.writeFile(workbook, excelPath);
  
  return {
    totalUpdates: updates.length,
    successCount: results.length,
    errorCount: errors.length,
    results,
    errors,
    backupPath
  };
}

/**
 * Reset test execution results to default values
 * @param {string} sheetName - Name of sheet
 * @param {string} testCaseId - Test case ID
 * @param {object} [options] - Additional options
 * @returns {object} Result of the reset operation
 */
function resetTestExecution(sheetName, testCaseId, options = {}) {
  return updateTestExecution(sheetName, testCaseId, {
    executionResult: 'Not Run',
    observedResults: '',
    executedBy: '',
    executionDate: '',
    comments: ''
  }, options);
}

/**
 * Get available sheets in the Excel file
 * @param {object} [options] - Additional options
 * @returns {Array} List of sheet names
 */
function getAvailableSheets(options = {}) {
  const excelPath = options.excelPath || DEFAULT_EXCEL_PATH;
  const workbook = readWorkbook(excelPath);
  return workbook.SheetNames;
}

/**
 * Get test case IDs from a specific sheet
 * @param {string} sheetName - Name of sheet
 * @param {object} [options] - Additional options
 * @returns {Array} List of test case IDs
 */
function getTestCaseIds(sheetName, options = {}) {
  const excelPath = options.excelPath || DEFAULT_EXCEL_PATH;
  const workbook = readWorkbook(excelPath);
  const data = getSheetData(workbook, sheetName);
  return data.map(row => row[COLUMN_MAP.testCaseId]);
}

/**
 * Get test case details by ID
 * @param {string} sheetName - Name of sheet
 * @param {string} testCaseId - Test case ID
 * @param {object} [options] - Additional options
 * @returns {object|null} Test case details or null if not found
 */
function getTestCaseDetails(sheetName, testCaseId, options = {}) {
  const excelPath = options.excelPath || DEFAULT_EXCEL_PATH;
  const workbook = readWorkbook(excelPath);
  const data = getSheetData(workbook, sheetName);
  const row = data.find(r => r[COLUMN_MAP.testCaseId] === testCaseId);
  return row || null;
}

export {
  updateTestExecution,
  batchUpdateTestExecutions,
  resetTestExecution,
  getAvailableSheets,
  getTestCaseIds,
  getTestCaseDetails,
  VALID_EXECUTION_RESULTS,
  COLUMN_MAP
};
