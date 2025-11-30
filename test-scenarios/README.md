# Test Scenarios

This directory contains test scenarios for data-driven testing of Google Flights using Playwright MCP.

## Files

### Markdown Test Scenarios
Detailed test documentation with step-by-step instructions:

- **01-basic-flight-search.md** - Core flight search functionality tests
- **02-filtering-and-sorting.md** - Filter and sort options tests
- **03-date-selection.md** - Date picker and calendar tests
- **04-multi-city-booking.md** - Multi-city itinerary tests
- **05-autocomplete-validation.md** - Airport autocomplete validation tests

### Excel Test Scenarios

- **flight-test-scenarios.xlsx** - Data-driven test scenarios in Excel format

## Excel File Structure

The Excel file `flight-test-scenarios.xlsx` contains four sheets designed for data-driven testing:

### Sheet 1: BasicFlightSearch
Test scenarios for basic flight search functionality.

| Column | Description |
|--------|-------------|
| Test ID | Unique identifier (BFS-XXX) |
| Test Name | Descriptive test name |
| Trip Type | Round-trip or One-way |
| Origin | Origin airport code (e.g., JFK) |
| Destination | Destination airport code (e.g., LAX) |
| Departure Date | Relative date (e.g., "+21 days") |
| Return Date | Relative date or N/A for one-way |
| Adults | Number of adult passengers |
| Children | Number of child passengers |
| Infants | Number of infant passengers |
| Cabin Class | Economy, Premium Economy, Business, or First |
| Expected Result | Expected test outcome |
| Status | Pass/Fail/Not Run |

### Sheet 2: FilterAndSort
Test scenarios for filter and sort functionality.

| Column | Description |
|--------|-------------|
| Test ID | Unique identifier (FS-XXX) |
| Test Name | Descriptive test name |
| Search Route | Route to search (e.g., "JFK to LAX") |
| Filter Type | Type of filter (Stops/Price/Airline/Time/Duration) |
| Filter Value | Specific filter value to apply |
| Sort By | Sort option (Best/Price/Duration) |
| Expected Behavior | Expected filter/sort outcome |
| Status | Pass/Fail/Not Run |

### Sheet 3: DateSelection
Test scenarios for date selection and calendar functionality.

| Column | Description |
|--------|-------------|
| Test ID | Unique identifier (DS-XXX) |
| Test Name | Descriptive test name |
| Date Type | Departure/Return/One-way |
| Date Value | Relative date value |
| Expected Behavior | Expected date selection outcome |
| Edge Case | Yes/No - indicates edge case scenarios |
| Status | Pass/Fail/Not Run |

### Sheet 4: MultiCity
Test scenarios for multi-city booking.

| Column | Description |
|--------|-------------|
| Test ID | Unique identifier (MC-XXX) |
| Test Name | Descriptive test name |
| Segment 1 | First flight segment (From-To-Date) |
| Segment 2 | Second flight segment |
| Segment 3 | Third flight segment |
| Segment 4 | Fourth flight segment (if applicable) |
| Expected Result | Expected multi-city booking outcome |
| Status | Pass/Fail/Not Run |

## Usage

### Generating the Excel File

To regenerate the Excel file with updated test scenarios:

```bash
npm run generate:scenarios
```

This runs the script at `scripts/generate-test-scenarios-xlsx.js` which creates the Excel file programmatically.

### Using with Playwright Tests

The Excel file can be used for data-driven testing. Example approach:

```javascript
import XLSX from 'xlsx';

// Read the Excel file
const workbook = XLSX.readFile('test-scenarios/flight-test-scenarios.xlsx');

// Get data from a specific sheet
const sheetName = 'BasicFlightSearch';
const worksheet = workbook.Sheets[sheetName];
const testData = XLSX.utils.sheet_to_json(worksheet);

// Use test data in your tests
for (const scenario of testData) {
  test(scenario['Test Name'], async ({ page }) => {
    // Test implementation using scenario data
    const origin = scenario['Origin'];
    const destination = scenario['Destination'];
    // ... rest of test
  });
}
```

### Updating Test Scenarios

1. **Modify the generation script**: Edit `scripts/generate-test-scenarios-xlsx.js` to add or modify test scenarios
2. **Regenerate the file**: Run `npm run generate:scenarios`
3. **Verify changes**: Open the Excel file to verify the changes

### Test Coverage Summary

| Sheet | Scenarios | Coverage |
|-------|-----------|----------|
| BasicFlightSearch | 12 | Domestic/international routes, various passenger configs, cabin classes |
| FilterAndSort | 12 | Stops, price, airline, time, duration filters, and sorting options |
| DateSelection | 12 | Standard dates, edge cases, calendar navigation |
| MultiCity | 10 | 3-4 segment trips, international routing, edge cases |
| **Total** | **46** | |

## Date Format Notes

- Relative dates use format like "+21 days" meaning 21 days from today
- This allows tests to remain valid without manual date updates
- Your test framework should parse these relative dates at runtime

## Status Values

- **Not Run** - Test has not been executed
- **Pass** - Test passed successfully
- **Fail** - Test failed (add notes in a separate column if needed)
