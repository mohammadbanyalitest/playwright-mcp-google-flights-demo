import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate test scenarios Excel file for Google Flights testing
 * Using standard test case management format
 */

// Airport name mapping for detailed steps
const airportNames = {
  'JFK': 'John F. Kennedy International Airport',
  'LAX': 'Los Angeles International Airport',
  'LHR': 'London Heathrow Airport',
  'CDG': 'Paris Charles de Gaulle Airport',
  'SFO': 'San Francisco International Airport',
  'SEA': 'Seattle-Tacoma International Airport',
  'SYD': 'Sydney Kingsford Smith Airport',
  'ORD': "Chicago O'Hare International Airport",
  'MIA': 'Miami International Airport',
  'NRT': 'Narita International Airport',
  'DEN': 'Denver International Airport',
  'LAS': 'Las Vegas Harry Reid International Airport',
  'BOS': 'Boston Logan International Airport',
  'DCA': 'Ronald Reagan Washington National Airport',
  'FRA': 'Frankfurt Airport',
  'HKG': 'Hong Kong International Airport',
  'DUB': 'Dublin Airport',
  'ATL': 'Hartsfield-Jackson Atlanta International Airport',
  'MCO': 'Orlando International Airport',
  'DFW': 'Dallas/Fort Worth International Airport',
  'FCO': 'Rome Fiumicino Airport',
  'BCN': 'Barcelona-El Prat Airport',
  'SIN': 'Singapore Changi Airport',
  'HND': 'Tokyo Haneda Airport',
  'PHX': 'Phoenix Sky Harbor International Airport'
};

/**
 * Get airport full name
 */
function getAirportName(code) {
  return airportNames[code] || `${code} Airport`;
}

/**
 * Generate passenger description
 */
function getPassengerDescription(adults, children, infants) {
  const parts = [];
  if (adults > 0) parts.push(`${adults} adult${adults > 1 ? 's' : ''}`);
  if (children > 0) parts.push(`${children} child${children > 1 ? 'ren' : ''}`);
  if (infants > 0) parts.push(`${infants} infant${infants > 1 ? 's' : ''} (lap)`);
  return parts.join(', ');
}

/**
 * Generate flight search steps
 */
function generateFlightSearchSteps(data) {
  const steps = [];
  steps.push('1. Navigate to https://www.google.com/travel/flights');
  
  if (data.tripType === 'One-way') {
    steps.push('2. Click trip type dropdown and select "One way"');
  } else {
    steps.push('2. Verify trip type is set to "Round-trip"');
  }
  
  steps.push(`3. Click origin field and enter "${data.origin}"`);
  steps.push(`4. Select "${getAirportName(data.origin)}" from autocomplete`);
  steps.push(`5. Click destination field and enter "${data.destination}"`);
  steps.push(`6. Select "${getAirportName(data.destination)}" from autocomplete`);
  steps.push(`7. Click departure date field and select a date ${data.departureDate} from today`);
  
  if (data.tripType !== 'One-way' && data.returnDate && data.returnDate !== 'N/A') {
    steps.push(`8. Click return date field and select a date ${data.returnDate} from today`);
  }
  
  const totalPassengers = data.adults + data.children + data.infants;
  const stepNum = data.tripType === 'One-way' || !data.returnDate || data.returnDate === 'N/A' ? 8 : 9;
  
  if (totalPassengers > 1 || data.children > 0 || data.infants > 0) {
    steps.push(`${stepNum}. Click passenger selector and set: ${getPassengerDescription(data.adults, data.children, data.infants)}`);
  } else {
    steps.push(`${stepNum}. Verify passenger count is 1 adult`);
  }
  
  if (data.cabinClass !== 'Economy') {
    steps.push(`${stepNum + 1}. Click cabin class dropdown and select "${data.cabinClass}"`);
  } else {
    steps.push(`${stepNum + 1}. Verify cabin class is Economy`);
  }
  
  steps.push(`${stepNum + 2}. Click Search button`);
  steps.push(`${stepNum + 3}. Wait for results to load`);
  
  return steps.join('\n');
}

/**
 * Generate test case description for flight search
 */
function generateFlightSearchDescription(data) {
  const routeType = data.origin.length === 3 && data.destination.length === 3 ? 
    (isInternationalRoute(data.origin, data.destination) ? 'international' : 'domestic') : 'flight';
  
  const description = `Test ${data.tripType.toLowerCase()} ${routeType} flight search functionality. ` +
    `Verifies that the search form accepts valid inputs for ${getPassengerDescription(data.adults, data.children, data.infants)} ` +
    `traveling in ${data.cabinClass} class and returns flight results.`;
  
  const prerequisites = `\n\nPre-requisites:\n- Google Flights is accessible\n- Browser is open\n- No cached search data`;
  
  return description + prerequisites;
}

