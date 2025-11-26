# ✈️ Test Scenario 05: Autocomplete Validation

> Testing airport and city search autocomplete functionality on Google Flights

---

## 🎯 Test Objective

Validate the autocomplete/search functionality including:
- Speed and responsiveness of suggestions
- Accuracy of search results
- Handling of various input types (codes, names, cities)
- Error handling for invalid inputs
- International airport support
- Special character handling

---

## 📋 Preconditions

- [ ] Google Flights is accessible
- [ ] Origin or destination input field is available
- [ ] Test data for various input scenarios is prepared
- [ ] Network connection is stable (for autocomplete performance testing)

---

## 📊 Test Data

### IATA Airport Codes

| Code | Airport | City |
|------|---------|------|
| JFK | John F. Kennedy International | New York |
| LAX | Los Angeles International | Los Angeles |
| LHR | London Heathrow | London |
| CDG | Charles de Gaulle | Paris |
| NRT | Narita International | Tokyo |
| SYD | Sydney Kingsford Smith | Sydney |
| DXB | Dubai International | Dubai |
| SIN | Singapore Changi | Singapore |
| FRA | Frankfurt Airport | Frankfurt |
| AMS | Amsterdam Schiphol | Amsterdam |

### Cities with Multiple Airports

| City | Airports |
|------|----------|
| New York | JFK, LGA, EWR |
| London | LHR, LGW, STN, LTN, LCY |
| Paris | CDG, ORY |
| Tokyo | NRT, HND |
| Chicago | ORD, MDW |
| Washington DC | IAD, DCA, BWI |
| Los Angeles | LAX, BUR, LGB, SNA |
| San Francisco Bay Area | SFO, OAK, SJC |

### International Names (Non-English)

| Airport | City | Country |
|---------|------|---------|
| Narita | 東京 (Tokyo) | Japan |
| Charles de Gaulle | Paris | France |
| Adolfo Suárez Madrid–Barajas | Madrid | Spain |
| Incheon | 서울 (Seoul) | South Korea |
| Beijing Capital | 北京 | China |

---

## 📝 Test Steps

### Test Category 1: Basic Autocomplete

#### Test 1.1: Airport Code Search

**Agent Prompt:**
```
Click on the origin field and type "JFK". Time how quickly suggestions 
appear and take a screenshot showing the autocomplete dropdown.
```

**Expected Result:**
- Suggestions appear within 0.5-2 seconds
- JFK is prominently displayed
- Full airport name is shown
- City name is visible (New York)

---

#### Test 1.2: Airport Code Selection

**Agent Prompt:**
```
From the autocomplete suggestions for "JFK", click to select 
"John F. Kennedy International Airport". Verify the selection 
appears correctly in the field.
```

**Expected Result:**
- Selection populates the field
- Shows either "New York" or "JFK" or both
- Autocomplete dropdown closes
- Focus may move to next field

---

#### Test 1.3: City Name Search

**Agent Prompt:**
```
Clear the field and type "Los Angeles" instead of the airport code. 
Observe what suggestions appear.
```

**Expected Result:**
- LAX appears in suggestions
- May show other nearby airports
- City name search works as well as codes

---

### Test Category 2: Multi-Airport Cities

#### Test 2.1: New York Area Airports

**Agent Prompt:**
```
Type "New York" in the origin field and observe all airport options 
that appear. Take a screenshot showing all NYC area airports.
```

**Expected Result:**
- JFK (John F. Kennedy) is shown
- LGA (LaGuardia) is shown
- EWR (Newark) may be shown
- May show "All airports" option

---

#### Test 2.2: Select Specific Airport vs All

**Agent Prompt:**
```
If available, look for a "New York area airports" or "All airports" 
option. Test selecting it vs selecting a specific airport.
```

**Expected Result:**
- All airports option searches across multiple airports
- Specific airport limits search
- Clear indication of what's selected

---

#### Test 2.3: London Airports

**Agent Prompt:**
```
Type "London" and document all the airports shown. London should 
have at least 5 major airports in suggestions.
```

