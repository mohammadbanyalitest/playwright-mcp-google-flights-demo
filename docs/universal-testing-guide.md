# Universal Web Testing Guide

> **Test ANY website with Playwright MCP using the same Excel format**

---

## 🎯 Overview

This framework allows you to test **any website** using Playwright MCP and GitHub Copilot. Simply configure your target website, keep your Excel test scenarios in the same format, and start testing.

---

## 🚀 Quick Start: Test a New Website

### Step 1: Configure Your Target Website

Edit [`config/deployment.yaml`](../config/deployment.yaml):

```yaml
target:
  name: "Your Website Name"
  url: "https://your-website.com"
  domain: "custom"  # or travel, e-commerce, finance
  description: "Brief description of what the site does"

test_data:
  schema: "custom"  # Match your domain type
  primary_file: "test-scenarios/your-test-scenarios.xlsx"
```

### Step 2: Prepare Your Excel Test Scenarios

Your Excel file should have these **required columns** (same format for all websites):

| Excel Column Header | Type | Description | Example |
|---------------------|------|-------------|---------|
| `Test Case ID*` | string | Unique test case identifier | TC001 |
| `Test Case Area*` | string | Area/module being tested | Search Functionality |
| `Test Case Name*` | string | Name of the test case | Verify search with valid input |
| `Test Case Description*` | string | Detailed description | Verify search returns relevant results |
| `Steps To Reproduce*` | text | Step-by-step instructions | 1. Navigate to homepage 2. Enter search term 3. Click search |
| `Run*` | yes/no | Execute this test? | yes |
| `Expected Results*` | text | Expected outcome | Search results display matching items |
| `Execution Result*` | Pass/Fail/etc | Test result | Pass |
| `Observed Results (In case of failure)*` | text | Actual results if failed | Error: Connection timeout |
| `Test Case Severity*` | Critical/High/Medium/Low | Priority level | High |
| `Executed By*` | string | Person/agent who executed | John Doe |
| `Execution Date*` | date | Date executed (YYYY-MM-DD) | 2024-03-15 |
| `Created By*` | string | Test creator name | Jane Smith |
| `Comments*` | text | Additional notes | May fail in IE11 |

**Add domain-specific columns** based on your website type (see below).

### Step 3: Start Testing

1. Open VS Code with GitHub Copilot
2. Activate the agent: `@playwright-tester`
3. Say: "Read the deployment config and test the website"

The agent will:
- Read your configuration
- Navigate to your target URL
- Adapt testing approach based on domain type
- Execute tests from your Excel file

---

## 📋 Domain-Specific Excel Columns

### Travel Websites (Flights, Hotels, Car Rentals)

**Set in config:** `domain: "travel"` and `schema: "travel"`

**Additional Excel columns:**

| Column | Type | Example |
|--------|------|---------|
| `trip_type` | one_way, round_trip, multi_city | round_trip |
| `origin` | string | JFK |
| `destination` | string | LAX |
| `depart_date` | date or +Nd | +7d |
| `return_date` | date or +Nd | +14d |
| `passengers` | integer | 2 |
| `cabin_class` | economy, business, first | economy |

**Example Excel Row:**
```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | trip_type | origin | destination | depart_date | return_date | passengers
TC001 | Flight Search | Search round-trip flight | Verify round-trip flight search works | 1. Enter JFK as origin 2. Enter LAX as destination 3. Select dates 4. Click search | yes | Results should show available flights | Pass | High | round_trip | JFK | LAX | +7d | +14d | 2
```

---

### E-Commerce Websites (Online Stores)

**Set in config:** `domain: "e-commerce"` and `schema: "e-commerce"`

**Additional Excel columns:**

| Column | Type | Example |
|--------|------|---------|
| `action_type` | search, add_to_cart, checkout, etc. | search |
| `search_query` | string | wireless headphones |
| `product_id` | string | SKU-12345 |
| `quantity` | integer | 1 |
| `coupon_code` | string | SAVE10 |
| `filter_name` | string | brand |
| `filter_value` | string | Sony |
| `sort_by` | price_low_high, rating, etc. | price_low_high |

**Example Excel Row:**
```
Test Case ID* | Test Case Area* | Test Case Name* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | action_type | search_query
TC001 | Product Search | Search for headphones | 1. Navigate to store 2. Enter 'wireless headphones' in search 3. Click search | yes | Results should show headphones | Pass | High | search | wireless headphones
TC002 | Shopping Cart | Add item to cart | 1. Navigate to product PROD-123 2. Click 'Add to Cart' 3. Verify cart | yes | Item should be in cart | Pass | Medium | add_to_cart | PROD-123
```