// US airports for route classification
const US_AIRPORTS = ['JFK', 'LAX', 'SFO', 'SEA', 'ORD', 'MIA', 'DEN', 'LAS', 'BOS', 'DCA', 'ATL', 'MCO', 'DFW', 'PHX'];

/**
 * Check if route is international
 */
function isInternationalRoute(origin, destination) {
  const originUS = US_AIRPORTS.includes(origin);
  const destUS = US_AIRPORTS.includes(destination);
  return originUS !== destUS || (!originUS && !destUS);
}

// Threshold for considering a booking as having "many" children (affects severity)
const MANY_CHILDREN_THRESHOLD = 2;

/**
 * Determine severity for flight search tests
 */
function getFlightSearchSeverity(data) {
  // Core functionality tests are High, edge cases are Medium
  if (data.tripType === 'Round-trip' && data.adults === 1 && data.cabinClass === 'Economy') {
    return 'High';
  }
  // Complex passenger configurations (infants or many children) are Medium
  if (data.infants > 0 || data.children > MANY_CHILDREN_THRESHOLD) {
    return 'Medium';
  }
  if (data.cabinClass === 'First' || data.cabinClass === 'Business') {
    return 'Medium';
  }
  return 'High';
}

// Sheet 1: Basic Flight Search test scenarios (raw data for transformation)
const basicFlightSearchRawData = [
  { id: 'BFS-001', name: 'Round-trip domestic flight - Solo traveler', tripType: 'Round-trip', origin: 'JFK', destination: 'LAX', departureDate: '+21 days', returnDate: '+28 days', adults: 1, children: 0, infants: 0, cabinClass: 'Economy', expectedResult: 'Search results displayed with multiple flight options', comment: 'Standard domestic route test case' },
  { id: 'BFS-002', name: 'Round-trip international flight - Couple', tripType: 'Round-trip', origin: 'LHR', destination: 'JFK', departureDate: '+30 days', returnDate: '+37 days', adults: 2, children: 0, infants: 0, cabinClass: 'Economy', expectedResult: 'Transatlantic flight options displayed with prices for 2 passengers', comment: 'International transatlantic route' },
  { id: 'BFS-003', name: 'One-way domestic short-haul flight', tripType: 'One-way', origin: 'SFO', destination: 'SEA', departureDate: '+14 days', returnDate: 'N/A', adults: 1, children: 0, infants: 0, cabinClass: 'Economy', expectedResult: 'One-way flight results displayed, no return date shown', comment: 'Short domestic one-way route' },
  { id: 'BFS-004', name: 'Round-trip long-haul flight - Family', tripType: 'Round-trip', origin: 'SYD', destination: 'LAX', departureDate: '+45 days', returnDate: '+60 days', adults: 2, children: 2, infants: 0, cabinClass: 'Economy', expectedResult: 'Long-haul flight options with pricing for 4 passengers', comment: 'Long-haul transpacific family trip' },
  { id: 'BFS-005', name: 'One-way international flight - Business class', tripType: 'One-way', origin: 'JFK', destination: 'CDG', departureDate: '+21 days', returnDate: 'N/A', adults: 1, children: 0, infants: 0, cabinClass: 'Business', expectedResult: 'Business class flight options displayed with premium pricing', comment: 'Premium cabin international' },
  { id: 'BFS-006', name: 'Round-trip domestic - Family with infant', tripType: 'Round-trip', origin: 'ORD', destination: 'MIA', departureDate: '+28 days', returnDate: '+35 days', adults: 2, children: 1, infants: 1, cabinClass: 'Economy', expectedResult: 'Flight options for family with infant, lap infant handling verified', comment: 'Tests infant passenger handling' },
  { id: 'BFS-007', name: 'Round-trip international - First class', tripType: 'Round-trip', origin: 'LAX', destination: 'NRT', departureDate: '+60 days', returnDate: '+74 days', adults: 2, children: 0, infants: 0, cabinClass: 'First', expectedResult: 'First class options displayed for transpacific route', comment: 'First class premium test' },
  { id: 'BFS-008', name: 'One-way domestic - Group travel', tripType: 'One-way', origin: 'DEN', destination: 'LAS', departureDate: '+35 days', returnDate: 'N/A', adults: 4, children: 0, infants: 0, cabinClass: 'Economy', expectedResult: 'Flight options for group of 4 adults displayed', comment: 'Group booking test' },
  { id: 'BFS-009', name: 'Round-trip short domestic - Premium Economy', tripType: 'Round-trip', origin: 'BOS', destination: 'DCA', departureDate: '+10 days', returnDate: '+12 days', adults: 1, children: 0, infants: 0, cabinClass: 'Premium Economy', expectedResult: 'Premium economy options for short domestic route', comment: 'Premium economy cabin test' },
  { id: 'BFS-010', name: 'Round-trip Europe to Asia - Mixed cabin', tripType: 'Round-trip', origin: 'FRA', destination: 'HKG', departureDate: '+42 days', returnDate: '+56 days', adults: 2, children: 1, infants: 0, cabinClass: 'Business', expectedResult: 'Business class options for Europe-Asia route with 3 passengers', comment: 'Europe-Asia international route' },
  { id: 'BFS-011', name: 'One-way transatlantic - Large family', tripType: 'One-way', origin: 'DUB', destination: 'BOS', departureDate: '+50 days', returnDate: 'N/A', adults: 2, children: 3, infants: 0, cabinClass: 'Economy', expectedResult: 'Flight options for 5 passengers on transatlantic route', comment: 'Large family booking test' },
  { id: 'BFS-012', name: 'Round-trip weekend getaway', tripType: 'Round-trip', origin: 'ATL', destination: 'MCO', departureDate: '+7 days', returnDate: '+9 days', adults: 2, children: 2, infants: 0, cabinClass: 'Economy', expectedResult: 'Short trip options for family weekend travel', comment: 'Short trip weekend booking' }
];

