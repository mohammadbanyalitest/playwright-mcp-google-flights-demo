import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate test scenarios Excel file for Google Flights testing
 */

// Sheet 1: Basic Flight Search test scenarios
const basicFlightSearchData = [
  {
    'Test ID': 'BFS-001',
    'Test Name': 'Round-trip domestic flight - Solo traveler',
    'Trip Type': 'Round-trip',
    'Origin': 'JFK',
    'Destination': 'LAX',
    'Departure Date': '+21 days',
    'Return Date': '+28 days',
    'Adults': 1,
    'Children': 0,
    'Infants': 0,
    'Cabin Class': 'Economy',
    'Expected Result': 'Search results displayed with multiple flight options',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-002',
    'Test Name': 'Round-trip international flight - Couple',
    'Trip Type': 'Round-trip',
    'Origin': 'LHR',
    'Destination': 'JFK',
    'Departure Date': '+30 days',
    'Return Date': '+37 days',
    'Adults': 2,
    'Children': 0,
    'Infants': 0,
    'Cabin Class': 'Economy',
    'Expected Result': 'Transatlantic flight options displayed with prices for 2 passengers',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-003',
    'Test Name': 'One-way domestic short-haul flight',
    'Trip Type': 'One-way',
    'Origin': 'SFO',
    'Destination': 'SEA',
    'Departure Date': '+14 days',
    'Return Date': 'N/A',
    'Adults': 1,
    'Children': 0,
    'Infants': 0,
    'Cabin Class': 'Economy',
    'Expected Result': 'One-way flight results displayed, no return date shown',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-004',
    'Test Name': 'Round-trip long-haul flight - Family',
    'Trip Type': 'Round-trip',
    'Origin': 'SYD',
    'Destination': 'LAX',
    'Departure Date': '+45 days',
    'Return Date': '+60 days',
    'Adults': 2,
    'Children': 2,
    'Infants': 0,
    'Cabin Class': 'Economy',
    'Expected Result': 'Long-haul flight options with pricing for 4 passengers',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-005',
    'Test Name': 'One-way international flight - Business class',
    'Trip Type': 'One-way',
    'Origin': 'JFK',
    'Destination': 'CDG',
    'Departure Date': '+21 days',
    'Return Date': 'N/A',
    'Adults': 1,
    'Children': 0,
    'Infants': 0,
    'Cabin Class': 'Business',
    'Expected Result': 'Business class flight options displayed with premium pricing',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-006',
    'Test Name': 'Round-trip domestic - Family with infant',
    'Trip Type': 'Round-trip',
    'Origin': 'ORD',
    'Destination': 'MIA',
    'Departure Date': '+28 days',
    'Return Date': '+35 days',
    'Adults': 2,
    'Children': 1,
    'Infants': 1,
    'Cabin Class': 'Economy',
    'Expected Result': 'Flight options for family with infant, lap infant handling verified',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-007',
    'Test Name': 'Round-trip international - First class',
    'Trip Type': 'Round-trip',
    'Origin': 'LAX',
    'Destination': 'NRT',
    'Departure Date': '+60 days',
    'Return Date': '+74 days',
    'Adults': 2,
    'Children': 0,
    'Infants': 0,
    'Cabin Class': 'First',
    'Expected Result': 'First class options displayed for transpacific route',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-008',
    'Test Name': 'One-way domestic - Group travel',
    'Trip Type': 'One-way',
    'Origin': 'DEN',
    'Destination': 'LAS',
    'Departure Date': '+35 days',
    'Return Date': 'N/A',
    'Adults': 4,
    'Children': 0,
    'Infants': 0,
    'Cabin Class': 'Economy',
    'Expected Result': 'Flight options for group of 4 adults displayed',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-009',
    'Test Name': 'Round-trip short domestic - Premium Economy',
    'Trip Type': 'Round-trip',
    'Origin': 'BOS',
    'Destination': 'DCA',
    'Departure Date': '+10 days',
    'Return Date': '+12 days',
    'Adults': 1,
    'Children': 0,
    'Infants': 0,
    'Cabin Class': 'Premium Economy',
    'Expected Result': 'Premium economy options for short domestic route',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-010',
    'Test Name': 'Round-trip Europe to Asia - Mixed cabin',
    'Trip Type': 'Round-trip',
    'Origin': 'FRA',
    'Destination': 'HKG',
    'Departure Date': '+42 days',
    'Return Date': '+56 days',
    'Adults': 2,
    'Children': 1,
    'Infants': 0,
    'Cabin Class': 'Business',
    'Expected Result': 'Business class options for Europe-Asia route with 3 passengers',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-011',
    'Test Name': 'One-way transatlantic - Large family',
    'Trip Type': 'One-way',
    'Origin': 'DUB',
    'Destination': 'BOS',
    'Departure Date': '+50 days',
    'Return Date': 'N/A',
    'Adults': 2,
    'Children': 3,
    'Infants': 0,
    'Cabin Class': 'Economy',
    'Expected Result': 'Flight options for 5 passengers on transatlantic route',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'BFS-012',
    'Test Name': 'Round-trip weekend getaway',
    'Trip Type': 'Round-trip',
    'Origin': 'ATL',
    'Destination': 'MCO',
    'Departure Date': '+7 days',
    'Return Date': '+9 days',
    'Adults': 2,
    'Children': 2,
    'Infants': 0,
    'Cabin Class': 'Economy',
    'Expected Result': 'Short trip options for family weekend travel',
    'Status': 'Not Run'
  }
];