---

### Finance Websites (Banking, Payments)

**Set in config:** `domain: "finance"` and `schema: "finance"`

**Additional Excel columns:**

| Column | Type | Example |
|--------|------|---------|
| `action_type` | login, view_balance, transfer, pay_bill | view_balance |
| `account_type` | checking, savings, credit | checking |
| `amount` | decimal | 100.00 |
| `recipient_account` | string | 9876543210 |
| `transaction_date` | date | 2024-03-15 |

**Example Excel Row:**
```
Test Case ID* | Test Case Area* | Test Case Name* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | action_type | account_type
TC001 | Account Balance | View checking balance | 1. Login to account 2. Navigate to accounts 3. Click checking account 4. Verify balance | yes | Balance should be displayed | Pass | Critical | view_balance | checking
```

---

### Custom Websites (Any Other Application)

**Set in config:** `domain: "custom"` and `schema: "custom"`

**Additional Excel columns:** Add whatever columns you need!

Examples:
- Login testing: `username`, `password`, `user_role`
- Form testing: `field1`, `field2`, `field3`
- Navigation testing: `menu_item`, `sub_menu`, `expected_page`

**Example Custom Columns:**
```
Test Case ID* | Test Case Area* | Test Case Name* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | page_url | button_to_click | input_field | input_value
TC001 | Contact Form | Submit contact form | 1. Navigate to /contact 2. Enter 'John Doe' in Name 3. Click Submit | yes | Form should submit successfully | Pass | Medium | /contact | Submit | Name | John Doe
```

---

## 🎯 Testing Workflow

### 1. Exploratory Testing (No Excel Required)

Ask the agent to explore your website:

```
@playwright-tester Navigate to the configured website and explore the main features.
Take screenshots and document the key user flows.
```

### 2. Excel-Driven Testing

Ask the agent to run your test scenarios:

```
@playwright-tester Read the test scenarios from the Excel file and execute all tests
marked with run=yes. Document the results.
```

**How the Agent Executes Tests:**

1. **Reads Configuration** (`config/deployment.yaml`) to find Excel file path
2. **Opens Excel file** and parses all test cases
3. **Filters by "Run*" column** - Only executes rows where Run* = "yes"
4. **For each test case:**
   - Reads "Steps To Reproduce*" and follows each step exactly
   - Uses domain-specific columns (origin, destination, search_query, etc.)
   - Takes screenshots during execution
   - Compares results to "Expected Results*"
5. **Updates Excel fields:**
   - **Executed By*** = "Turki AI" (automatic)
   - **Execution Date*** = Current date (YYYY-MM-DD)
   - **Execution Result*** = "Pass" or "Fail"
   - **Observed Results*** = Details if test failed
   - **Comments*** = Additional observations
6. **Generates report** with summary, screenshots, and failure details

### 3. Specific Test Cases

Target specific scenarios:

```
@playwright-tester Execute test case TC001 from the Excel file and verify the expected result.
```

### 4. Domain-Specific Testing

The agent automatically adapts based on your domain:

**Travel:**
```
@playwright-tester Test a round-trip flight search using the data from TC001.
```

**E-Commerce:**
```
@playwright-tester Test the product search functionality using TC002 from the Excel file.
```

**Finance:**
```
@playwright-tester Verify the balance display using TC003.
```

---

## 📊 Excel Template Structure

Here's a complete Excel template that works for **any website**:

### Universal Columns (Required for ALL)

```
A: Test Case ID*
B: Test Case Area*
C: Test Case Name*
D: Test Case Description*
E: Steps To Reproduce*
F: Run*
G: Expected Results*
H: Execution Result*
I: Observed Results (In case of failure)*
J: Test Case Severity*
K: Executed By*
L: Execution Date*
M: Created By*
N: Comments*
```

### Add Domain Columns (Column O onwards)

**For Travel:** trip_type, origin, destination, depart_date, return_date, passengers, cabin_class...

**For E-Commerce:** action_type, search_query, product_id, quantity, coupon_code...

**For Finance:** action_type, account_type, amount, recipient_account, transaction_date...

**For Custom:** Your own columns as needed

---

## 💡 Examples: Testing Different Websites

### Example 1: Test an E-Commerce Store