// Transform to new format
const basicFlightSearchData = basicFlightSearchRawData.map(data => ({
  'Test Case ID*': data.id,
  'Area*': 'Basic Flight Search',
  'Test Case Name*': data.name,
  'Test Case Description*': generateFlightSearchDescription(data),
  'Steps To Reproduce*': generateFlightSearchSteps(data),
  'Expected Results*': `Search executes successfully. Results page displays multiple flight options from ${data.origin} to ${data.destination} with prices, airlines, duration, and stop information.${data.tripType === 'Round-trip' ? ' Both outbound and return flights are shown.' : ''}`,
  'Execution Result*': 'Not Run',
  'Observed Results (In case of failure)*': '',
  'Test Case Severity*': getFlightSearchSeverity(data),
  'Executed By*': '',
  'Execution Date*': '',
  'Created By*': 'Test Automation Team',
  'Comments': data.comment
}));

/**
 * Generate filter/sort test steps
 */
function generateFilterSortSteps(data) {
  const steps = [];
  const [origin, destination] = data.searchRoute.split(' to ');
  
  steps.push('1. Navigate to https://www.google.com/travel/flights');
  steps.push(`2. Enter origin "${origin}" and select from autocomplete`);
  steps.push(`3. Enter destination "${destination}" and select from autocomplete`);
  steps.push('4. Select departure date +21 days from today');
  steps.push('5. Click Search button');
  steps.push('6. Wait for search results to load');
  
  let stepNum = 7;
  
  if (data.filterType !== 'None') {
    const filterTypes = data.filterType.split(' + ');
    const filterValues = data.filterValue.split(', ');
    
    for (let i = 0; i < filterTypes.length; i++) {
      const filterType = filterTypes[i].trim();
      const filterValue = filterValues[i] ? filterValues[i].trim() : data.filterValue;
      
      if (filterType === 'Stops') {
        steps.push(`${stepNum}. Locate the "Stops" filter dropdown`);
        steps.push(`${stepNum + 1}. Click to expand and select "${filterValue}"`);
        stepNum += 2;
      } else if (filterType === 'Price') {
        steps.push(`${stepNum}. Locate the price slider/filter`);
        steps.push(`${stepNum + 1}. Adjust to filter flights "${filterValue}"`);
        stepNum += 2;
      } else if (filterType === 'Airline') {
        steps.push(`${stepNum}. Click on "Airlines" filter`);
        steps.push(`${stepNum + 1}. Select airline(s): ${filterValue}`);
        stepNum += 2;
      } else if (filterType === 'Time') {
        steps.push(`${stepNum}. Click on "Times" filter`);
        steps.push(`${stepNum + 1}. Adjust time slider to "${filterValue}"`);
        stepNum += 2;
      } else if (filterType === 'Duration') {
        steps.push(`${stepNum}. Locate the "Duration" filter`);
        steps.push(`${stepNum + 1}. Set maximum duration to "${filterValue}"`);
        stepNum += 2;
      }
    }
  }
  
  if (data.sortBy !== 'Best') {
    steps.push(`${stepNum}. Click on sort dropdown`);
    steps.push(`${stepNum + 1}. Select "Sort by ${data.sortBy}"`);
    stepNum += 2;
  }
  
  steps.push(`${stepNum}. Verify filtered/sorted results are displayed correctly`);
  
  return steps.join('\n');
}

