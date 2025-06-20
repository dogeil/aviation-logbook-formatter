function switchToSheetByName(nameGet) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(nameGet);
  ss.setActiveSheet(sheet);
}
function duplicateBaseAndRenameSheet(newName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("format");
  var newSheet = sheet.copyTo(ss);  // Create a copy of the sheet within the same spreadsheet

  // Rename the new sheet
  newSheet.setName(newName);  // Replace "New Sheet Name" with your desired name
}
function pasteStuffIntoBase() {
  var currentIndex = 1;
  switchToSheetByName("format");
  var sheet = SpreadsheetApp.getActiveSheet();
  var amountForwarded = sheet.getRange("H28:N28").getValues();
  
  for (let amountOfSheets = 1; currentIndex < 1129; amountOfSheets++) {
    duplicateBaseAndRenameSheet(amountOfSheets);
    switchToSheetByName("data");
    sheet = SpreadsheetApp.getActiveSheet();
    
    var getData = sheet.getRange(`${currentIndex}:${(currentIndex+23)}`).getValues();
    switchToSheetByName(amountOfSheets)
    sheet = SpreadsheetApp.getActiveSheet();

    var targetRange = sheet.getRange("A3:Q26");
    targetRange.setValues(getData);

    var amountRange = sheet.getRange("H28:N28");
    amountRange.setValues(amountForwarded);

    amountForwarded = sheet.getRange("H29:N29").getValues();
    currentIndex += 24;
  }
}
function deleteNumericSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();

  for (var i = sheets.length - 1; i >= 0; i--) {
    var sheetName = sheets[i].getName();
    if (isNumeric(sheetName)) {
      ss.deleteSheet(sheets[i]);
    }
  }
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
