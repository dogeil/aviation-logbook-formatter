function shuffleRowsByDate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("OGdata");
  const sheet2 = ss.getSheetByName("modifiedData");
  const range = sheet.getDataRange();
  const range2 = sheet2.getRange("A1:O199");
  const values = range.getValues();

  // Group rows by date
  const groupedValues = {};
  values.forEach(row => {
    const date = row[0]; // Assuming the date is in the first column
    if (!groupedValues[date]) {
      groupedValues[date] = [];
    }
    groupedValues[date].push(row);
  });

  // Shuffle the order of the dates
  const dates = Object.keys(groupedValues);
  console.log(dates.length)
  dates.sort(() => Math.random() - 0.5);

  // Reconstruct the shuffled values array
  const shuffledValues = [];
  dates.forEach(date => {
    shuffledValues.push(...groupedValues[date]);
  });

  // Write the shuffled values back to the sheet
  range2.setValues(shuffledValues);
}
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function generateUniqueRandomDates(startDate, endDate, count) {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error("Both startDate and endDate must be valid Date objects");
  }

  if (count <= 0) {
    throw new Error("Count must be a positive integer");
  }

  if (startDate >= endDate) {
    throw new Error("Start date must be before end date");
  }

  const totalMilliseconds = endDate.getTime() - startDate.getTime();

  if (totalMilliseconds < count) {
    console.warn(`Warning: Requested ${count} dates, but only ${totalMilliseconds} milliseconds available`);
    count = totalMilliseconds;
  }

  const uniqueDates = new Set();

  while (uniqueDates.size < count) {
    const randomMilliseconds = Math.floor(Math.random() * totalMilliseconds);
    const randomDate = new Date(startDate.getTime() + randomMilliseconds);
    uniqueDates.add(randomDate);
  }

  return Array.from(uniqueDates)
    .sort((a, b) => a - b)
    .map(formatDate);
}

function unshuffleDates() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("modifiedData");
  const range = sheet.getDataRange();
  const values = range.getValues();

  let arrayOfDates = [];
  const startDate = new Date('2010-06-02');
  const endDate = new Date('2010-10-05');
  const numDates = 51;
  let dates = generateUniqueRandomDates(startDate, endDate, numDates);
  let date = "";
  let lastDate = "";

  for (row = 0; row < values.length; row++) {
    date = values[row][0].toString();
    arrayOfDates.push([dates[0]]);
    if (date != lastDate) {
      dates.shift();
    }
    lastDate = date;
  };
  return arrayOfDates;
}

function setNewData() {
  arrayer = unshuffleDates()
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("newData");
  sheet.getRange("A1:A199").clearContent(); // Clear existing data
  sheet.getRange("A1:A199").setValues(arrayer);
}
