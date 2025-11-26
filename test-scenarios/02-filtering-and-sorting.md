# 🔍 Test Scenario 02: Filtering and Sorting

> Testing result filtering and sorting options on Google Flights

---

## 🎯 Test Objective

Validate that filtering and sorting options:
- Correctly filter search results based on selected criteria
- Update results in real-time or with clear feedback
- Can be combined effectively
- Can be cleared/reset properly
- Display accurate counts and ranges

---

## 📋 Preconditions

- [ ] Google Flights is loaded
- [ ] A flight search has been executed with multiple results (e.g., JFK to LAX)
- [ ] Results page is displaying at least 10-15 flight options
- [ ] Filter panel is visible on the results page

---

## 📊 Test Data

### Recommended Search for Testing Filters

| Field | Value | Reason |
|-------|-------|--------|
| Origin | JFK (New York) | Major hub with many options |
| Destination | LAX (Los Angeles) | Popular route |
| Trip Type | Round-trip | More filter options |
| Dates | 3-4 weeks out | Good availability |
| Passengers | 1 adult | Simple pricing |

This route typically returns 50+ results with various stops, airlines, and price ranges.

---

## 📝 Test Steps

### Test Category 1: Stops Filter

#### Test 1.1: Nonstop Flights Only

**Agent Prompt:**
```
On the flight search results page, locate the stops filter and select 
"Nonstop" only. Take a before screenshot (showing all results) and an 
after screenshot (showing filtered results). Count the number of results 
before and after.
```

**Expected Result:**
- Results immediately filter to show only nonstop flights
- All displayed flights show "Nonstop" or "0 stops"
- Result count decreases (unless all were already nonstop)
- Filter shows as active/selected

**Validation Points:**
- [ ] Every displayed flight has 0 stops
- [ ] Result count is accurate
- [ ] Clear visual indicator that filter is active

---

#### Test 1.2: One Stop Flights

**Agent Prompt:**
```
Clear any existing filters, then select "1 stop" from the stops filter. 
Verify that all results show exactly 1 stop.
```

**Expected Result:**
- Results show flights with exactly 1 stop
- Layover information may be displayed
- Connecting airport information is visible

---

#### Test 1.3: Two or More Stops

**Agent Prompt:**
```
Select "2+ stops" filter and verify the results. Note if there are fewer 
options compared to nonstop or 1-stop flights.
```

**Expected Result:**
- Results show flights with 2 or more stops
- These typically have longer durations
- May have fewer results than other options

---

### Test Category 2: Price Filter

#### Test 2.1: Price Range Slider

**Agent Prompt:**
```
Locate the price filter/slider. Take a snapshot to understand its range. 
Adjust the maximum price to approximately 50% of the range and verify 
results update.
```

**Expected Result:**
- Price slider/input is interactive
- Results update when price range changes
- All displayed flights are within selected price range

---

#### Test 2.2: Budget Filtering

**Agent Prompt:**
```
Set the price filter to show only flights under $300. Take a screenshot 
and verify all displayed prices are below this threshold.
```

**Expected Result:**
- All results show prices under $300
- Results count reflects the filtered set
- No flights above $300 are displayed

---

### Test Category 3: Airlines Filter

#### Test 3.1: Single Airline Selection

**Agent Prompt:**
```
Find the airlines filter and select only "United Airlines" (or any major 
airline shown). Verify that all results are from the selected airline.
```

**Expected Result:**
- Results show only United Airlines flights
- Mixed carrier results are excluded (unless United is one of them)
- Filter shows selected airline

---

#### Test 3.2: Multiple Airlines

**Agent Prompt:**
```
Select two airlines (e.g., United and Delta). Verify results include 
flights from both but no other airlines.
```

**Expected Result:**
- Results include both selected airlines
- Other airlines are excluded
- Filter shows multiple selections

---

#### Test 3.3: All Airlines (Select All)

**Agent Prompt:**
```
If there's a "Select All" or "All Airlines" option, use it and verify 
all airlines are included in results. Or clear airline filters to show all.
```

**Expected Result:**
- All airlines are included
- Results return to original full set
- No airline filter is active

---

### Test Category 4: Time Filters

#### Test 4.1: Departure Time

**Agent Prompt:**
```
Filter departure times to show only morning flights (before 12 PM). 
Verify all departure times in results are in the morning.
```

**Expected Result:**
- All results show departure times before 12 PM
- Afternoon/evening flights are filtered out
- Time filter indicator is active

---

#### Test 4.2: Arrival Time

**Agent Prompt:**
```
Set an arrival time filter to show flights arriving between 6 PM and 
midnight. Verify the arrival times in results.
```

**Expected Result:**
- All arrival times are within selected range
- Results may vary based on flight duration
- Filter is clearly indicated

---

#### Test 4.3: Both Departure and Arrival

**Agent Prompt:**
```
Set both departure (morning) and arrival (evening) time filters. 
Verify results meet both criteria.
```

**Expected Result:**
- Results meet both time constraints
- May significantly reduce available options
- Both filters shown as active

---

### Test Category 5: Duration Filter

#### Test 5.1: Maximum Duration

**Agent Prompt:**
```
If available, set a maximum flight duration filter (e.g., under 6 hours). 
Verify all results are within the duration limit.
```

**Expected Result:**
- All flights show duration under specified limit
- Longer flights are filtered out
- Duration is clearly visible in results

---

### Test Category 6: Sorting Options

#### Test 6.1: Sort by Best