// Sheet 2: Filter and Sort test scenarios
const filterAndSortData = [
  {
    'Test ID': 'FS-001',
    'Test Name': 'Filter nonstop flights only',
    'Search Route': 'JFK to LAX',
    'Filter Type': 'Stops',
    'Filter Value': 'Nonstop',
    'Sort By': 'Best',
    'Expected Behavior': 'Only nonstop flights displayed, all results show 0 stops',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-002',
    'Test Name': 'Filter by 1 stop flights',
    'Search Route': 'JFK to LAX',
    'Filter Type': 'Stops',
    'Filter Value': '1 stop',
    'Sort By': 'Best',
    'Expected Behavior': 'Only flights with exactly 1 stop displayed',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-003',
    'Test Name': 'Filter by price range - Budget',
    'Search Route': 'SFO to SEA',
    'Filter Type': 'Price',
    'Filter Value': 'Under $200',
    'Sort By': 'Price',
    'Expected Behavior': 'All displayed flights priced under $200',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-004',
    'Test Name': 'Filter by single airline',
    'Search Route': 'ORD to DFW',
    'Filter Type': 'Airline',
    'Filter Value': 'United Airlines',
    'Sort By': 'Best',
    'Expected Behavior': 'Only United Airlines flights displayed',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-005',
    'Test Name': 'Filter by multiple airlines',
    'Search Route': 'JFK to LAX',
    'Filter Type': 'Airline',
    'Filter Value': 'Delta, American',
    'Sort By': 'Best',
    'Expected Behavior': 'Only Delta and American Airlines flights displayed',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-006',
    'Test Name': 'Filter by morning departure time',
    'Search Route': 'BOS to MIA',
    'Filter Type': 'Time',
    'Filter Value': 'Departure before 12 PM',
    'Sort By': 'Duration',
    'Expected Behavior': 'All flights depart before noon',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-007',
    'Test Name': 'Filter by evening arrival time',
    'Search Route': 'LAX to JFK',
    'Filter Type': 'Time',
    'Filter Value': 'Arrival 6 PM - midnight',
    'Sort By': 'Best',
    'Expected Behavior': 'All flights arrive in the evening hours',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-008',
    'Test Name': 'Filter by maximum duration',
    'Search Route': 'JFK to LAX',
    'Filter Type': 'Duration',
    'Filter Value': 'Under 6 hours',
    'Sort By': 'Duration',
    'Expected Behavior': 'All flights have total duration under 6 hours',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-009',
    'Test Name': 'Sort by cheapest price',
    'Search Route': 'DEN to LAS',
    'Filter Type': 'None',
    'Filter Value': 'N/A',
    'Sort By': 'Price',
    'Expected Behavior': 'Flights sorted from lowest to highest price',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-010',
    'Test Name': 'Sort by fastest duration',
    'Search Route': 'ATL to MCO',
    'Filter Type': 'None',
    'Filter Value': 'N/A',
    'Sort By': 'Duration',
    'Expected Behavior': 'Shortest flights appear first, duration ascending',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-011',
    'Test Name': 'Combined filters - Nonstop + Price',
    'Search Route': 'JFK to LAX',
    'Filter Type': 'Stops + Price',
    'Filter Value': 'Nonstop, Under $400',
    'Sort By': 'Best',
    'Expected Behavior': 'Only nonstop flights under $400 displayed',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'FS-012',
    'Test Name': 'Combined filters - Airline + Time + Stops',
    'Search Route': 'ORD to LAX',
    'Filter Type': 'Airline + Time + Stops',
    'Filter Value': 'United, Morning departure, Nonstop',
    'Sort By': 'Price',
    'Expected Behavior': 'United nonstop morning flights only',
    'Status': 'Not Run'
  }
];

