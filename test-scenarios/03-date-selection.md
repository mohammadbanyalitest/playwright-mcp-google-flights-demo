# 📅 Test Scenario 03: Date Selection

> Testing date picker and calendar interactions on Google Flights

---

## 🎯 Test Objective

Validate the date selection functionality including:
- Calendar interface usability
- Round-trip date selection
- One-way date selection
- Date navigation (months/years)
- Flexible dates feature
- Date validation and constraints

---

## 📋 Preconditions

- [ ] Google Flights is accessible
- [ ] Search form is visible with date fields
- [ ] Trip type is set (Round-trip or One-way as needed)
- [ ] Current date is known for validation

---

## 📊 Test Data

### Date Scenarios

| Scenario | Departure | Return | Notes |
|----------|-----------|--------|-------|
| Standard trip | Current month + 3 weeks | +1 week | Typical vacation |
| Weekend trip | Next Friday | Next Sunday | Short getaway |
| Long trip | Next month 1st | +3 weeks | Extended travel |
| Same day | Tomorrow | Tomorrow | Day trip (if allowed) |
| Far future | 6 months out | +1 week | Advance booking |
| Holiday period | Dec 24 | Jan 2 | Peak season |

### Calendar Navigation

| Navigation Test | Action |
|-----------------|--------|
| Next month | Click forward arrow |
| Previous month | Click back arrow (within limits) |
| Jump to specific month | If available, select from dropdown |
| Year navigation | If available, change year |

---

## 📝 Test Steps

### Test Category 1: Basic Date Selection (Round-Trip)

#### Test 1.1: Open Calendar

**Agent Prompt:**
```
Navigate to Google Flights and click on the departure date field to open 
the calendar. Take a snapshot of the calendar interface and describe its 
layout and available options.
```

**Expected Result:**
- Calendar opens on click
- Current month is displayed
- Today's date is marked/highlighted
- Past dates appear disabled or grayed out
- Navigation controls are visible

---

#### Test 1.2: Select Departure Date

**Agent Prompt:**
```
In the calendar, select a date that is 3 weeks from today as the 
departure date. Take a screenshot showing the date selection process.
```

**Expected Result:**
- Date is selectable (clickable)
- Selected date is highlighted
- Date appears in the form field
- Calendar may auto-advance to return date selection

---

#### Test 1.3: Select Return Date

**Agent Prompt:**
```
Select a return date that is 7 days after the departure date. 
Verify both dates are now shown in the search form.
```

**Expected Result:**
- Return date selection is available
- Date range is highlighted in calendar
- Both dates appear in form fields
- Duration may be displayed (e.g., "7 days")

---

### Test Category 2: Calendar Navigation

#### Test 2.1: Navigate to Next Month

**Agent Prompt:**
```
Click the forward navigation arrow to move to the next month. 
Take screenshots showing the month change.
```

**Expected Result:**
- Calendar advances to next month
- Month/year header updates
- Days are correctly displayed for new month
- Any previous selections are preserved

---

#### Test 2.2: Navigate to Previous Month

**Agent Prompt:**
```
Try to navigate back to the previous month (or current month if already ahead). 
Note if past months with past dates are accessible.
```

**Expected Result:**
- Back navigation works (within limits)
- Cannot navigate to fully past months
- Current month may be the minimum
- Clear indication of boundaries

---

#### Test 2.3: Navigate Multiple Months Ahead

**Agent Prompt:**
```
Navigate forward 3-4 months in the calendar. Verify the calendar handles 
long-term date selection smoothly.
```

**Expected Result:**
- Can navigate multiple months ahead
- Performance remains good
- Dates remain selectable
- Year transitions correctly (if applicable)

---

### Test Category 3: One-Way Date Selection

#### Test 3.1: Switch to One-Way

**Agent Prompt:**
```
Change the trip type to "One way" and observe how the date selection 
changes. Take a screenshot of the modified form.
```

**Expected Result:**
- Return date field disappears or becomes inactive
- Only departure date is selectable
- Calendar shows single date selection mode

---

#### Test 3.2: Select One-Way Date

**Agent Prompt:**
```
Select a departure date for a one-way trip. Verify only one date 
is shown in the form.
```

**Expected Result:**
- Single date is selected
- No return date is prompted
- Form shows one-way trip clearly

---

### Test Category 4: Flexible Dates

#### Test 4.1: Enable Flexible Dates

**Agent Prompt:**
```
Look for a "Flexible dates" option or toggle. If available, enable it 
and observe how the interface changes. Take a screenshot.
```

**Expected Result:**
- Flexible dates option is accessible
- Date selection may change to ranges
- May show lowest prices across dates
- Clear indication of flexible mode

---

#### Test 4.2: Select Date Range

**Agent Prompt:**
```
If flexible dates is available, select a date range (e.g., "first 2 weeks 
of next month"). Document how this affects search behavior.
```

**Expected Result:**
- Can select broader date ranges
- Search may show multiple date options
- Prices may be compared across dates
- Results may differ from exact dates

---

### Test Category 5: Date Validation

#### Test 5.1: Past Dates (Should Be Disabled)

**Agent Prompt:**
```
Try to select yesterday's date or any past date. Document how the 
calendar handles this - it should prevent selection.
```

**Expected Result:**
- Past dates are visually disabled (grayed out, different color)
- Clicking past dates has no effect
- No error message needed (prevention is enough)
- Today's date may or may not be selectable

---

#### Test 5.2: Today's Date

