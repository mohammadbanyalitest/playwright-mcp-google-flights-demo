# 🌍 Test Scenario 04: Multi-City Booking

> Testing complex multi-city flight routing on Google Flights

---

## 🎯 Test Objective

Validate the multi-city booking functionality including:
- Adding multiple flight segments
- Managing and reordering segments
- Removing segments
- Date sequencing logic
- Price calculation for complex routes
- Return to origin handling

---

## 📋 Preconditions

- [ ] Google Flights is accessible
- [ ] User knows how to access multi-city option
- [ ] Multiple destinations are planned for testing
- [ ] Dates for each segment are determined

---

## 📊 Test Data

### Multi-City Itineraries

#### Test Itinerary 1: US Triangle

| Segment | From | To | Date |
|---------|------|-----|------|
| 1 | JFK (New York) | LAX (Los Angeles) | Week 1, Monday |
| 2 | LAX (Los Angeles) | ORD (Chicago) | Week 1, Friday |
| 3 | ORD (Chicago) | JFK (New York) | Week 2, Monday |

#### Test Itinerary 2: European Tour

| Segment | From | To | Date |
|---------|------|-----|------|
| 1 | LHR (London) | CDG (Paris) | Week 1 |
| 2 | CDG (Paris) | FCO (Rome) | Week 2 |
| 3 | FCO (Rome) | BCN (Barcelona) | Week 3 |
| 4 | BCN (Barcelona) | LHR (London) | Week 4 |

#### Test Itinerary 3: Open Jaw

| Segment | From | To | Date |
|---------|------|-----|------|
| 1 | SFO (San Francisco) | NRT (Tokyo) | Week 1 |
| 2 | HND (Tokyo Haneda) | SFO (San Francisco) | Week 2 |

---

## 📝 Test Steps

### Test Category 1: Accessing Multi-City

#### Test 1.1: Find Multi-City Option

**Agent Prompt:**
```
Navigate to Google Flights and find the option to book a multi-city trip. 
This is usually in the trip type dropdown. Take a screenshot of the 
multi-city interface.
```

**Expected Result:**
- Multi-city option is available in trip type selector
- Interface changes to show multiple flight segments
- Each segment has origin, destination, and date fields

---

#### Test 1.2: Initial Multi-City Form

**Agent Prompt:**
```
After selecting multi-city, take a snapshot of the form. Describe how 
many segments are shown by default and what options are available.
```

**Expected Result:**
- Usually starts with 2 segments
- "Add flight" or "Add segment" button is visible
- Each segment has independent fields
- Option to remove segments may be present

---

### Test Category 2: Adding Flight Segments

#### Test 2.1: Fill First Segment

**Agent Prompt:**
```
Fill in the first flight segment: JFK to LAX for a date 3 weeks from today.
```

**Expected Result:**
- Origin and destination autocomplete works
- Date can be selected
- Segment shows complete information

---

#### Test 2.2: Fill Second Segment

**Agent Prompt:**
```
Fill in the second segment: LAX to ORD for a date 4 days after the 
first segment. Note if the origin auto-populates based on segment 1.
```

**Expected Result:**
- Second segment may auto-populate origin from segment 1's destination
- Date picker may default to day after segment 1
- Validates that dates are sequential

---

#### Test 2.3: Add Third Segment

**Agent Prompt:**
```
Click "Add flight" or equivalent to add a third segment. Fill it in: 
ORD to JFK for a date 4 days after segment 2. Take a screenshot of 
the complete 3-segment itinerary.
```

**Expected Result:**
- Third segment is added to form
- All three segments display correctly
- Return to origin (JFK) is handled properly
- Form remains usable and not cluttered

---

### Test Category 3: Segment Management

#### Test 3.1: Remove a Segment

**Agent Prompt:**
```
Try to remove the second (middle) segment from the itinerary. 
Document how this is done and what happens to the other segments.
```

**Expected Result:**
- Remove/delete button is available for each segment
- Removing a segment doesn't lose other segment data
- Segment numbering updates correctly
- May show warning before deletion

---

#### Test 3.2: Add Segment After Removal

**Agent Prompt:**
```
After removing a segment, add a new one. Verify the form handles 
addition and removal smoothly.
```

**Expected Result:**
- Can add new segments after removal
- Form maintains data integrity
- New segment appears in correct position

---

#### Test 3.3: Reorder Segments (if available)

**Agent Prompt:**
```
Check if segments can be reordered (drag and drop or move up/down buttons). 
If available, try swapping two segments.
```

**Expected Result:**
- Reordering may or may not be available
- If available, should work smoothly
- Dates should be validated after reorder

---

### Test Category 4: Date Sequencing

#### Test 4.1: Sequential Dates

**Agent Prompt:**
```
Verify that the date for segment 2 is after segment 1, and segment 3 
is after segment 2. Try to set them out of order and see what happens.
```

**Expected Result:**
- System should enforce or suggest sequential dates
- Setting earlier date may:
  - Show warning/error
  - Auto-adjust dates
  - Allow but warn user
- Clear indication of date constraints

---

#### Test 4.2: Same Day Connections

**Agent Prompt:**
```
Try setting segment 2 on the same day as segment 1 ends. 
Test if same-day connections are allowed.
```

**Expected Result:**
- Same-day connections may be allowed
- System should consider layover times
- May show warning about tight connections

---

#### Test 4.3: Large Date Gaps