**Agent Prompt:**
```
Select "Best" sort option and take a screenshot. Observe how results 
are ordered (likely a combination of price, duration, convenience).
```

**Expected Result:**
- Results are sorted by Google's "best" algorithm
- Top results should represent good value
- Sort indicator shows "Best" selected

---

#### Test 6.2: Sort by Price (Cheapest)

**Agent Prompt:**
```
Change sorting to "Cheapest" or "Price - Low to High". Verify prices 
are in ascending order from top to bottom.
```

**Expected Result:**
- First result has the lowest price
- Prices increase as you scroll down
- Sort indicator shows price sort active

---

#### Test 6.3: Sort by Duration (Fastest)

**Agent Prompt:**
```
Sort by "Fastest" or shortest duration. Verify durations are in 
ascending order.
```

**Expected Result:**
- Shortest flights appear first
- Duration increases down the list
- Typically nonstop flights at top

---

### Test Category 7: Combined Filters

#### Test 7.1: Price + Stops

**Agent Prompt:**
```
Apply both "Nonstop" filter AND a price filter under $400. Verify 
results match both criteria.
```

**Expected Result:**
- All results are nonstop AND under $400
- Result count reflects intersection
- Both filters shown as active

---

#### Test 7.2: Multiple Filter Combination

**Agent Prompt:**
```
Apply: 1) Nonstop only, 2) Specific airline, 3) Morning departure. 
Count results and verify each criterion is met.
```

**Expected Result:**
- Results meet all three criteria
- May have very few results
- All filters clearly indicated

---

#### Test 7.3: Filter Contradictions

**Agent Prompt:**
```
Apply filters that might result in no results (e.g., very low price + 
premium airline + nonstop on a long route). Document the "no results" 
handling.
```

**Expected Result:**
- Clear message when no results match
- Suggestions to broaden search
- Easy way to clear filters

---

### Test Category 8: Clear Filters

#### Test 8.1: Clear Individual Filter

**Agent Prompt:**
```
With multiple filters active, clear just one filter (e.g., stops). 
Verify other filters remain active and results update accordingly.
```

**Expected Result:**
- Selected filter is cleared
- Other filters remain
- Results update to reflect change

---

#### Test 8.2: Clear All Filters

**Agent Prompt:**
```
Find and use the "Clear All" or "Reset Filters" option. Verify all 
filters are removed and full results are shown.
```

**Expected Result:**
- All filters are cleared
- Results return to original unfiltered set
- Filter panel shows default state

---

## ✅ Validation Points

### Filter Accuracy

- [ ] Stops filter accurately restricts results
- [ ] Price filter respects boundaries
- [ ] Airline filter shows only selected carriers
- [ ] Time filters respect selected ranges
- [ ] Duration filter (if available) works correctly

### User Experience

- [ ] Filters apply quickly (within 2-3 seconds)
- [ ] Clear indication of active filters
- [ ] Easy to clear individual or all filters
- [ ] Result count updates with filters
- [ ] No page reload required (dynamic filtering)

### Sorting Accuracy

- [ ] "Best" sort provides logical ordering
- [ ] Price sort is strictly ascending/descending
- [ ] Duration sort is strictly ascending/descending

### Combined Behavior

- [ ] Multiple filters work together correctly
- [ ] Filter order doesn't affect results
- [ ] "No results" handling is user-friendly

---

## ⚠️ Edge Cases

| Edge Case | Test | Expected Behavior |
|-----------|------|-------------------|
| No matches | Very restrictive filters | "No results" message with suggestions |
| Single result | Narrow to one option | Single result displayed |
| All filtered | Filter everything out | Clear message, easy recovery |
| Price at extremes | Minimum or maximum slider position | Should work without errors |
| Time boundaries | Exactly midnight or noon | Inclusive behavior expected |

---

## 🐛 Common Issues to Watch For

1. **Filter Doesn't Apply**: Results don't change after selecting filter
2. **Count Mismatch**: Displayed count doesn't match actual results
3. **Filter Persists Incorrectly**: Filter state after navigating back
4. **Slow Updates**: Filters take too long to apply
5. **Incorrect Results**: Results don't match filter criteria
6. **Mobile Responsiveness**: Filters may behave differently on mobile
7. **Reset Issues**: Clear all doesn't fully reset

---

## 📸 Screenshots to Capture

| Step | Screenshot Description |
|------|----------------------|
| Initial Results | Unfiltered search results |
| Filter Panel | All filter options visible |
| Stops Filter Active | Results with stops filter |
| Price Filter Active | Results with price filter |
| Airline Selection | Airline filter dropdown/options |
| Combined Filters | Multiple filters active |
| No Results | No matches state |
| Sort Options | Sorting dropdown/buttons |

---

## 📝 Sample Agent Prompts Collection

### Filter Testing

```
Apply the nonstop filter and verify all results show direct flights.
```

```
Filter to show flights only from Delta Airlines and United Airlines.
```

```
Set the price filter to show flights between $200 and $400.
```

### Sorting Testing

```
Sort the results by price (cheapest first) and verify the order.
```

```
Compare the top 3 results when sorted by "Best" vs "Cheapest".
```

### Validation Testing

```
With filters applied, scroll through all results and verify each one 
matches the filter criteria.
```

```
Count the results before and after applying a filter to verify the 
count indicator is accurate.
```

---

<div align="center">

**[Back to Test Scenarios](../README.md#test-scenarios)**

</div>