**Expected Result:**
- Heathrow (LHR)
- Gatwick (LGW)
- Stansted (STN)
- Luton (LTN)
- London City (LCY)
- Possibly "All London airports" option

---

### Test Category 3: International Airports

#### Test 3.1: International City Name

**Agent Prompt:**
```
Type "Tokyo" and verify Japanese airports appear. Note if both 
Narita (NRT) and Haneda (HND) are shown.
```

**Expected Result:**
- Tokyo airports are found
- NRT (Narita) - main international
- HND (Haneda) - closer to city
- English names work for international airports

---

#### Test 3.2: International Airport Code

**Agent Prompt:**
```
Type "CDG" (Charles de Gaulle, Paris) and verify the correct 
airport is suggested.
```

**Expected Result:**
- CDG resolves to Charles de Gaulle
- Paris is shown as the city
- France may be indicated

---

#### Test 3.3: Non-English Characters

**Agent Prompt:**
```
If possible, try typing a city name with special characters 
like "São Paulo" or "Zürich". Note if special characters are handled.
```

**Expected Result:**
- May work with special characters
- Should also work without accents (Sao Paulo, Zurich)
- Graceful handling either way

---

### Test Category 4: Fuzzy Matching and Typos

#### Test 4.1: Minor Typo

**Agent Prompt:**
```
Type "Los Angales" (misspelled) and see if autocomplete still 
suggests Los Angeles.
```

**Expected Result:**
- Fuzzy matching may correct typos
- Los Angeles should still appear
- Or "No results" with suggestion to check spelling

---

#### Test 4.2: Phonetic Matching

**Agent Prompt:**
```
Type "Heethrow" (phonetic spelling error) and see if London 
Heathrow is suggested.
```

**Expected Result:**
- May or may not find Heathrow
- Demonstrates fuzzy matching limits
- Document actual behavior

---

#### Test 4.3: Abbreviations

**Agent Prompt:**
```
Type "NYC" and see if New York airports are suggested. 
Also try "LA" for Los Angeles.
```

**Expected Result:**
- Common abbreviations may work
- NYC → New York airports
- LA → Los Angeles airports
- Not all abbreviations may be supported

---

### Test Category 5: Edge Cases

#### Test 5.1: Empty Input

**Agent Prompt:**
```
Click on the origin field but don't type anything. Document if 
any suggestions appear (popular airports, recent searches).
```

**Expected Result:**
- May show recent searches
- May show popular airports
- May show nothing until typing starts

---

#### Test 5.2: Very Long Input

**Agent Prompt:**
```
Type a very long string like "John F Kennedy International Airport 
New York United States of America JFK". See how it's handled.
```

**Expected Result:**
- Input field may have character limit
- Should still search effectively
- No crashes or errors

---

#### Test 5.3: Special Characters Only

**Agent Prompt:**
```
Type special characters like "!@#$%" in the origin field. 
Document the error handling.
```

**Expected Result:**
- No results should appear
- No crashes or errors
- May show "No results found" message

---

#### Test 5.4: Numbers Only

**Agent Prompt:**
```
Type "12345" in the origin field. Verify no airports match 
and error handling is graceful.
```

**Expected Result:**
- No results for numeric input
- Graceful handling
- Clear indication to try different input

---

### Test Category 6: No Results Handling

#### Test 6.1: Invalid Airport Code

**Agent Prompt:**
```
Type "XYZ" or "ZZZZ" - invalid airport codes. Document how 
"no results" is communicated.
```

**Expected Result:**
- No results message appears
- May suggest checking spelling
- No false positives
- Clear indication no match found

---

#### Test 6.2: Non-Existent City

**Agent Prompt:**
```
Type "Asgard" or another fictional/non-existent city. 
Verify no results and appropriate messaging.
```

**Expected Result:**
- No results returned
- May suggest alternatives
- No crashes or errors

---

### Test Category 7: Performance

#### Test 7.1: Typing Speed