/**
 * Generate filter/sort description
 */
function generateFilterSortDescription(data) {
  let description = `Test ${data.filterType !== 'None' ? data.filterType.toLowerCase() + ' filtering' : 'default sorting'}`;
  if (data.sortBy !== 'Best') {
    description += ` with ${data.sortBy.toLowerCase()} sorting`;
  }
  description += ` functionality on Google Flights search results.`;
  
  if (data.filterType !== 'None') {
    description += ` Verifies that applying ${data.filterType} filter with value "${data.filterValue}" correctly filters the results.`;
  }
  
  const prerequisites = `\n\nPre-requisites:\n- Google Flights is accessible\n- Search results are available for route ${data.searchRoute}\n- Filters panel is visible`;
  
  return description + prerequisites;
}

/**
 * Determine severity for filter/sort tests
 */
function getFilterSortSeverity(data) {
  // Core filter tests are High
  if (data.filterType === 'Stops' || data.filterType === 'Price' || data.filterType === 'None') {
    return 'High';
  }
  // Combined filters are Medium
  if (data.filterType.includes('+')) {
    return 'Medium';
  }
  return 'High';
}

// Sheet 2: Filter and Sort test scenarios (raw data)
const filterAndSortRawData = [
  { id: 'FS-001', name: 'Filter nonstop flights only', searchRoute: 'JFK to LAX', filterType: 'Stops', filterValue: 'Nonstop', sortBy: 'Best', expectedBehavior: 'Only nonstop flights displayed, all results show 0 stops', comment: 'Basic stops filter test' },
  { id: 'FS-002', name: 'Filter by 1 stop flights', searchRoute: 'JFK to LAX', filterType: 'Stops', filterValue: '1 stop', sortBy: 'Best', expectedBehavior: 'Only flights with exactly 1 stop displayed', comment: '1-stop filter test' },
  { id: 'FS-003', name: 'Filter by price range - Budget', searchRoute: 'SFO to SEA', filterType: 'Price', filterValue: 'Under $200', sortBy: 'Price', expectedBehavior: 'All displayed flights priced under $200', comment: 'Budget price filter test' },
  { id: 'FS-004', name: 'Filter by single airline', searchRoute: 'ORD to DFW', filterType: 'Airline', filterValue: 'United Airlines', sortBy: 'Best', expectedBehavior: 'Only United Airlines flights displayed', comment: 'Single airline filter' },
  { id: 'FS-005', name: 'Filter by multiple airlines', searchRoute: 'JFK to LAX', filterType: 'Airline', filterValue: 'Delta, American', sortBy: 'Best', expectedBehavior: 'Only Delta and American Airlines flights displayed', comment: 'Multiple airline filter' },
  { id: 'FS-006', name: 'Filter by morning departure time', searchRoute: 'BOS to MIA', filterType: 'Time', filterValue: 'Departure before 12 PM', sortBy: 'Duration', expectedBehavior: 'All flights depart before noon', comment: 'Departure time filter' },
  { id: 'FS-007', name: 'Filter by evening arrival time', searchRoute: 'LAX to JFK', filterType: 'Time', filterValue: 'Arrival 6 PM - midnight', sortBy: 'Best', expectedBehavior: 'All flights arrive in the evening hours', comment: 'Arrival time filter' },
  { id: 'FS-008', name: 'Filter by maximum duration', searchRoute: 'JFK to LAX', filterType: 'Duration', filterValue: 'Under 6 hours', sortBy: 'Duration', expectedBehavior: 'All flights have total duration under 6 hours', comment: 'Duration filter test' },
  { id: 'FS-009', name: 'Sort by cheapest price', searchRoute: 'DEN to LAS', filterType: 'None', filterValue: 'N/A', sortBy: 'Price', expectedBehavior: 'Flights sorted from lowest to highest price', comment: 'Price sorting test' },
  { id: 'FS-010', name: 'Sort by fastest duration', searchRoute: 'ATL to MCO', filterType: 'None', filterValue: 'N/A', sortBy: 'Duration', expectedBehavior: 'Shortest flights appear first, duration ascending', comment: 'Duration sorting test' },
  { id: 'FS-011', name: 'Combined filters - Nonstop + Price', searchRoute: 'JFK to LAX', filterType: 'Stops + Price', filterValue: 'Nonstop, Under $400', sortBy: 'Best', expectedBehavior: 'Only nonstop flights under $400 displayed', comment: 'Combined filter test' },
  { id: 'FS-012', name: 'Combined filters - Airline + Time + Stops', searchRoute: 'ORD to LAX', filterType: 'Airline + Time + Stops', filterValue: 'United, Morning departure, Nonstop', sortBy: 'Price', expectedBehavior: 'United nonstop morning flights only', comment: 'Complex combined filter test' }
];