// Sheet 3: Date Selection test scenarios
const dateSelectionData = [
  {
    'Test ID': 'DS-001',
    'Test Name': 'Standard departure date selection - 3 weeks out',
    'Date Type': 'Departure',
    'Date Value': '+21 days',
    'Expected Behavior': 'Date is selectable, calendar highlights selection',
    'Edge Case': 'No',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-002',
    'Test Name': 'Standard return date selection - 1 week after departure',
    'Date Type': 'Return',
    'Date Value': '+28 days',
    'Expected Behavior': 'Return date selected, range highlighted in calendar',
    'Edge Case': 'No',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-003',
    'Test Name': 'One-way date selection',
    'Date Type': 'One-way',
    'Date Value': '+14 days',
    'Expected Behavior': 'Single date selected, no return date field shown',
    'Edge Case': 'No',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-004',
    'Test Name': 'Same-day departure and return',
    'Date Type': 'Departure/Return',
    'Date Value': '+7 days (same day)',
    'Expected Behavior': 'May allow or show warning about same-day return',
    'Edge Case': 'Yes',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-005',
    'Test Name': 'Past date selection attempt',
    'Date Type': 'Departure',
    'Date Value': '-1 day',
    'Expected Behavior': 'Date should be disabled/grayed out, not selectable',
    'Edge Case': 'Yes',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-006',
    'Test Name': 'Far future date - 11 months out',
    'Date Type': 'Departure',
    'Date Value': '+330 days',
    'Expected Behavior': 'Date may be selectable with limited availability warning',
    'Edge Case': 'Yes',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-007',
    'Test Name': 'Return date before departure attempt',
    'Date Type': 'Return',
    'Date Value': 'Before departure',
    'Expected Behavior': 'Error message or auto-correction of dates',
    'Edge Case': 'Yes',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-008',
    'Test Name': 'Calendar month navigation - Forward',
    'Date Type': 'Departure',
    'Date Value': '+60 days',
    'Expected Behavior': 'Calendar navigates to correct month, dates selectable',
    'Edge Case': 'No',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-009',
    'Test Name': 'Calendar month navigation - Year boundary',
    'Date Type': 'Departure',
    'Date Value': 'Dec 31 to Jan 1',
    'Expected Behavior': 'Year increments correctly when crossing year boundary',
    'Edge Case': 'Yes',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-010',
    'Test Name': 'Today\'s date selection',
    'Date Type': 'Departure',
    'Date Value': 'Today',
    'Expected Behavior': 'May be selectable for last-minute flights or disabled',
    'Edge Case': 'Yes',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-011',
    'Test Name': 'Weekend trip dates - Fri to Sun',
    'Date Type': 'Departure/Return',
    'Date Value': 'Next Friday to Sunday',
    'Expected Behavior': 'Short trip dates selected correctly',
    'Edge Case': 'No',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'DS-012',
    'Test Name': 'Extended trip - 30+ days',
    'Date Type': 'Departure/Return',
    'Date Value': '+21 days, +52 days',
    'Expected Behavior': 'Long duration trip handled correctly',
    'Edge Case': 'No',
    'Status': 'Not Run'
  }
];