**Agent Prompt:**
```
Type "Los Angeles" quickly (all at once) and then slowly 
(character by character with pauses). Note any difference 
in autocomplete behavior.
```

**Expected Result:**
- Autocomplete should work with both speeds
- May debounce rapid typing
- Should not overwhelm with requests

---

#### Test 7.2: Network Latency Simulation

**Agent Prompt:**
```
Note the typical response time for autocomplete suggestions. 
Is there any loading indicator while waiting for suggestions?
```

**Expected Result:**
- Response within 1-2 seconds typically
- May show loading spinner
- Graceful handling of slow responses

---

### Test Category 8: Nearby Airports

#### Test 8.1: Nearby Suggestions

**Agent Prompt:**
```
Type "San Francisco" and check if nearby airports like OAK (Oakland) 
or SJC (San Jose) are suggested as alternatives.
```

**Expected Result:**
- Primary airport (SFO) shown first
- Nearby airports may be suggested
- "Nearby airports" section may exist

---

## ✅ Validation Points

### Autocomplete Speed

- [ ] Suggestions appear within 2 seconds
- [ ] No excessive delay for common searches
- [ ] Responsive to rapid typing

### Accuracy

- [ ] IATA codes return correct airports
- [ ] City names return relevant airports
- [ ] Multi-airport cities show all options
- [ ] International airports are found

### Error Handling

- [ ] Invalid codes show no results gracefully
- [ ] Typos are handled (fuzzy match or clear message)
- [ ] Special characters don't cause errors
- [ ] Empty input is handled appropriately

### User Experience

- [ ] Selection process is smooth
- [ ] Clear visual hierarchy in suggestions
- [ ] Easy to distinguish airports in same city
- [ ] Recent searches may be shown

---

## ⚠️ Edge Cases Summary

| Edge Case | Input | Expected |
|-----------|-------|----------|
| Empty input | (nothing) | Recent/popular or empty |
| Short input | "L" | May wait for more characters |
| Long input | Very long string | Truncate or handle gracefully |
| Numbers | "123" | No results |
| Special characters | "@#$" | No results |
| Mixed | "123ABC" | No results |
| Unicode | "東京" | May or may not work |
| Typos | "Los Angless" | Fuzzy match or no results |

---

## 🐛 Common Issues to Watch For

1. **Slow Suggestions**: Autocomplete takes too long
2. **Wrong Results**: Incorrect airports suggested
3. **Missing Airports**: Known airports not appearing
4. **Duplicate Entries**: Same airport shown multiple times
5. **Selection Issues**: Cannot select from dropdown
6. **Keyboard Navigation**: Arrow keys don't work in dropdown
7. **Mobile Touch**: Touch selection may be difficult
8. **Focus Issues**: Focus jumps unexpectedly

---

## 📸 Screenshots to Capture

| Step | Screenshot Description |
|------|----------------------|
| Autocomplete Dropdown | Suggestions appearing |
| Code Search | Results for IATA code |
| City Search | Results for city name |
| Multi-Airport | City with multiple airports |
| International | International airport results |
| No Results | Empty results state |
| Selection Made | Field after selection |

---

## 📝 Sample Agent Prompts Collection

### Basic Autocomplete

```
Type "JFK" in the origin field and wait for autocomplete suggestions.
```

```
Search for "San Francisco" and select SFO from the suggestions.
```

### Multi-Airport Cities

```
Type "London" and list all the airports shown in the autocomplete.
```

```
Compare searching for "New York" vs searching for "JFK" directly.
```

### Error Handling

```
Type an invalid airport code "XXXX" and document the no-results handling.
```

```
Test autocomplete with various typos: "Los Angelez", "San Fransisco".
```

### International

```
Search for Tokyo and verify both Narita (NRT) and Haneda (HND) appear.
```

```
Test searching for international airports using their IATA codes: CDG, FRA, SIN.
```

---

<div align="center">

**[Back to Test Scenarios](../README.md#test-scenarios)**

</div>