// Transform to new format
const filterAndSortData = filterAndSortRawData.map(data => ({
  'Test Case ID*': data.id,
  'Area*': 'Filtering and Sorting',
  'Test Case Name*': data.name,
  'Test Case Description*': generateFilterSortDescription(data),
  'Steps To Reproduce*': generateFilterSortSteps(data),
  'Expected Results*': data.expectedBehavior + '. Results update dynamically and accurately reflect applied filters.',
  'Execution Result*': 'Not Run',
  'Observed Results (In case of failure)*': '',
  'Test Case Severity*': getFilterSortSeverity(data),
  'Executed By*': '',
  'Execution Date*': '',
  'Created By*': 'Test Automation Team',
  'Comments': data.comment
}));

/**
 * Generate date selection test steps
 */
function generateDateSelectionSteps(data) {
  const steps = [];
  
  steps.push('1. Navigate to https://www.google.com/travel/flights');
  steps.push('2. Enter origin "JFK" and select from autocomplete');
  steps.push('3. Enter destination "LAX" and select from autocomplete');
  
  if (data.dateType === 'One-way') {
    steps.push('4. Click trip type dropdown and select "One way"');
    steps.push('5. Click on departure date field to open calendar');
    steps.push(`6. Navigate calendar to select date: ${data.dateValue}`);
    steps.push('7. Verify date is properly selected in the field');
    steps.push('8. Click Search button');
    steps.push('9. Verify search proceeds with selected date');
  } else if (data.dateType === 'Departure') {
    steps.push('4. Click on departure date field to open calendar');
    steps.push(`5. Navigate calendar to select date: ${data.dateValue}`);
    steps.push('6. Verify date is properly selected and highlighted');
    steps.push('7. Observe system behavior for the selection');
  } else if (data.dateType === 'Return') {
    steps.push('4. Select a departure date first (+21 days)');
    steps.push('5. Click on return date field to open calendar');
    steps.push(`6. Attempt to select return date: ${data.dateValue}`);
    steps.push('7. Observe system behavior for the selection');
  } else if (data.dateType === 'Departure/Return') {
    steps.push('4. Click on departure date field to open calendar');
    steps.push(`5. Select departure date as specified: ${data.dateValue.split(',')[0] || data.dateValue}`);
    steps.push('6. Click on return date field');
    steps.push(`7. Select return date as specified: ${data.dateValue.includes(',') ? data.dateValue.split(',')[1].trim() : 'same/next day'}`);
    steps.push('8. Verify both dates are properly selected');
    steps.push('9. Click Search button and observe results');
  }
  
  return steps.join('\n');
}

/**
 * Generate date selection description
 */
function generateDateSelectionDescription(data) {
  let description = `Test date selection functionality for ${data.dateType.toLowerCase()} date field.`;
  
  if (data.isEdgeCase) {
    description += ` This is an edge case test that verifies system behavior for ${data.name.toLowerCase()}.`;
  } else {
    description += ` Verifies that the calendar component allows selection of ${data.dateValue} and correctly updates the search form.`;
  }
  
  const prerequisites = `\n\nPre-requisites:\n- Google Flights is accessible\n- Browser is open\n- Calendar widget is functional`;
  
  return description + prerequisites;
}

/**
 * Determine severity for date selection tests
 */
function getDateSelectionSeverity(data) {
  // Edge cases are Medium, core date selection is High
  if (data.isEdgeCase) {
    return 'Medium';
  }
  return 'High';
}