**1. Update config/deployment.yaml:**
```yaml
target:
  name: "Demo Online Store"
  url: "https://demo-store.com"
  domain: "e-commerce"
test_data:
  schema: "e-commerce"
  primary_file: "test-scenarios/ecommerce-tests.xlsx"
```

**2. Create Excel with e-commerce columns:**
```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | action_type | search_query | product_id
TC001 | Product Search | Search for laptops | Verify product search | 1. Enter 'laptop' in search 2. Click search | yes | Should show laptop results | Pass | High | search | laptop |
TC002 | Shopping Cart | Add item to cart | Verify add to cart | 1. Navigate to PROD-123 2. Click Add to Cart | yes | Item in cart | Pass | Medium | add_to_cart |  | PROD-123
```

**3. Test:**
```
@playwright-tester Execute all e-commerce test scenarios
```

---

### Example 2: Test a Custom Portal

**1. Update config/deployment.yaml:**
```yaml
target:
  name: "Employee Portal"
  url: "https://portal.company.com"
  domain: "custom"
test_data:
  schema: "custom"
  primary_file: "test-scenarios/portal-tests.xlsx"
```

**2. Create Excel with custom columns:**
```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | page | action | field | value
TC001 | Authentication | Login as admin | Verify admin login | 1. Navigate to /login 2. Enter credentials 3. Submit | yes | Dashboard loads | Pass | Critical | /login | type_and_submit | username, password | admin, pass123
TC002 | Reporting | View reports | Verify report display | 1. Navigate to /reports 2. Click Quarterly Report | yes | Report displays | Pass | High | /reports | click | Quarterly Report |
```

**3. Test:**
```
@playwright-tester Test the employee portal using the Excel scenarios
```

---

## 🔧 Advanced Configuration

### Custom Selectors

Create `config/selectors.json` for site-specific element selectors:

```json
{
  "selectors": {
    "common": {
      "search_button": {
        "primary": "[data-testid='search-btn']",
        "fallbacks": ["button[aria-label='Search']", ".search-button"]
      }
    }
  }
}
```

### Timeouts

Adjust in `config/deployment.yaml`:

```yaml
timeouts:
  navigation: 30000    # Slower sites need more time
  element: 10000       # Wait longer for elements
  action: 5000         # Timeout for clicks, typing
```

### Browser Settings

```yaml
browser:
  type: "chromium"     # or firefox, webkit
  headed: true         # Show browser window
  viewport:
    width: 1920        # Full HD
    height: 1080
  slow_mo: 500         # Slow down for debugging (ms)
```

---

## 📝 Best Practices

### 1. Start with Exploration
Always explore the website first before writing test scenarios:
```
@playwright-tester Explore the target website and identify the main user flows
```

### 2. Use Consistent Naming
- scenario_id: TC001, TC002, TC003...
- test_name: Clear, descriptive names
- Tags: Use for filtering (smoke, regression, critical)

### 3. Keep Excel Simple
- One action per row
- Clear expected results
- Use notes for context

### 4. Adapt Domain Type
- Choose the closest domain type (travel, e-commerce, finance)
- Use "custom" when none fit
- Add custom columns as needed

### 5. Iterate and Refine
- Start with a few scenarios
- Run tests and adjust
- Add more scenarios gradually

---

## 🆘 Troubleshooting

### Agent doesn't find elements
- Check `config/selectors.json` for correct selectors
- Use "mixed" strategy in deployment.yaml
- Enable fallback_enabled

### Excel columns not recognized
- Verify schema type matches your domain
- Check column names match data-schema.yaml
- Ensure required columns are present

### Tests timeout
- Increase timeouts in deployment.yaml
- Check network speed
- Use headed mode to see what's happening

---

## 📚 Resources

- [Setup Guide](setup-guide.md) - Initial installation
- [Data Schema Reference](../config/data-schema.yaml) - All available columns
- [Deployment Examples](../config/deployment-example.yaml) - Configuration templates
- [Agent Prompts](../examples/agent-prompts.md) - Example commands

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Explore website | `@playwright-tester Explore the configured website` |
| Run all tests | `@playwright-tester Execute all Excel test scenarios` |
| Run one test | `@playwright-tester Run test TC001` |
| Screenshot page | `@playwright-tester Take a screenshot of the current page` |
| Change website | Edit `config/deployment.yaml`, restart agent |

---

<div align="center">

**Ready to test any website?**

[⚙️ Configure Your Website](../config/deployment.yaml) | [📋 View Schema Reference](../config/data-schema.yaml)

</div>
