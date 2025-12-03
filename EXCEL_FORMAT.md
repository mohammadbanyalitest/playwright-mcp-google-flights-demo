# 📊 Excel Test Case Format

> **Standard Excel format for all test cases across any website**

---

## Required Column Headers

Your Excel file **MUST** have these exact column headers (with asterisks):

| # | Excel Column Header | Data Type | Required | Description | Example |
|---|---------------------|-----------|----------|-------------|---------|
| 1 | **Test Case ID*** | String | Yes | Unique test case identifier | TC001 |
| 2 | **Test Case Area*** | String | Yes | Module/area being tested | Search Functionality |
| 3 | **Test Case Name*** | String | Yes | Brief name of the test | Verify search with valid input |
| 4 | **Test Case Description*** | String | Yes | Detailed description | Verify that search functionality returns relevant results when user enters valid search query |
| 5 | **Steps To Reproduce*** | Text | Yes | Step-by-step instructions | 1. Navigate to homepage<br>2. Enter search term<br>3. Click search button<br>4. Verify results |
| 6 | **Run*** | yes/no | Yes | Execute this test? | yes |
| 7 | **Expected Results*** | Text | Yes | What should happen | Search results page displays with relevant items matching the search query |
| 8 | **Execution Result*** | Enum | Yes | Test outcome | Pass / Fail / Not Executed / Blocked / In Progress |
| 9 | **Observed Results (In case of failure)*** | Text | No* | Actual results if failed | Error message: "Connection timeout" |
| 10 | **Test Case Severity*** | Enum | Yes | Priority level | Critical / High / Medium / Low |
| 11 | **Executed By*** | String | Yes | Who executed the test | John Doe |
| 12 | **Execution Date*** | Date | Yes | When test was run | 2024-03-15 |
| 13 | **Created By*** | String | Yes | Who created the test | Jane Smith |
| 14 | **Comments*** | Text | No | Additional notes | Test may fail in IE11 due to browser limitations |

\* Required if test fails

---

## Domain-Specific Columns

After the 14 required columns, add domain-specific columns based on your website type:

### Travel Domain (Flights, Hotels, Car Rentals)
Add these columns starting at column 15:

| Column Name | Type | Example |
|-------------|------|---------|
| trip_type | one_way / round_trip / multi_city | round_trip |
| origin | String | JFK |
| destination | String | LAX |
| depart_date | Date or +Nd | +7d |
| return_date | Date or +Nd | +14d |
| passengers | Integer | 2 |
| adults | Integer | 2 |
| children | Integer | 0 |
| infants | Integer | 0 |
| cabin_class | economy / premium_economy / business / first | economy |
| stops_filter | any / nonstop / 1_stop / 2_plus_stops | nonstop |

### E-Commerce Domain (Online Stores)
Add these columns starting at column 15:

| Column Name | Type | Example |
|-------------|------|---------|
| action_type | search / add_to_cart / checkout / apply_coupon | search |
| search_query | String | wireless headphones |
| product_id | String | SKU-12345 |
| product_name | String | Sony WH-1000XM4 |
| category | String | Electronics > Audio |
| quantity | Integer | 1 |
| coupon_code | String | SAVE20 |
| filter_name | String | brand |
| filter_value | String | Sony |
| sort_by | relevance / price_low_high / rating | price_low_high |
| expected_price | Decimal | 299.99 |

### Finance Domain (Banking, Payments)
Add these columns starting at column 15:

| Column Name | Type | Example |
|-------------|------|---------|
| action_type | login / view_balance / transfer / pay_bill | view_balance |
| account_type | checking / savings / credit / investment | checking |
| account_number | String | 1234567890 |
| amount | Decimal | 100.00 |
| currency | String | USD |
| recipient_account | String | 9876543210 |
| payee_name | String | Electric Company |
| transaction_date | Date | 2024-03-15 |
| expected_balance | Decimal | 5000.00 |

### Custom Domain (Your Own Application)
Add any columns you need starting at column 15. Examples:

| Column Name | Type | Example |
|-------------|------|---------|
| username | String | testuser |
| password | String | pass123 |
| page_url | String | /dashboard |
| button_to_click | String | Submit |
| input_field | String | Email Address |
| input_value | String | test@example.com |

---

## Complete Excel Template Examples

### Example 1: Travel Site (Google Flights)

```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Observed Results* | Test Case Severity* | Executed By* | Execution Date* | Created By* | Comments* | trip_type | origin | destination | depart_date | return_date | passengers | cabin_class
TC001 | Flight Search | Round-trip flight search | Verify round-trip search from JFK to LAX | 1. Enter JFK in origin\n2. Enter LAX in destination\n3. Select departure date +7d\n4. Select return date +14d\n5. Set 2 passengers\n6. Click Search | yes | Flight results display with prices and times | Pass | | High | QA Tester | 2024-03-15 | Test Team | Tests US domestic route | round_trip | JFK | LAX | +7d | +14d | 2 | economy
TC002 | Flight Search | One-way international | Verify one-way search LHR to JFK | 1. Enter LHR in origin\n2. Enter JFK in destination\n3. Select departure date +14d\n4. Set 1 passenger\n5. Click Search | yes | Flight results display | Pass | | High | QA Tester | 2024-03-15 | Test Team | International route | one_way | LHR | JFK | +14d | | 1 | economy
```

### Example 2: E-Commerce Site