// Sheet 3: Date Selection test scenarios (raw data)
const dateSelectionRawData = [
  { id: 'DS-001', name: 'Standard departure date selection - 3 weeks out', dateType: 'Departure', dateValue: '+21 days', expectedBehavior: 'Date is selectable, calendar highlights selection', isEdgeCase: false, comment: 'Standard date selection' },
  { id: 'DS-002', name: 'Standard return date selection - 1 week after departure', dateType: 'Return', dateValue: '+28 days', expectedBehavior: 'Return date selected, range highlighted in calendar', isEdgeCase: false, comment: 'Return date selection' },
  { id: 'DS-003', name: 'One-way date selection', dateType: 'One-way', dateValue: '+14 days', expectedBehavior: 'Single date selected, no return date field shown', isEdgeCase: false, comment: 'One-way trip date' },
  { id: 'DS-004', name: 'Same-day departure and return', dateType: 'Departure/Return', dateValue: '+7 days (same day)', expectedBehavior: 'May allow or show warning about same-day return', isEdgeCase: true, comment: 'Same-day trip edge case' },
  { id: 'DS-005', name: 'Past date selection attempt', dateType: 'Departure', dateValue: '-1 day', expectedBehavior: 'Date should be disabled/grayed out, not selectable', isEdgeCase: true, comment: 'Past date validation' },
  { id: 'DS-006', name: 'Far future date - 11 months out', dateType: 'Departure', dateValue: '+330 days', expectedBehavior: 'Date may be selectable with limited availability warning', isEdgeCase: true, comment: 'Far future booking test' },
  { id: 'DS-007', name: 'Return date before departure attempt', dateType: 'Return', dateValue: 'Before departure', expectedBehavior: 'Error message or auto-correction of dates', isEdgeCase: true, comment: 'Invalid date order test' },
  { id: 'DS-008', name: 'Calendar month navigation - Forward', dateType: 'Departure', dateValue: '+60 days', expectedBehavior: 'Calendar navigates to correct month, dates selectable', isEdgeCase: false, comment: 'Calendar navigation test' },
  { id: 'DS-009', name: 'Calendar month navigation - Year boundary', dateType: 'Departure', dateValue: 'Dec 31 to Jan 1', expectedBehavior: 'Year increments correctly when crossing year boundary', isEdgeCase: true, comment: 'Year boundary edge case' },
  { id: 'DS-010', name: "Today's date selection", dateType: 'Departure', dateValue: 'Today', expectedBehavior: 'May be selectable for last-minute flights or disabled', isEdgeCase: true, comment: 'Same-day booking test' },
  { id: 'DS-011', name: 'Weekend trip dates - Fri to Sun', dateType: 'Departure/Return', dateValue: 'Next Friday to Sunday', expectedBehavior: 'Short trip dates selected correctly', isEdgeCase: false, comment: 'Weekend trip selection' },
  { id: 'DS-012', name: 'Extended trip - 30+ days', dateType: 'Departure/Return', dateValue: '+21 days, +52 days', expectedBehavior: 'Long duration trip handled correctly', isEdgeCase: false, comment: 'Extended trip selection' }
];

// Transform to new format
const dateSelectionData = dateSelectionRawData.map(data => ({
  'Test Case ID*': data.id,
  'Area*': 'Date Selection',
  'Test Case Name*': data.name,
  'Test Case Description*': generateDateSelectionDescription(data),
  'Steps To Reproduce*': generateDateSelectionSteps(data),
  'Expected Results*': data.expectedBehavior + '. Calendar component responds appropriately to user interaction.',
  'Execution Result*': 'Not Run',
  'Observed Results (In case of failure)*': '',
  'Test Case Severity*': getDateSelectionSeverity(data),
  'Executed By*': '',
  'Execution Date*': '',
  'Created By*': 'Test Automation Team',
  'Comments': data.comment + (data.isEdgeCase ? ' (Edge Case)' : '')
}));

/**
 * Parse segment information
 */
function parseSegment(segment) {
  if (!segment || segment === 'N/A') return null;
  // Format: "JFK to LAX, +21 days" or "LAX to SEA, +23 days; SEA to JFK, +26 days"
  const parts = segment.split(';').map(s => s.trim());
  return parts.map(part => {
    const match = part.match(/(\w+) to (\w+), ([^;]+)/);
    if (match) {
      return { origin: match[1], destination: match[2], date: match[3] };
    }
    return null;
  }).filter(Boolean);
}

/**
 * Generate multi-city test steps
 */
