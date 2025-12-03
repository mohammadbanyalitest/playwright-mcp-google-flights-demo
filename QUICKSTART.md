# 🚀 Quick Start: Test Your Website in 5 Minutes

> **Switch from Google Flights to YOUR website - no coding required!**

---

## Step 1: Edit One File (2 minutes)

Open [`config/deployment.yaml`](config/deployment.yaml) and change these lines:

```yaml
target:
  name: "Your Website Name"              # ← Change this
  url: "https://your-website.com"        # ← Change this
  domain: "custom"                       # ← Choose: travel, e-commerce, finance, or custom
  description: "What your site does"     # ← Change this

test_data:
  schema: "custom"                       # ← Match the domain above
  primary_file: "test-scenarios/your-tests.xlsx"  # ← Your Excel file path
```

**That's it!** No code changes needed.

---

## Step 2: Prepare Your Excel File (2 minutes)

### Required Columns (Same for ALL websites)

Your Excel file MUST have these columns (exact header names with asterisks):

| Excel Column Header | Example Value |
|---------------------|---------------|
| Test Case ID* | TC001 |
| Test Case Area* | Search Functionality |
| Test Case Name* | Verify search works |
| Test Case Description* | Verify that search returns relevant results |
| Steps To Reproduce* | 1. Navigate to homepage 2. Enter search term 3. Click search |
| Run* | yes |
| Expected Results* | Search results display matching items |
| Execution Result* | Pass |
| Observed Results (In case of failure)* | (Leave blank if passed) |
| Test Case Severity* | High |
| Executed By* | John Doe |
| Execution Date* | 2024-03-15 |
| Created By* | Jane Smith |
| Comments* | Optional additional notes |

### Add Domain-Specific Columns

**If domain is "travel"** (flights, hotels, etc.):
- Add columns: `trip_type`, `origin`, `destination`, `depart_date`, `return_date`, `passengers`

**If domain is "e-commerce"** (online stores):
- Add columns: `action_type`, `search_query`, `product_id`, `quantity`, `coupon_code`

**If domain is "finance"** (banking, payments):
- Add columns: `action_type`, `account_type`, `amount`, `transaction_date`

**If domain is "custom"** (anything else):
- Add whatever columns you need! Example: `username`, `password`, `button_to_click`

See [full column reference](config/data-schema.yaml).

---

## Step 3: Start Testing (1 minute)

1. Open VS Code with GitHub Copilot
2. Type: `@playwright-tester`
3. Say: **"Read the deployment config and explore the target website"**

The agent will:
- ✅ Read your config
- ✅ Navigate to your URL
- ✅ Explore the site
- ✅ Adapt testing approach automatically

---

## Example Scenarios

### Example 1: Test an Online Store

**Edit config/deployment.yaml:**
```yaml
target:
  name: "My Store"
  url: "https://mystore.com"
  domain: "e-commerce"
test_data:
  schema: "e-commerce"
  primary_file: "test-scenarios/store-tests.xlsx"
```

**Create store-tests.xlsx:**
```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | Executed By* | Execution Date* | Created By* | action_type | search_query
TC001 | Product Search | Search for laptops | Verify product search | 1. Enter 'laptop' 2. Click search | yes | Results show laptops | Pass | High | Tester | 2024-03-15 | QA Team | search | laptop
TC002 | Shopping Cart | Add item to cart | Verify add to cart | 1. Go to PROD-123 2. Click Add to Cart | yes | Item in cart | Pass | Medium | Tester | 2024-03-15 | QA Team | add_to_cart | PROD-123
```

**Test:**
```
@playwright-tester Execute all test scenarios from the Excel file
```

---

### Example 2: Test a Custom Portal

**Edit config/deployment.yaml:**
```yaml
target:
  name: "Employee Portal"
  url: "https://portal.company.com"
  domain: "custom"
test_data:
  schema: "custom"
  primary_file: "test-scenarios/portal-tests.xlsx"
```

**Create portal-tests.xlsx with YOUR custom columns:**
```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | Executed By* | Execution Date* | Created By* | page_to_visit | button_to_click
TC001 | Reporting | Open reports | Verify report access | 1. Navigate to /reports 2. Click View Report | yes | Report displays | Pass | High | Tester | 2024-03-15 | QA Team | /reports | View Report
TC002 | Notifications | Check alerts | Verify alerts load | 1. Navigate to /alerts 2. Click Refresh | yes | Alerts load | Pass | Medium | Tester | 2024-03-15 | QA Team | /alerts | Refresh
```

**Test:**
```
@playwright-tester Execute the test scenarios and document findings
```

---

## Common Commands

| What you want | Say to the agent |
|---------------|------------------|
| Explore the site | "Read deployment config and explore the website" |
| Run all tests | "Execute all test scenarios from Excel" |
| Run one test | "Run test case TC001" |
| Take screenshot | "Screenshot the current page" |
| Test search | "Test the search functionality with [your query]" |
| Verify form | "Test form submission with data from TC001" |

---

## Excel Format Examples

### Minimal (Required columns for ANY site)
```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Test Case Severity* | Executed By* | Execution Date* | Created By* | Comments*
TC001 | Homepage | Test homepage | Verify homepage loads | 1. Navigate to site | yes | Page loads | Pass | High | Tester | 2024-03-15 | QA | None
TC002 | Navigation | Test menu | Verify navigation works | 1. Click menu items | yes | Menu works | Pass | Medium | Tester | 2024-03-15 | QA | None
```

### Travel Site (Add domain columns)
```
[All required columns above] + trip_type | origin | destination | depart_date | return_date
[...] | round_trip | JFK | LAX | +7d | +14d
```

### E-Commerce Site (Add domain columns)
```
[All required columns above] + action_type | search_query | product_id | quantity
[...] | search | laptop | |
[...] | add_to_cart | | PROD-123 | 2
```

### Custom Site (Add YOUR own columns!)
```
[All required columns above] + username | password | expected_page
[...] | testuser | pass123 | /dashboard
```

---

## Need Help?

- **Full Guide**: [Universal Testing Guide](docs/universal-testing-guide.md)
- **All Excel Columns**: [Data Schema Reference](config/data-schema.yaml)
- **Config Examples**: [Deployment Examples](config/deployment-example.yaml)

---

## Summary

1. **Edit config/deployment.yaml** - Set your website URL and domain
2. **Create Excel file** - Use required columns + domain columns
3. **Start testing** - `@playwright-tester Read config and test`

**No coding required. Works with ANY website. Same Excel format everywhere.**

🎉 **You're ready to test any website!**