**Agent Prompt:**
```
Set a 2-week gap between segments (e.g., segment 1 on the 1st, 
segment 2 on the 15th). Verify this is allowed for multi-city trips.
```

**Expected Result:**
- Large gaps should be allowed (it's multi-city, not layovers)
- No artificial restrictions on gap length
- May affect pricing display

---

### Test Category 5: Search and Results

#### Test 5.1: Execute Multi-City Search

**Agent Prompt:**
```
Complete a 3-segment multi-city itinerary and click search. Wait for 
results and take a screenshot of the multi-city search results.
```

**Expected Result:**
- Search executes for all segments
- Results show combined itinerary
- Prices reflect full journey
- Each segment options may be shown separately

---

#### Test 5.2: Results Display

**Agent Prompt:**
```
Examine the multi-city search results. Describe how flights for each 
segment are displayed and how pricing works.
```

**Expected Result:**
- Clear display of each segment's options
- May show mix-and-match options
- Total price is calculated
- Each segment can be viewed individually

---

#### Test 5.3: Segment Selection

**Agent Prompt:**
```
If results allow selecting different flights for each segment independently, 
try selecting options and see how the total price updates.
```

**Expected Result:**
- Can select preferred flight for each segment
- Total price updates with each selection
- Clear summary of selected itinerary

---

### Test Category 6: Complex Scenarios

#### Test 6.1: Four or More Segments

**Agent Prompt:**
```
Add a 4th and 5th segment to create a complex multi-city trip. 
Test if there's a maximum number of segments allowed.
```

**Expected Result:**
- May have maximum segment limit (often 5-6)
- Form should handle maximum gracefully
- All segments should be manageable

---

#### Test 6.2: International Multi-City

**Agent Prompt:**
```
Create a multi-city trip crossing multiple countries: 
New York → London → Paris → New York. Test international routing.
```

**Expected Result:**
- International routes work in multi-city
- Currency may be addressed
- All airports are recognized

---

#### Test 6.3: Open Jaw (Different Start/End)

**Agent Prompt:**
```
Create an "open jaw" trip where you don't return to the starting city:
Los Angeles → Tokyo → Singapore (end). Test if this is allowed.
```

**Expected Result:**
- Open jaw trips should be possible
- No requirement to return to origin
- Pricing handles one-way segments

---

## ✅ Validation Points

### Form Functionality

- [ ] Multi-city mode is accessible
- [ ] Can add multiple segments (at least 5)
- [ ] Can remove individual segments
- [ ] Each segment has independent fields
- [ ] Form updates correctly after changes

### Date Logic

- [ ] Sequential dates are enforced/suggested
- [ ] Cannot have segment 2 before segment 1
- [ ] Same-day connections are handled
- [ ] Large gaps between segments are allowed

### Search and Results

- [ ] Multi-city search executes correctly
- [ ] Results show all segments
- [ ] Pricing reflects full journey
- [ ] Can select options per segment

### User Experience

- [ ] Form is clear and not confusing
- [ ] Segment order is obvious
- [ ] Easy to understand what's booked
- [ ] Error messages are helpful

---

## ⚠️ Edge Cases

| Edge Case | Test | Expected Behavior |
|-----------|------|-------------------|
| Maximum segments | Add 6-10 segments | Hit limit gracefully |
| All same destination | NYC→LAX, LAX→LAX, LAX→NYC | Should prevent or warn |
| Circular but not returning | A→B→C→A→D | Should work |
| Overlapping dates | Segment 2 starts before segment 1 | Error handling |
| Very long total trip | 3+ months total | Should work |
| Mixed domestic/international | US domestic + transatlantic | Should work |

---

## 🐛 Common Issues to Watch For

1. **Lost Data**: Adding/removing segments loses other data
2. **Date Confusion**: Unclear which dates belong to which segment
3. **Price Inaccuracy**: Total doesn't match segment sum
4. **Limited Segments**: Can't add enough segments
5. **Reorder Issues**: Cannot fix segment order mistakes
6. **Search Errors**: Complex routes fail to search
7. **Mobile Issues**: Multi-city may be harder on mobile
8. **Loading Problems**: Results take very long for complex routes

---

## 📸 Screenshots to Capture

| Step | Screenshot Description |
|------|----------------------|
| Multi-City Option | Trip type selector showing multi-city |
| Empty Form | Initial multi-city form layout |
| Filled Form | Complete 3-segment itinerary |
| Add Segment | Adding a new segment |
| Remove Segment | Segment removal interface |
| Search Results | Multi-city search results |
| Selected Itinerary | Final selected flights |

---

## 📝 Sample Agent Prompts Collection

### Basic Multi-City

```
Set up a multi-city trip: New York to Los Angeles, then Los Angeles to Chicago, then Chicago back to New York.
```

```
Create a European multi-city: London to Paris, Paris to Rome, Rome to Barcelona, Barcelona to London.
```

### Segment Management

```
Add a 4th flight segment to the existing multi-city itinerary.
```

```
Remove the second flight segment and verify the remaining segments stay intact.
```

### Edge Case Testing

```
Try to set segment 2 to a date before segment 1 and document the error handling.
```

```
Test the maximum number of segments allowed in a multi-city booking.
```

### Complex Scenarios

```
Create an open-jaw trip that starts in San Francisco and ends in Seattle without returning to the origin.
```

```
Build a multi-city trip with segments in 5 different countries.
```

---

<div align="center">

**[Back to Test Scenarios](../README.md#test-scenarios)**

</div>
