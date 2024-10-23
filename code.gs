function createCalendarEvent() {
  var sheetId = 'YOUR_SHEET_ID_HERE';  // Replace with your Google Sheet ID
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Sheet1');  // Change 'Sheet1' to your sheet's name if needed
  
  var calendar = CalendarApp.getDefaultCalendar();  // or specify a calendar ID if you want to use a specific calendar
  
  // Get data from the sheet
  var range = sheet.getDataRange();
  var values = range.getValues();
  
  // Loop through each row, skipping the first row (assuming it's headers)
  for (var i = 1; i < values.length; i++) {
    var title = values[i][0];  // Event title from column A
    var date = values[i][1];   // Date from column B
    var startTime = values[i][2];  // Start time from column C
    var endTime = values[i][3];    // End time from column D

    // Combine date and time to create a Date object for start and end times
    var startDateTime = new Date(date + " " + startTime);
    var endDateTime = new Date(date + " " + endTime);

    // Create event in Google Calendar
    calendar.createEvent(title, startDateTime, endDateTime);
  }
  
  Logger.log('Events created successfully.');
}