**Agent Prompt:**
```
Try to select today's date as the departure date. Note whether 
same-day flights are searchable.
```

**Expected Result:**
- Today may be selectable (for last-minute flights)
- Or may be disabled depending on time of day
- Behavior should be logical and clear

---

#### Test 5.3: Far Future Dates

**Agent Prompt:**
```
Navigate to a date 12+ months in the future. Try to select it and 
note any limitations on booking far ahead.
```

**Expected Result:**
- May have limited availability
- Some dates may not be bookable
- Calendar should still be navigable
- Clear indication if dates unavailable

---

### Test Category 6: Return Before Departure

#### Test 6.1: Invalid Date Order

**Agent Prompt:**
```
In round-trip mode, try to set the return date BEFORE the departure date. 
Document the error handling behavior. Take a screenshot if there's an 
error message.
```

**Expected Result:**
- System should prevent invalid combinations
- Options:
  - Auto-swap dates to valid order
  - Show error message
  - Prevent selection entirely
- User should understand the issue

---

### Test Category 7: Visual Feedback and Accessibility

#### Test 7.1: Visual Indicators

**Agent Prompt:**
```
With a date range selected, take a screenshot showing how the selected 
dates are visually highlighted. Describe the visual feedback.
```

**Expected Result:**
- Departure date is clearly marked
- Return date is clearly marked
- Date range between them may be highlighted
- Today's date has special indicator

---

#### Test 7.2: Keyboard Navigation

**Agent Prompt:**
```
Test if the calendar can be navigated using keyboard (arrow keys, Tab, Enter). 
Document the keyboard accessibility.
```

**Expected Result:**
- Arrow keys may navigate between dates
- Tab key moves through controls
- Enter key may select date
- Escape key may close calendar

---

### Test Category 8: Date Format and Display

#### Test 8.1: Date Format

**Agent Prompt:**
```
After selecting dates, observe how they are displayed in the form fields. 
Note the date format used (e.g., "Jan 15" vs "1/15/2024").
```

**Expected Result:**
- Dates are displayed in readable format
- Format is consistent with locale
- Dates are unambiguous

---

#### Test 8.2: Duration Display

**Agent Prompt:**
```
Check if the duration between departure and return is displayed anywhere. 
Take a screenshot if shown.
```

**Expected Result:**
- Duration may be shown (e.g., "7 day trip")
- Helpful for user to understand selection
- Updates when dates change

---

## ✅ Validation Points

### Calendar Functionality

- [ ] Calendar opens on field click
- [ ] Current month displayed by default
- [ ] Past dates are disabled
- [ ] Future dates are selectable
- [ ] Month navigation works smoothly
- [ ] Selected dates are clearly highlighted

### Round-Trip Date Logic

- [ ] Both dates can be selected
- [ ] Return date must be after departure
- [ ] Date range is visually indicated
- [ ] Both dates appear in form fields

### One-Way Handling

- [ ] Return date is hidden/disabled for one-way
- [ ] Single date selection works correctly
- [ ] Form clearly indicates one-way trip

### Date Validation

- [ ] Cannot select past dates
- [ ] Return before departure is handled
- [ ] Far future dates work (within limits)
- [ ] Same-day trips handled appropriately

---

## ⚠️ Edge Cases

| Edge Case | Test | Expected Behavior |
|-----------|------|-------------------|
| Month boundary | Last day of month to first of next | Works correctly |
| Year boundary | December to January | Year increments |
| Leap year | February dates | 29th shows in leap years |
| Same day departure/return | Select identical dates | May or may not be allowed |
| Very long trip | 30+ day range | Works but may show warnings |
| End of month selection | Select 31st | Only available in 31-day months |

---

## 🐛 Common Issues to Watch For

1. **Calendar Doesn't Open**: Click on date field has no effect
2. **Wrong Month Displayed**: Calendar shows incorrect initial month
3. **Selection Doesn't Register**: Clicking date has no effect
4. **Date Format Confusion**: Unclear which is departure vs return
5. **Navigation Limits**: Can't navigate to desired month
6. **Mobile Calendar Issues**: Touch interactions may differ
7. **Time Zone Confusion**: Dates may be off by one day
8. **Slow Calendar Loading**: Performance issues with calendar

---

## 📸 Screenshots to Capture

| Step | Screenshot Description |
|------|----------------------|
| Calendar Open | Initial calendar view |
| Date Selected | Single date highlighted |
| Date Range | Both departure and return selected |
| Month Navigation | After advancing months |
| Disabled Dates | Past dates shown as disabled |
| Flexible Dates | Flexible dates mode (if available) |
| Error Handling | Invalid date selection response |
| Form with Dates | Final form showing selected dates |

---

## 📝 Sample Agent Prompts Collection

### Basic Date Selection

```
Click the departure date field and select a date 2 weeks from today.
```

```
Set a round-trip with departure on the 15th and return on the 22nd of next month.
```

### Calendar Navigation

```
Navigate the calendar forward 3 months and select dates for a holiday trip.
```

```
Test the calendar's year navigation if available.
```

### Validation Testing

```
Attempt to select a past date and document how the calendar prevents this.
```

```
Try setting a return date that's earlier than the departure date.
```

### Edge Cases

```
Test selecting February 29th in a leap year vs non-leap year.
```

```
Select December 31st as departure and January 1st as return - verify year handling.
```

---

<div align="center">

**[Back to Test Scenarios](../README.md#test-scenarios)**

</div>
