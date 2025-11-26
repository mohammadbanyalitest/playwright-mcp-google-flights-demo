# ✈️ Test Scenario 01: Basic Flight Search

> Testing one-way and round-trip flight search functionality on Google Flights

---

## 🎯 Test Objective

Validate the core flight search functionality including:
- Origin and destination selection
- Date selection for one-way and round-trip
- Passenger configuration
- Cabin class selection
- Search execution and results display

---

## 📋 Preconditions

- [ ] Browser is open
- [ ] Google Flights is accessible at https://www.google.com/travel/flights?gl=SA&hl=en
- [ ] No prior search selections are cached (or start with default state)

---

## 📊 Test Data

### Airport Codes

| Route Type | Origin | Destination | Notes |
|------------|--------|-------------|-------|
| Domestic US | JFK (New York) | LAX (Los Angeles) | Popular route, many results |
| International | LHR (London) | JFK (New York) | Transatlantic |
| Short-haul | SFO (San Francisco) | SEA (Seattle) | Short duration |
| Long-haul | SYD (Sydney) | LAX (Los Angeles) | Long duration |

### Date Suggestions

| Type | Recommendation |
|------|----------------|
| Departure | 3-4 weeks from today |
| Return | 1 week after departure |
| Peak Travel | Check holiday periods |
| Off-Peak | Mid-week dates |

### Passenger Configurations

| Configuration | Adults | Children | Infants (in seat) | Infants (on lap) |
|--------------|--------|----------|-------------------|------------------|
| Solo traveler | 1 | 0 | 0 | 0 |
| Couple | 2 | 0 | 0 | 0 |
| Family | 2 | 2 | 0 | 0 |
| Family with infant | 2 | 1 | 0 | 1 |
| Group | 4 | 0 | 0 | 0 |

---

## 📝 Test Steps

### Test Case 1: Round-Trip Flight Search

#### Step 1: Navigate to Google Flights

**Agent Prompt:**
```
Navigate to https://www.google.com/travel/flights?gl=SA&hl=en and take a 
snapshot of the page. Describe the default state of the search form.
```

**Expected Result:**
- Page loads successfully
- Search form is visible with origin, destination, dates fields
- Default trip type should be "Round trip"
- Passenger count defaults to 1 adult

---

#### Step 2: Select Origin Airport

**Agent Prompt:**
```
Click on the origin (departure) field and type "JFK". Wait for the autocomplete 
suggestions to appear, then select "John F. Kennedy International Airport" from 
the list. Take a screenshot showing the selection.
```

**Expected Result:**
- Autocomplete dropdown appears within 1-2 seconds
- JFK option is visible in suggestions
- After selection, field shows "New York" or "JFK"

---

#### Step 3: Select Destination Airport

**Agent Prompt:**
```
Click on the destination field and type "LAX". Select "Los Angeles International 
Airport" from the autocomplete suggestions. Take a screenshot.
```

**Expected Result:**
- Autocomplete appears with LAX suggestions
- Selection populates the destination field
- No errors or unexpected behavior

---

#### Step 4: Select Departure Date

**Agent Prompt:**
```
Click on the departure date field to open the calendar. Navigate to next month 
and select the 15th. Take a screenshot of the calendar and the selected date.
```

**Expected Result:**
- Calendar opens on click
- Can navigate between months
- Date is selectable (not disabled)
- Selected date is highlighted

---

#### Step 5: Select Return Date

**Agent Prompt:**
```
Select a return date of the 22nd of the same month. Verify both dates are 
displayed correctly in the form.
```

**Expected Result:**
- Return date is set after departure date
- Both dates are visible in the form
- Duration is reasonable (7 days in this case)

---

#### Step 6: Execute Search

**Agent Prompt:**
```
Click the Search button to execute the flight search. Wait for results to load 
and take a screenshot of the results page. Count how many flight options are 
displayed.
```

**Expected Result:**
- Search executes without errors
- Results page loads within reasonable time (5-10 seconds)
- Multiple flight options are displayed
- Results show price, duration, airline, and stops

---

### Test Case 2: One-Way Flight Search

#### Step 1: Change Trip Type

**Agent Prompt:**
```
On Google Flights, change the trip type from "Round trip" to "One way". 
Take a screenshot showing the trip type selector.
```

**Expected Result:**
- Trip type dropdown is accessible
- "One way" option is selectable
- Return date field disappears or becomes inactive

---

#### Step 2: Complete One-Way Search

**Agent Prompt:**
```
Search for a one-way flight from SFO to SEA for a date two weeks from today. 
Execute the search and capture the results.
```

