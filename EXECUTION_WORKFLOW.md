# 🤖 Test Execution Workflow

> **How the Turki AI agent executes your Excel test cases**

---

## Overview

When you run `@playwright-tester Execute all test scenarios from the Excel file`, the agent follows a precise workflow to read, filter, execute, and update your test cases.

---

## Step-by-Step Execution Process

### 1️⃣ Read Configuration

**File:** `config/deployment.yaml`

The agent reads:
- Target website URL
- Domain type (travel, e-commerce, finance, custom)
- Excel file path
- Schema type

**Example:**
```yaml
target:
  url: "https://www.amazon.com"
  domain: "e-commerce"
test_data:
  primary_file: "test-scenarios/amazon-tests.xlsx"
  schema: "e-commerce"
```

---

### 2️⃣ Load Excel Test Cases

**File:** As specified in config (e.g., `test-scenarios/amazon-tests.xlsx`)

The agent:
- Opens the Excel file
- Reads all rows starting from Row 2 (Row 1 is headers)
- Parses all 14 required columns + domain-specific columns

---

### 3️⃣ Filter by "Run*" Column

**CRITICAL RULE:** Only execute test cases where **Run* = "yes"**

| Test Case ID* | Run* | Action |
|---------------|------|--------|
| TC001 | yes | ✅ Execute this test |
| TC002 | no | ❌ Skip this test |
| TC003 | yes | ✅ Execute this test |
| TC004 | (blank) | ❌ Skip this test |

The agent creates a list of test cases to execute based on this filter.

---

### 4️⃣ Execute Each Test Case

For **each test case where Run* = "yes"**, the agent:

#### A. Read Test Case Details

Extracts from Excel:
- **Test Case ID***: TC001
- **Test Case Area***: Product Search
- **Test Case Name***: Search for laptops
- **Test Case Description***: Verify product search functionality
- **Steps To Reproduce***: 1. Navigate to homepage\n2. Enter 'laptop' in search\n3. Click search button
- **Expected Results***: Results show laptop products
- **Domain columns**: action_type=search, search_query=laptop

#### B. Navigate to Target Website

Uses URL from `config/deployment.yaml`
```
Browser navigates to: https://www.amazon.com
```

#### C. Follow Steps To Reproduce

Parses "Steps To Reproduce*" column and executes each step:

**Example Steps:**
```
1. Navigate to homepage
2. Enter 'laptop' in search
3. Click search button
4. Verify results page displays
```

**Agent Actions:**
- Step 1: `browser_navigate(url)`
- Step 2: `browser_type(selector='#search-input', text='laptop')`
- Step 3: `browser_click(selector='#search-button')`
- Step 4: `browser_snapshot()` + verify elements

#### D. Take Screenshots

At key points:
- Before action
- After action
- On error/failure
- Final state

#### E. Compare to Expected Results

- Read "Expected Results*" column: "Results show laptop products"
- Verify actual behavior matches expected
- Determine: **Pass** or **Fail**

---

### 5️⃣ Update Excel Fields

**Automatically updates these columns:**

| Column | Value | Notes |
|--------|-------|-------|
| **Executed By*** | Turki AI | ALWAYS set to "Turki AI" |
| **Execution Date*** | 2024-12-04 | Current date (YYYY-MM-DD) |
| **Execution Result*** | Pass or Fail | Based on test outcome |
| **Observed Results (In case of failure)*** | Detailed description | Only if test failed |
| **Comments*** | Additional notes | Optional observations |

**Example - Passing Test:**
```
Executed By*: Turki AI
Execution Date*: 2024-12-04
Execution Result*: Pass
Observed Results*: (blank)
Comments*: Test executed successfully. Search results displayed 50+ laptop products.
```

**Example - Failing Test:**
```
Executed By*: Turki AI
Execution Date*: 2024-12-04
Execution Result*: Fail
Observed Results*: Error message "No results found" displayed instead of product listings
Comments*: Bug found - search functionality not working for 'laptop' query
```

---

### 6️⃣ Generate Report

After all test cases execute, the agent provides:

```markdown
## Test Execution Summary

**Execution Date:** 2024-12-04
**Executed By:** Turki AI
**Total Test Cases:** 10
**Executed:** 8 (Run* = yes)
**Skipped:** 2 (Run* = no)

### Results
- ✅ Passed: 6
- ❌ Failed: 2

### Test Case Details

| ID | Name | Status | Notes |
|----|------|--------|-------|
| TC001 | Search for laptops | ✅ Pass | Results displayed correctly |
| TC002 | Add to cart | ✅ Pass | Item added successfully |
| TC003 | Apply coupon | ❌ Fail | Coupon not recognized |
| TC004 | Checkout process | ❌ Fail | Payment page timeout |

### Failures

#### TC003: Apply coupon code
- **Expected:** 20% discount applied
- **Observed:** Error: "Invalid coupon code"
- **Screenshot:** [attached]
- **Steps to Reproduce:**
  1. Add item to cart
  2. Navigate to checkout
  3. Enter "SAVE20" in coupon field
  4. Click Apply
- **Recommendation:** Verify coupon code is active in system

#### TC004: Checkout process
- **Expected:** Payment page loads
- **Observed:** Page timeout after 30 seconds
- **Screenshot:** [attached]
- **Steps to Reproduce:**
  1. Add item to cart
  2. Navigate to checkout
  3. Fill shipping details
  4. Click "Proceed to Payment"
- **Recommendation:** Investigate server performance issues
```

---

## Important Rules

### ✅ DO:
- Execute ONLY test cases where **Run* = "yes"**
- Follow "Steps To Reproduce*" exactly as written
- Set "Executed By*" to "Turki AI" for all executions
- Use current date (YYYY-MM-DD) for "Execution Date*"
- Fill "Observed Results*" with detailed description for failures
- Take screenshots at key points
- Compare actual behavior to "Expected Results*"
- Update all execution fields in Excel

### ❌ DON'T:
- Execute test cases where Run* = "no" or blank
- Skip any steps in "Steps To Reproduce*"
- Leave "Executed By*" blank
- Use incorrect date format
- Mark test as Pass if behavior doesn't match expected results
- Skip updating Excel fields

---

## Example Excel Before and After Execution

### Before Execution

| Test Case ID* | Test Case Name* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Executed By* | Execution Date* |
|---------------|-----------------|---------------------|------|-------------------|-------------------|--------------|-----------------|
| TC001 | Search laptops | 1. Enter 'laptop'\n2. Click search | yes | Results display | (blank) | (blank) | (blank) |
| TC002 | Add to cart | 1. Click product\n2. Click Add to Cart | yes | Item in cart | (blank) | (blank) | (blank) |
| TC003 | View history | 1. Click Order History | no | History loads | (blank) | (blank) | (blank) |

### After Execution

| Test Case ID* | Test Case Name* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Executed By* | Execution Date* | Observed Results* |
|---------------|-----------------|---------------------|------|-------------------|-------------------|--------------|-----------------|-------------------|
| TC001 | Search laptops | 1. Enter 'laptop'\n2. Click search | yes | Results display | Pass | Turki AI | 2024-12-04 | Search returned 50+ laptop products |
| TC002 | Add to cart | 1. Click product\n2. Click Add to Cart | yes | Item in cart | Pass | Turki AI | 2024-12-04 | Item successfully added to cart |
| TC003 | View history | 1. Click Order History | no | History loads | (blank) | (blank) | (blank) | (blank - not executed) |

**Notice:** TC003 was NOT executed because Run* = "no"

---

## How to Use This Workflow

### 1. Prepare Your Excel File

Create test cases with all 14 required columns + domain columns:
- Set **Run* = "yes"** for tests you want to execute
- Set **Run* = "no"** for tests to skip
- Write clear "Steps To Reproduce*"
- Define "Expected Results*"

### 2. Configure Deployment

Edit `config/deployment.yaml`:
```yaml
target:
  url: "https://your-website.com"
  domain: "e-commerce"
test_data:
  primary_file: "test-scenarios/your-tests.xlsx"
```

### 3. Run the Agent

In VS Code with GitHub Copilot:
```
@playwright-tester Read deployment config and execute all test scenarios from the Excel file
```

### 4. Review Results

Check:
- Updated Excel file with execution results
- Generated report with screenshots
- List of failures with reproduction steps

---

## Troubleshooting

### Test not executed?
**Check:** Is Run* = "yes"? (Case-sensitive: "Yes" ≠ "yes")

### Wrong "Executed By" value?
**Check:** Agent should ALWAYS set "Executed By*" = "Turki AI"

### Date format incorrect?
**Check:** Should be YYYY-MM-DD (e.g., 2024-12-04, not 12/04/2024)

### Test marked as Pass but failed?
**Check:** Verify "Expected Results*" matches actual behavior

---

## Resources

- [Excel Format Guide](EXCEL_FORMAT.md) - Complete column reference
- [Universal Testing Guide](docs/universal-testing-guide.md) - Full testing guide
- [Quick Start](QUICKSTART.md) - 5-minute setup
- [Data Schema](config/data-schema.yaml) - Column definitions

---

<div align="center">

**Ready to execute your test cases?**

[📊 View Excel Format](EXCEL_FORMAT.md) | [🚀 Quick Start](QUICKSTART.md) | [⚙️ Configure](config/deployment.yaml)

</div>
