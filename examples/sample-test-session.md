# 📝 Sample Test Session

> A complete realistic example of a Playwright MCP testing session on Google Flights

---

## 🎯 Session Overview

**Date:** Example Session
**Tester:** QA Engineer using Playwright MCP
**Feature Tested:** Flight Search and Filtering
**Duration:** Approximately 25 minutes
**Status:** Completed with findings

---

## 📋 Session Objectives

1. Explore the Google Flights homepage
2. Execute a round-trip flight search
3. Test filtering functionality
4. Document observations and findings
5. Generate a summary report

---

## 🚀 Test Execution

### Phase 1: Initial Exploration

#### Prompt Given:
```
Navigate to https://www.google.com/travel/flights?gl=SA&hl=en and explore 
the homepage. Take a snapshot and identify the main interactive elements 
and user interface components.
```

#### Agent's Exploration Process:

The agent performed the following actions:
1. **Navigated** to Google Flights URL
2. **Waited** for page to fully load
3. **Captured** a page snapshot
4. **Analyzed** the page structure

#### Agent's Findings:

```markdown
## Page Analysis: Google Flights Homepage

### Main Components Identified:

1. **Search Form**
   - Trip type selector (Round-trip, One-way, Multi-city)
   - Origin field (Where from?)
   - Destination field (Where to?)
   - Date fields (Departure, Return)
   - Passenger selector (1 passenger default)
   - Cabin class selector (Economy default)
   - Search button

2. **Navigation**
   - Google logo
   - Travel navigation tabs (Flights, Hotels, etc.)
   - User account menu

3. **Additional Features**
   - Explore destinations section
   - Price tracking option
   - Popular routes

### Interactive Elements:
- 6 input fields
- 3 dropdown selectors
- 1 primary action button
- Multiple secondary links
```

---

### Phase 2: Flight Search Test

#### Prompt Given:
```
Search for a round-trip flight from New York (JFK) to Los Angeles (LAX). 
Select departure date 3 weeks from today and return 1 week later. 
Document each step and capture a screenshot of the search results.
```

#### Agent's Test Execution:

**Step 1: Enter Origin**
- Clicked origin field
- Typed "JFK"
- Autocomplete suggestions appeared within 1 second
- Selected "John F. Kennedy International Airport"
- ✅ Field updated to show "New York"

**Step 2: Enter Destination**
- Clicked destination field (cursor moved automatically)
- Typed "LAX"
- Autocomplete suggestions appeared
- Selected "Los Angeles International Airport"
- ✅ Field updated to show "Los Angeles"

**Step 3: Select Departure Date**
- Clicked departure date field
- Calendar opened showing current month
- Navigated forward one month
- Selected date (3 weeks from today)
- ✅ Date displayed in form

**Step 4: Select Return Date**
- Calendar remained open for return date
- Selected date (1 week after departure)
- ✅ Return date displayed
- ✅ Trip duration shown (7 days)

**Step 5: Execute Search**
- Clicked "Search" button
- Loading indicator appeared
- Results page loaded in approximately 4 seconds
- ✅ Multiple flight options displayed

#### Screenshot Description:
```
Search Results Page showing:
- 15+ flight options
- Prices ranging from $198 to $650+
- Various airlines (Delta, American, United, Southwest)
- Mix of nonstop and 1-stop flights
- Filter panel on the left side
```

---

### Phase 3: Filter Testing

#### Prompt Given:
```
Apply the "Nonstop" filter and verify all results show direct flights. 
Then apply a price filter under $400 and verify the combined filters work.
Take before and after screenshots.
```

#### Agent's Test Execution:

**Test 3.1: Nonstop Filter**

Before:
- Total results: 18 flights
- Mix of nonstop (6), 1-stop (8), 2+ stops (4)

Action:
- Located "Stops" filter in sidebar
- Selected "Nonstop only"

After:
- Results updated without page reload
- Total results: 6 flights
- ✅ All displayed flights show "Nonstop"
- ✅ Result count matches filter

**Test 3.2: Price Filter**

Action:
- Located price filter/slider
- Set maximum to $400

After:
- Results reduced from 6 to 4 flights
- ✅ All prices below $400
- ✅ Combined filters working correctly
- ✅ Both filter indicators showing as active