function generateMultiCitySteps(data) {
  const steps = [];
  const segments = [
    parseSegment(data.segment1),
    parseSegment(data.segment2),
    parseSegment(data.segment3),
    parseSegment(data.segment4)
  ].flat().filter(Boolean);
  
  steps.push('1. Navigate to https://www.google.com/travel/flights');
  steps.push('2. Click on trip type dropdown and select "Multi-city"');
  steps.push('3. Wait for multi-city form to load');
  
  let stepNum = 4;
  segments.forEach((seg, index) => {
    steps.push(`${stepNum}. For segment ${index + 1}: Click origin field and enter "${seg.origin}"`);
    steps.push(`${stepNum + 1}. Select "${getAirportName(seg.origin)}" from autocomplete`);
    steps.push(`${stepNum + 2}. Click destination field and enter "${seg.destination}"`);
    steps.push(`${stepNum + 3}. Select "${getAirportName(seg.destination)}" from autocomplete`);
    steps.push(`${stepNum + 4}. Click date field and select date ${seg.date} from today`);
    
    if (index < segments.length - 1) {
      steps.push(`${stepNum + 5}. Click "Add flight" to add next segment`);
      stepNum += 6;
    } else {
      stepNum += 5;
    }
  });
  
  steps.push(`${stepNum}. Review all segments are correctly entered`);
  steps.push(`${stepNum + 1}. Click Search button`);
  steps.push(`${stepNum + 2}. Wait for multi-city results to load`);
  
  return steps.join('\n');
}

/**
 * Generate multi-city description
 */
function generateMultiCityDescription(data) {
  // Count segments using parseSegment for consistency
  const segments = [data.segment1, data.segment2, data.segment3, data.segment4]
    .map(parseSegment)
    .flat()
    .filter(Boolean);
  const segmentCount = segments.length;
  
  let description = `Test multi-city flight search functionality with ${segmentCount} flight segments.`;
  description += ` Verifies that the system correctly handles complex itineraries with multiple origins and destinations.`;
  
  const prerequisites = `\n\nPre-requisites:\n- Google Flights is accessible\n- Multi-city option is available\n- All airports in the route are serviceable`;
  
  return description + prerequisites;
}

/**
 * Determine severity for multi-city tests
 */
function getMultiCitySeverity(data) {
  // Complex tests (4+ segments or special cases) are Medium, standard multi-city is High
  if (data.segment4 && data.segment4 !== 'N/A') {
    return 'Medium';
  }
  if (data.name.includes('Same-day') || data.name.includes('Maximum') || data.name.includes('Remove')) {
    return 'Medium';
  }
  return 'High';
}

// Sheet 4: Multi-City test scenarios (raw data)
const multiCityRawData = [
  { id: 'MC-001', name: 'US Triangle - 3 segments', segment1: 'JFK to LAX, +21 days', segment2: 'LAX to ORD, +25 days', segment3: 'ORD to JFK, +29 days', segment4: 'N/A', expectedResult: 'Multi-city search returns options for all 3 segments', comment: 'Basic US multi-city triangle' },
  { id: 'MC-002', name: 'European Tour - 4 segments', segment1: 'LHR to CDG, +30 days', segment2: 'CDG to FCO, +34 days', segment3: 'FCO to BCN, +38 days', segment4: 'BCN to LHR, +42 days', expectedResult: 'Full European itinerary with 4 flights displayed', comment: 'European tour itinerary' },
  { id: 'MC-003', name: 'Open jaw international - No return to origin', segment1: 'SFO to NRT, +28 days', segment2: 'HND to SIN, +35 days', segment3: 'SIN to SFO, +42 days', segment4: 'N/A', expectedResult: 'Open jaw trip allowed, ends at different city than start', comment: 'Open jaw routing' },
  { id: 'MC-004', name: 'Transatlantic multi-city', segment1: 'JFK to LHR, +21 days', segment2: 'LHR to CDG, +25 days', segment3: 'CDG to JFK, +30 days', segment4: 'N/A', expectedResult: 'International multi-city with return to origin', comment: 'Transatlantic multi-city' },
  { id: 'MC-005', name: 'Same-day connection segments', segment1: 'LAX to DEN, +21 days', segment2: 'DEN to ORD, +21 days', segment3: 'ORD to JFK, +24 days', segment4: 'N/A', expectedResult: 'Same-day connections handled, may show tight connection warning', comment: 'Same-day segments test' },
  { id: 'MC-006', name: 'Large date gaps between segments', segment1: 'BOS to MIA, +14 days', segment2: 'MIA to DEN, +28 days', segment3: 'DEN to BOS, +42 days', segment4: 'N/A', expectedResult: 'Large gaps between segments allowed for multi-city', comment: 'Large gap multi-city' },
  { id: 'MC-007', name: 'Asia-Pacific tour - 4 segments', segment1: 'LAX to NRT, +30 days', segment2: 'NRT to HKG, +35 days', segment3: 'HKG to SIN, +40 days', segment4: 'SIN to LAX, +45 days', expectedResult: 'Complex Asia-Pacific routing with return to US', comment: 'Asia-Pacific tour' },
  { id: 'MC-008', name: 'Mixed domestic and international', segment1: 'JFK to LAX, +21 days', segment2: 'LAX to NRT, +25 days', segment3: 'NRT to JFK, +35 days', segment4: 'N/A', expectedResult: 'Mixed routing with domestic and international segments', comment: 'Mixed routing test' },
  { id: 'MC-009', name: 'Maximum segments test - 5 segments', segment1: 'JFK to ORD, +14 days', segment2: 'ORD to DEN, +17 days', segment3: 'DEN to LAX, +20 days', segment4: 'LAX to SEA, +23 days; SEA to JFK, +26 days', expectedResult: 'System handles maximum allowed segments', comment: 'Maximum segments boundary' },
  { id: 'MC-010', name: 'Remove and add segment', segment1: 'ATL to DFW, +21 days', segment2: 'DFW to PHX, +24 days', segment3: 'PHX to ATL, +27 days', segment4: 'N/A', expectedResult: 'Can remove middle segment and add new one without data loss', comment: 'Segment modification test' }
];