// Sheet 4: Multi-City test scenarios
const multiCityData = [
  {
    'Test ID': 'MC-001',
    'Test Name': 'US Triangle - 3 segments',
    'Segment 1': 'JFK to LAX, +21 days',
    'Segment 2': 'LAX to ORD, +25 days',
    'Segment 3': 'ORD to JFK, +29 days',
    'Segment 4': 'N/A',
    'Expected Result': 'Multi-city search returns options for all 3 segments',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-002',
    'Test Name': 'European Tour - 4 segments',
    'Segment 1': 'LHR to CDG, +30 days',
    'Segment 2': 'CDG to FCO, +34 days',
    'Segment 3': 'FCO to BCN, +38 days',
    'Segment 4': 'BCN to LHR, +42 days',
    'Expected Result': 'Full European itinerary with 4 flights displayed',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-003',
    'Test Name': 'Open jaw international - No return to origin',
    'Segment 1': 'SFO to NRT, +28 days',
    'Segment 2': 'HND to SIN, +35 days',
    'Segment 3': 'SIN to SFO, +42 days',
    'Segment 4': 'N/A',
    'Expected Result': 'Open jaw trip allowed, ends at different city than start',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-004',
    'Test Name': 'Transatlantic multi-city',
    'Segment 1': 'JFK to LHR, +21 days',
    'Segment 2': 'LHR to CDG, +25 days',
    'Segment 3': 'CDG to JFK, +30 days',
    'Segment 4': 'N/A',
    'Expected Result': 'International multi-city with return to origin',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-005',
    'Test Name': 'Same-day connection segments',
    'Segment 1': 'LAX to DEN, +21 days',
    'Segment 2': 'DEN to ORD, +21 days',
    'Segment 3': 'ORD to JFK, +24 days',
    'Segment 4': 'N/A',
    'Expected Result': 'Same-day connections handled, may show tight connection warning',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-006',
    'Test Name': 'Large date gaps between segments',
    'Segment 1': 'BOS to MIA, +14 days',
    'Segment 2': 'MIA to DEN, +28 days',
    'Segment 3': 'DEN to BOS, +42 days',
    'Segment 4': 'N/A',
    'Expected Result': 'Large gaps between segments allowed for multi-city',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-007',
    'Test Name': 'Asia-Pacific tour - 4 segments',
    'Segment 1': 'LAX to NRT, +30 days',
    'Segment 2': 'NRT to HKG, +35 days',
    'Segment 3': 'HKG to SIN, +40 days',
    'Segment 4': 'SIN to LAX, +45 days',
    'Expected Result': 'Complex Asia-Pacific routing with return to US',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-008',
    'Test Name': 'Mixed domestic and international',
    'Segment 1': 'JFK to LAX, +21 days',
    'Segment 2': 'LAX to NRT, +25 days',
    'Segment 3': 'NRT to JFK, +35 days',
    'Segment 4': 'N/A',
    'Expected Result': 'Mixed routing with domestic and international segments',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-009',
    'Test Name': 'Maximum segments test - 5 segments',
    'Segment 1': 'JFK to ORD, +14 days',
    'Segment 2': 'ORD to DEN, +17 days',
    'Segment 3': 'DEN to LAX, +20 days',
    'Segment 4': 'LAX to SEA, +23 days; SEA to JFK, +26 days',
    'Expected Result': 'System handles maximum allowed segments',
    'Status': 'Not Run'
  },
  {
    'Test ID': 'MC-010',
    'Test Name': 'Remove and add segment',
    'Segment 1': 'ATL to DFW, +21 days',
    'Segment 2': 'DFW to PHX, +24 days',
    'Segment 3': 'PHX to ATL, +27 days',
    'Segment 4': 'N/A',
    'Expected Result': 'Can remove middle segment and add new one without data loss',
    'Status': 'Not Run'
  }
];

function createWorkbook() {
  const workbook = XLSX.utils.book_new();

  // Create Sheet 1: Basic Flight Search
  const ws1 = XLSX.utils.json_to_sheet(basicFlightSearchData);
  // Set column widths for better readability
  ws1['!cols'] = [
    { wch: 10 },  // Test ID
    { wch: 45 },  // Test Name
    { wch: 12 },  // Trip Type
    { wch: 8 },   // Origin
    { wch: 12 },  // Destination
    { wch: 15 },  // Departure Date
    { wch: 12 },  // Return Date
    { wch: 8 },   // Adults
    { wch: 10 },  // Children
    { wch: 8 },   // Infants
    { wch: 18 },  // Cabin Class
    { wch: 55 },  // Expected Result
    { wch: 10 }   // Status
  ];
  XLSX.utils.book_append_sheet(workbook, ws1, 'BasicFlightSearch');

  // Create Sheet 2: Filter and Sort
  const ws2 = XLSX.utils.json_to_sheet(filterAndSortData);
  ws2['!cols'] = [
    { wch: 10 },  // Test ID
    { wch: 45 },  // Test Name
    { wch: 15 },  // Search Route
    { wch: 20 },  // Filter Type
    { wch: 25 },  // Filter Value
    { wch: 12 },  // Sort By
    { wch: 55 },  // Expected Behavior
    { wch: 10 }   // Status
  ];
  XLSX.utils.book_append_sheet(workbook, ws2, 'FilterAndSort');

  // Create Sheet 3: Date Selection
  const ws3 = XLSX.utils.json_to_sheet(dateSelectionData);
  ws3['!cols'] = [
    { wch: 10 },  // Test ID
    { wch: 45 },  // Test Name
    { wch: 18 },  // Date Type
    { wch: 25 },  // Date Value
    { wch: 55 },  // Expected Behavior
    { wch: 12 },  // Edge Case
    { wch: 10 }   // Status
  ];
  XLSX.utils.book_append_sheet(workbook, ws3, 'DateSelection');

  // Create Sheet 4: Multi-City
  const ws4 = XLSX.utils.json_to_sheet(multiCityData);
  ws4['!cols'] = [
    { wch: 10 },  // Test ID
    { wch: 40 },  // Test Name
    { wch: 25 },  // Segment 1
    { wch: 25 },  // Segment 2
    { wch: 25 },  // Segment 3
    { wch: 40 },  // Segment 4
    { wch: 55 },  // Expected Result
    { wch: 10 }   // Status
  ];
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