**Expected Result:**
- One-way search executes correctly
- Results show one-way flights only
- No return flight information displayed

---

### Test Case 3: Passenger Configuration

#### Step 1: Add Multiple Passengers

**Agent Prompt:**
```
Click on the passengers selector (showing "1 passenger" by default). 
Add 1 additional adult and 2 children. Take a screenshot of the 
passenger selection panel.
```

**Expected Result:**
- Passenger selector opens
- Can add adults, children, infants
- Total updates as selections change
- Maximum limits are enforced (usually 9 total)

---

#### Step 2: Search with Multiple Passengers

**Agent Prompt:**
```
With 2 adults and 2 children selected, execute a flight search and verify 
the results reflect multiple passengers in the pricing.
```

**Expected Result:**
- Search works with multiple passengers
- Prices may reflect per-person or total
- Number of passengers is confirmed in results

---

### Test Case 4: Cabin Class Selection

**Agent Prompt:**
```
Change the cabin class from Economy to Business. Execute a search from 
JFK to LAX and compare if prices are different from Economy class.
```

**Expected Result:**
- Cabin class dropdown shows options (Economy, Premium Economy, Business, First)
- Selection persists during search
- Results may show different prices for higher classes
- Some routes may not have all cabin classes available

---

## ✅ Validation Points

### Search Form Validation

- [ ] Origin field accepts airport codes and city names
- [ ] Destination field works the same as origin
- [ ] Autocomplete suggestions are relevant and timely
- [ ] Date picker allows selection of future dates only
- [ ] Past dates are disabled in the calendar
- [ ] Passenger count updates correctly
- [ ] Cabin class selection persists

### Search Results Validation

- [ ] Results match the search criteria (correct route)
- [ ] Dates in results match selected dates
- [ ] Multiple options are displayed
- [ ] Prices are clearly visible
- [ ] Airline information is shown
- [ ] Duration and stops are displayed
- [ ] No JavaScript errors in console

---

## ⚠️ Edge Cases

### Origin/Destination Edge Cases

| Test | Action | Expected |
|------|--------|----------|
| Same origin and destination | Enter JFK for both | Error message or prevention |
| Invalid airport code | Type "XYZ123" | No results or error handling |
| City with multiple airports | Search "New York" | Show all NYC area airports |
| International destination | US to non-US | Results with international flights |

### Date Edge Cases

| Test | Action | Expected |
|------|--------|----------|
| Today's date | Select current date | May allow or show warning |
| Past date | Try to select yesterday | Should be disabled |
| Far future (>1 year) | Select date 18 months out | May have limited availability |
| Return before departure | Set return earlier than departure | Error or automatic swap |

### Passenger Edge Cases

| Test | Action | Expected |
|------|--------|----------|
| Maximum passengers | Try to add 10+ passengers | Should cap at maximum (usually 9) |
| Only infants | Try 0 adults, 1 infant | Should require at least 1 adult |
| Many infants | 2 adults, 5 lap infants | May have restrictions |

---

## 🐛 Common Issues to Watch For

1. **Autocomplete Delays**: Suggestions should appear within 2 seconds
2. **Date Picker Issues**: Calendar should be intuitive to navigate
3. **Form State Loss**: Selections should persist while filling other fields
4. **Search Button State**: Should be disabled until required fields are filled
5. **Loading Indicators**: User should see progress during search
6. **No Results Handling**: Graceful message if no flights found
7. **Price Display**: Should be consistent format and currency

---

## 📸 Screenshots to Capture

| Step | Screenshot Description |
|------|----------------------|
| Initial State | Default search form |
| Origin Selection | Autocomplete suggestions for origin |
| Destination Selection | Completed route selection |
| Date Selection | Calendar with dates selected |
| Passenger Panel | Multiple passenger selection |
| Search Results | Full results page |
| Flight Details | Expanded flight information |

---

## 📝 Sample Agent Prompts Collection

### Quick Test Prompts

```
Test a basic round-trip search from JFK to LAX for next month.
```

```
Search for a one-way flight from London (LHR) to New York (JFK) for two passengers.
```

```
Test the passenger selector by adding 2 adults and 1 child, then search for flights.
```

### Validation Prompts

```
Verify that the search results display the correct origin and destination airports.
```

```
Check that all displayed flight prices include the selected number of passengers.
```

### Edge Case Prompts

```
Try to set the return date before the departure date and document the behavior.
```

```
Test what happens when you enter an invalid airport code like "XXXXX".
```

---

<div align="center">

**[Back to Test Scenarios](../README.md#test-scenarios)**

</div>
