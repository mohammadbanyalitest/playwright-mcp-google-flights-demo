# 📝 Agent Prompts Collection

> Ready-to-use prompts for Playwright MCP testing on Google Flights

---

## 📋 Table of Contents

- [Exploration Prompts](#-exploration-prompts)
- [Functional Testing](#-functional-testing)
- [Filter and Sort Testing](#-filter-and-sort-testing)
- [Edge Case Testing](#-edge-case-testing)
- [Accessibility & UX](#-accessibility--ux)
- [Documentation Prompts](#-documentation-prompts)
- [Advanced Testing](#-advanced-testing)

---

## 🔍 Exploration Prompts

### Homepage Exploration

```
Navigate to https://www.google.com/travel/flights?gl=SA&hl=en and take a 
snapshot of the homepage. Identify all interactive elements including 
forms, buttons, dropdowns, and navigation items.
```

```
Explore the Google Flights homepage and list all the main features visible 
to a first-time user. Describe the default state of the search form.
```

```
Navigate to Google Flights and identify the main user flows available. 
What actions can a user take from the homepage?
```

### Search Form Analysis

```
Take a detailed snapshot of the flight search form. List every input field, 
dropdown, and button with their current values and states.
```

```
Analyze the passenger selector on Google Flights. What options are 
available for adults, children, and infants?
```

```
Explore the cabin class options (Economy, Business, etc.) and document 
all available choices.
```

### Results Page Exploration

```
After searching for any flight, explore the results page. Identify all 
the information shown for each flight option (price, duration, stops, etc.).
```

```
On the results page, find and list all available filter options. 
Where are they located and how are they organized?
```

---

## ✈️ Functional Testing

### Basic Flight Search

```
Search for a round-trip flight from JFK (New York) to LAX (Los Angeles).
Select dates 3 weeks from today for departure and 1 week later for return.
Execute the search and capture the results.
```

```
Test a one-way flight search from San Francisco (SFO) to Seattle (SEA)
for a date 2 weeks from today. Document the process and results.
```

```
Search for a round-trip flight from London (LHR) to Paris (CDG) for
next month. Verify international routes work correctly.
```

### Date Selection

```
Click on the departure date field, navigate to next month in the calendar,
and select the 15th. Then select a return date of the 22nd. Capture 
screenshots of the calendar interaction.
```

```
Test selecting dates that are 6 months in the future. Verify the calendar
allows far-future booking.
```

```
Switch between "Specific dates" and "Flexible dates" (if available).
Document how the interface changes.
```

### Passenger Configuration

```
Modify the passenger count to 2 adults and 2 children. Execute a search
and verify the results reflect multiple passengers.
```

```
Test adding an infant (lap) to the booking. Verify any restrictions or
additional information required.
```

```
Try to add the maximum number of passengers allowed. What is the limit
and how is it communicated?
```

### Cabin Class

```
Change the cabin class from Economy to Business class. Search for flights
and compare if prices are different from Economy.
```

```
Test all available cabin classes (Economy, Premium Economy, Business, First)
for a popular route. Document availability for each.
```

### Trip Types

```
Switch between Round-trip, One-way, and Multi-city options. Document how
the form changes for each trip type.
```

```
Set up a multi-city trip: New York → Los Angeles → Chicago → New York.
Execute the search and analyze the results format.
```

---

## 🔍 Filter and Sort Testing

### Stops Filter

```
On the search results page, apply the "Nonstop" filter. Verify all 
displayed flights have 0 stops. Count results before and after filtering.
```

```
Test the "1 stop" filter. Verify all results show exactly one connection.
Note the layover information displayed.
```

```
Apply the "2+ stops" filter and compare the number of results to 
nonstop and 1-stop filters.
```

### Price Filter

```
Use the price slider or filter to show only flights under $300.
Verify all displayed prices are within the selected range.
```

```
Set a specific price range ($200-$400) and verify results fall within
these boundaries. Take screenshots of the price filter interface.
```

### Airline Filter

```
Filter results to show only Delta Airlines flights. Verify no other
airlines appear in the filtered results.
```

```
Select multiple airlines (e.g., United and American) and verify results
include both but exclude other carriers.
```

```
Test selecting all airlines vs. a single airline. Document the difference
in available options.
```

### Time Filters

```
Filter for morning departures only (before 12 PM). Verify all departure
times in results are in the morning.
```

```
Set an arrival time filter for evening flights (after 6 PM). Verify
the filter is applied correctly to arrival times.
```

```
Apply both departure AND arrival time filters. Test if they work together.
```

### Sorting

```
Sort results by "Cheapest" and verify prices are in ascending order.
Take a screenshot of the sorted results.
```

```
Sort by "Fastest" (shortest duration) and verify flight times are
in ascending order.
```

```
Compare the top 5 results when sorted by "Best" vs "Cheapest" vs "Fastest".
What's the difference?
```

### Combined Filters

```
Apply multiple filters: Nonstop + Price under $400 + Specific airline.
Verify all filters work together correctly.
```

```
Apply restrictive filters that result in very few or no results.
Document how this scenario is handled.
```

### Clear Filters

```
With multiple filters applied, test clearing them one at a time.
Verify remaining filters stay active.
```

```
Use "Clear all filters" option. Verify the results return to the
original unfiltered state.
```

---

## ⚠️ Edge Case Testing

### Invalid Inputs

```
Try to enter an invalid airport code like "XYZ123" in the origin field.
Document how the system handles invalid input.
```

```
Type "!!@@##" (special characters only) in the destination field.
Verify error handling is graceful.
```

```
Leave the origin field empty and try to search. What validation
message appears?
```

### Date Edge Cases

```
Try to select a past date (yesterday) in the departure calendar.
Verify past dates are not selectable.
```

```
Attempt to set the return date BEFORE the departure date.
Document the error handling behavior.
```

```
Select today's date for departure. Is same-day booking allowed?
```

```
Test selecting December 31 as departure and January 1 as return.
Verify year transition is handled correctly.
```

### Origin/Destination Edge Cases

```
Try to set the same airport for both origin and destination (JFK to JFK).
What happens?
```

```
Search for a route that likely has no flights (e.g., small regional to
small regional). How are "no results" communicated?
```

### Passenger Edge Cases

```
Try to add more than the maximum allowed passengers. What is the limit
and how is it enforced?
```

```
Attempt to book with 0 adults and only children/infants. Is this allowed?
```

### Long Text Inputs

```
Type a very long string (50+ characters) in the destination field.
How does the autocomplete and field handle long input?
```

---

## ♿ Accessibility & UX

### Keyboard Navigation

```
Test if the search form can be navigated using only the Tab key.
Document the tab order and any issues.
```

```
Test if the date calendar can be navigated using arrow keys.
Can dates be selected with Enter key?
```

```
Test keyboard navigation through the filter options on the results page.
```

### Screen Reader Simulation

```
Take a page snapshot and analyze the accessibility attributes.
Are form fields properly labeled? Are buttons descriptive?
```

### Visual Feedback

```
Document all visual feedback provided during user interactions:
hover states, focus indicators, loading states, success/error messages.
```

### Mobile Responsive (Viewport Testing)

```
Resize the browser to mobile dimensions (375x812) and take a screenshot.
How does the search form adapt to mobile view?
```

```
On mobile viewport, test if all functionality remains accessible.
Document any mobile-specific UI changes.
```

### Error Messages

```
Trigger various error states and document the error messages.
Are they clear, helpful, and actionable?
```

---

## 📸 Documentation Prompts

### Screenshot Collection

```
Take a full-page screenshot of the Google Flights homepage for documentation.
```

```
Capture a screenshot of the search results page showing at least 5 
flight options with visible prices and details.
```

```
Take before and after screenshots while applying a filter to show
the visual change.
```

### Page Snapshots

```
Take a page snapshot and provide a summary of all form elements,
their types, and current values.
```

```
Generate a snapshot-based accessibility audit of the current page.
```

### Test Report Generation

```
After completing the flight search test, generate a summary report
including: test steps performed, screenshots taken, issues found,
and recommendations.
```

---

## 🚀 Advanced Testing

### Performance Observation

```
Note the time taken for autocomplete suggestions to appear when typing
in the origin field. Is it responsive (under 2 seconds)?
```

```
Measure approximately how long the search takes to return results.
Is the loading experience acceptable?
```

### State Management

```
Fill out the search form, navigate away (click on another tab),
then return. Is the form state preserved?
```

```
After completing a search, use the browser back button. Does the
previous search form state restore correctly?
```

### Multi-Tab Testing

```
Open Google Flights in a new tab while keeping the original tab.
Test if searches in one tab affect the other.
```

### Session Behavior

```
Test what happens when you refresh the page mid-search. Is there
any impact on the results or search state?
```

---

## 📝 Prompt Templates

### Basic Template

```
[ACTION] on Google Flights. [SPECIFIC DETAILS]. 
[DOCUMENTATION REQUEST - screenshot/snapshot].
[VALIDATION - what to verify].
```

### Search Template

```
Search for a [TRIP_TYPE] flight from [ORIGIN] to [DESTINATION].
Select [DATE_DETAILS].
[PASSENGER_CONFIG if different from default].
Execute the search and [DOCUMENTATION].
```

### Filter Template

```
Apply the [FILTER_NAME] filter with value [VALUE].
Verify [EXPECTED_RESULT].
Take [BEFORE/AFTER] screenshots.
Document any issues.
```

### Edge Case Template

```
Test [EDGE_CASE_DESCRIPTION] by [ACTION].
Expected: [EXPECTED_BEHAVIOR].
Document actual behavior and any discrepancies.
```

### Validation Template

```
Verify that [CONDITION/STATE] by [VERIFICATION_METHOD].
Compare expected [EXPECTED] with actual results.
Report [PASS/FAIL] with evidence.
```

---

## 💡 Tips for Effective Prompts

### Do's ✅

- Be specific about what you want to test
- Include expected outcomes
- Request documentation (screenshots/snapshots)
- One focused task per prompt
- Use concrete examples (JFK, LAX, specific dates)

### Don'ts ❌

- Don't be vague ("test the website")
- Don't combine too many tasks
- Don't forget to request evidence
- Don't skip validation criteria
- Don't assume the agent knows context

---

<div align="center">

**Copy and customize these prompts for your testing needs!**

[📖 Sample Test Session](sample-test-session.md) | [🧪 Test Scenarios](../test-scenarios/)

</div>