// Transform to new format
const multiCityData = multiCityRawData.map(data => ({
  'Test Case ID*': data.id,
  'Area*': 'Multi-City Booking',
  'Test Case Name*': data.name,
  'Test Case Description*': generateMultiCityDescription(data),
  'Steps To Reproduce*': generateMultiCitySteps(data),
  'Expected Results*': data.expectedResult + '. All flight segments are searchable and display pricing.',
  'Execution Result*': 'Not Run',
  'Observed Results (In case of failure)*': '',
  'Test Case Severity*': getMultiCitySeverity(data),
  'Executed By*': '',
  'Execution Date*': '',
  'Created By*': 'Test Automation Team',
  'Comments': data.comment
}));

function createWorkbook() {
  const workbook = XLSX.utils.book_new();

  // Define column widths for new format (consistent across sheets)
  const columnWidths = [
    { wch: 14 },  // Test Case ID*
    { wch: 20 },  // Area*
    { wch: 45 },  // Test Case Name*
    { wch: 60 },  // Test Case Description*
    { wch: 70 },  // Steps To Reproduce*
    { wch: 60 },  // Expected Results*
    { wch: 16 },  // Execution Result*
    { wch: 50 },  // Observed Results*
    { wch: 18 },  // Test Case Severity*
    { wch: 15 },  // Executed By*
    { wch: 16 },  // Execution Date*
    { wch: 22 },  // Created By*
    { wch: 40 }   // Comments
  ];

  // Create Sheet 1: Basic Flight Search
  const ws1 = XLSX.utils.json_to_sheet(basicFlightSearchData);
  ws1['!cols'] = columnWidths;
  XLSX.utils.book_append_sheet(workbook, ws1, 'BasicFlightSearch');

  // Create Sheet 2: Filter and Sort
  const ws2 = XLSX.utils.json_to_sheet(filterAndSortData);
  ws2['!cols'] = columnWidths;
  XLSX.utils.book_append_sheet(workbook, ws2, 'FilterAndSort');

  // Create Sheet 3: Date Selection
  const ws3 = XLSX.utils.json_to_sheet(dateSelectionData);
  ws3['!cols'] = columnWidths;
  XLSX.utils.book_append_sheet(workbook, ws3, 'DateSelection');

  // Create Sheet 4: Multi-City
  const ws4 = XLSX.utils.json_to_sheet(multiCityData);
  ws4['!cols'] = columnWidths;
  XLSX.utils.book_append_sheet(workbook, ws4, 'MultiCity');

  return workbook;
}

function main() {
  console.log('Generating test scenarios Excel file...');
  
  const workbook = createWorkbook();
  
  const outputPath = path.join(__dirname, '..', 'test-scenarios', 'flight-test-scenarios.xlsx');
  
  XLSX.writeFile(workbook, outputPath);
  
  console.log(`✅ Excel file created successfully at: ${outputPath}`);
  console.log('\nFile contains the following sheets:');
  console.log('  1. BasicFlightSearch - 12 test scenarios');
  console.log('  2. FilterAndSort - 12 test scenarios');
  console.log('  3. DateSelection - 12 test scenarios');
  console.log('  4. MultiCity - 10 test scenarios');
  console.log('\nTotal: 46 test scenarios');
}

main();