---

### Phase 4: Findings Documentation

#### Issue Discovered

**Issue 1: Filter Count Inconsistency (Minor)**

**Observation:** The filter chip showing number of results sometimes updates with a slight delay (1-2 seconds) after the actual results update.

**Steps to Reproduce:**
1. Apply any filter
2. Observe result count in filter chip
3. Compare to actual displayed results

**Expected:** Count should update simultaneously
**Actual:** Count updates 1-2 seconds after results

**Severity:** Low - cosmetic/minor UX issue
**Impact:** Could cause confusion if user acts quickly

#### Screenshot Description:
```
Filter panel showing:
- "Stops: Nonstop" with checkmark
- "Up to $400" price filter active
- Results showing 4 flights
- Filter count showing "4 results"
```

---

### Phase 5: Additional Observations

#### Prompt Given:
```
Test what happens when you select filters that result in no available flights.
Document the error handling and user experience.
```

#### Agent's Test Execution:

**Action:**
- Applied very restrictive filters:
  - Nonstop only
  - Price under $150
  - Specific airline (with few routes)

**Result:**
- No results matched all criteria
- Page displayed: "No flights match your filters"
- Suggestions shown: "Try adjusting your filters"
- Option to clear filters with one click
- ✅ Error handling is user-friendly

---

## 📊 Session Summary

### Tests Executed

| Test | Status | Notes |
|------|--------|-------|
| Homepage exploration | ✅ Pass | All elements identified |
| Origin selection | ✅ Pass | Autocomplete works well |
| Destination selection | ✅ Pass | No issues |
| Date selection | ✅ Pass | Calendar intuitive |
| Search execution | ✅ Pass | Results in ~4 seconds |
| Nonstop filter | ✅ Pass | Accurate filtering |
| Price filter | ✅ Pass | Works correctly |
| Combined filters | ✅ Pass | Intersection works |
| No results handling | ✅ Pass | Good UX |

### Metrics

| Metric | Value |
|--------|-------|
| Total prompts used | 5 |
| Screenshots captured | 6 |
| Issues found | 1 (minor) |
| Test cases passed | 9/9 |
| Time spent | ~25 minutes |

### Issues Found

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | Filter count update delay | Low | Open |

### Screenshots Captured

1. `homepage-initial.png` - Initial state
2. `search-form-filled.png` - Completed search form
3. `results-unfiltered.png` - All results
4. `results-nonstop.png` - Nonstop filter applied
5. `results-combined-filters.png` - Multiple filters
6. `no-results.png` - Empty results state

---

## 📝 Next Steps

Based on this session, recommended follow-up testing:

1. **Test other filter combinations** - especially airline + stops + time
2. **Date edge cases** - same day, far future, peak holidays
3. **Multi-city** - complex routing scenarios
4. **Mobile responsive** - repeat tests on mobile viewport
5. **Accessibility** - keyboard navigation through filters

---

## 💡 Recommendations

### For the QA Team:

1. **Reusable prompts** - The exploration and search prompts can be templated
2. **Filter testing** - Create systematic filter test matrix
3. **Regression suite** - Core flow can be repeated for regression

### For Development (if applicable):

1. **Consider** synchronizing filter count update with results
2. **Monitor** search response times (4 seconds is acceptable but could improve)

---

## 🎯 Agent Prompts Used (Reusable)

### Exploration
```
Navigate to https://www.google.com/travel/flights?gl=SA&hl=en and explore 
the homepage. Take a snapshot and identify the main interactive elements.
```

### Search Test
```
Search for a round-trip flight from [ORIGIN] to [DESTINATION]. 
Select departure date [DATE] and return [RETURN_DATE]. 
Document each step and capture screenshots.
```

### Filter Test
```
Apply the "[FILTER_NAME]" filter and verify all results match the criteria.
Take before and after screenshots.
```

### Edge Case
```
Test what happens when [EDGE_CASE_DESCRIPTION]. Document the error 
handling and user experience.
```

---

<div align="center">

**This sample session demonstrates the workflow and output format for Playwright MCP testing.**

[📖 More Agent Prompts](agent-prompts.md) | [🧪 Test Scenarios](../test-scenarios/)

</div>