```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Observed Results* | Test Case Severity* | Executed By* | Execution Date* | Created By* | Comments* | action_type | search_query | product_id | quantity | coupon_code
TC001 | Product Search | Search for laptops | Verify product search functionality | 1. Navigate to homepage\n2. Enter 'laptop' in search\n3. Click search button | yes | Results show laptop products | Pass | | High | QA Tester | 2024-03-15 | Test Team | | search | laptop | | |
TC002 | Shopping Cart | Add item to cart | Verify add to cart functionality | 1. Navigate to product PROD-123\n2. Click 'Add to Cart'\n3. Verify cart icon updates | yes | Item appears in cart | Pass | | Critical | QA Tester | 2024-03-15 | Test Team | | add_to_cart | | PROD-123 | 1 |
TC003 | Checkout | Apply coupon code | Verify coupon application | 1. Add item to cart\n2. Go to checkout\n3. Enter SAVE20\n4. Click Apply | yes | 20% discount applied | Fail | Coupon not recognized | Medium | QA Tester | 2024-03-15 | Test Team | Bug reported #456 | apply_coupon | | | | SAVE20
```

### Example 3: Custom Portal

```
Test Case ID* | Test Case Area* | Test Case Name* | Test Case Description* | Steps To Reproduce* | Run* | Expected Results* | Execution Result* | Observed Results* | Test Case Severity* | Executed By* | Execution Date* | Created By* | Comments* | username | password | page_url | button_to_click | expected_page
TC001 | Authentication | Admin login | Verify admin can login | 1. Navigate to /login\n2. Enter admin credentials\n3. Click Login | yes | Dashboard loads | Pass | | Critical | QA Tester | 2024-03-15 | Test Team | | admin | AdminPass123 | /login | Login | /dashboard
TC002 | Reports | View quarterly report | Verify report access | 1. Login as admin\n2. Navigate to /reports\n3. Click 'Q4 Report' | yes | Report displays | Pass | | High | QA Tester | 2024-03-15 | Test Team | | admin | AdminPass123 | /reports | Q4 Report | /reports/q4
```

---

## Excel File Setup Checklist

✅ **Column Headers**
- [ ] All 14 required columns present with exact names (including asterisks)
- [ ] Domain-specific columns added (if applicable)
- [ ] Headers in Row 1 of Excel sheet

✅ **Data Validation**
- [ ] Test Case ID is unique for each row
- [ ] Run column contains only "yes" or "no"
- [ ] Execution Result uses: Pass, Fail, Not Executed, Blocked, or In Progress
- [ ] Test Case Severity uses: Critical, High, Medium, or Low
- [ ] Execution Date in YYYY-MM-DD format

✅ **Content Quality**
- [ ] Test Case Description is clear and detailed
- [ ] Steps To Reproduce are numbered and specific
- [ ] Expected Results are measurable
- [ ] Observed Results filled in for failed tests

---

## Tips for Creating Test Cases

### 1. Test Case ID
- Use consistent format: TC001, TC002, TC003...
- Or: AREA-001, AREA-002 (e.g., SEARCH-001, CART-002)
- Keep sequential for easy tracking

### 2. Test Case Area
- Group related tests: "Flight Search", "Shopping Cart", "User Authentication"
- Helps with organization and filtering

### 3. Steps To Reproduce
- Number each step
- Be specific: "Click the blue 'Search' button" not just "Click Search"
- Include expected state before starting

### 4. Expected vs Observed Results
- **Expected**: What SHOULD happen
- **Observed**: What ACTUALLY happened (for failures)
- Be specific and measurable

### 5. Execution Tracking
- **Pass**: Test completed successfully
- **Fail**: Test did not meet expected results
- **Not Executed**: Test hasn't been run yet
- **Blocked**: Cannot run due to dependencies
- **In Progress**: Currently being executed

---

## Importing to Excel

### Option 1: Create in Excel
1. Open Excel
2. Type column headers in Row 1 (exact names with asterisks)
3. Fill in test data starting Row 2

### Option 2: Import from CSV
1. Create CSV file with headers
2. Open in Excel
3. Save as .xlsx

### Option 3: Use Template
Download the sample Excel template from `test-scenarios/` folder

---

## Configuration

Update [`config/deployment.yaml`](config/deployment.yaml) to point to your Excel file:

```yaml
test_data:
  schema: "travel"  # or e-commerce, finance, custom
  primary_file: "test-scenarios/your-test-file.xlsx"
  sheet_name: "Sheet1"  # Excel sheet name
```

---

## Running Tests

Once your Excel file is ready:

```
@playwright-tester Read the deployment config and execute all test scenarios from the Excel file
```

The agent will:
- Read your Excel file
- Filter rows where Run* = "yes"
- Execute each test case
- Update Execution Result*
- Fill in Observed Results* for failures
- Update Execution Date*

---

## FAQ

**Q: Do I need ALL 14 required columns?**
A: Yes, all 14 columns with asterisks (*) are required for the framework to work properly.

**Q: Can I add my own custom columns?**
A: Yes! Add any columns you need after column 14 (Comments*).

**Q: What if I don't know the Execution Result yet?**
A: Leave it blank or use "Not Executed" until you run the test.

**Q: Do column names need asterisks?**
A: Yes, use the exact column names including asterisks (*) as shown.

**Q: Can I have multiple Excel files?**
A: Yes, just update the `primary_file` path in config/deployment.yaml.

**Q: How do I handle multi-line text in Excel?**
A: Use Alt+Enter in Excel to create line breaks within a cell, especially for "Steps To Reproduce".

---

## Resources

- [Universal Testing Guide](docs/universal-testing-guide.md) - Complete testing guide
- [Data Schema Reference](config/data-schema.yaml) - All column definitions
- [QUICKSTART Guide](QUICKSTART.md) - Get started in 5 minutes
- [Sample Excel File](test-scenarios/flight-test-scenarios.xlsx) - Example format

---

<div align="center">

**Ready to create your test cases?**

[📥 Download Template](#) | [📖 Read Full Guide](docs/universal-testing-guide.md) | [⚙️ Configure](config/deployment.yaml)

</div>
