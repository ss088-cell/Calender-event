function createCalendarEvent() {
  var sheetId = 'YOUR_SHEET_ID_HERE';  // Replace with your Google Sheet ID
  
  Logger.log('Sheet ID: ' + sheetId);
  
  try {
    // Open the spreadsheet by ID
    var spreadsheet = SpreadsheetApp.openById(sheetId);
    Logger.log('Spreadsheet opened successfully: ' + spreadsheet.getName());

    var sheet = spreadsheet.getSheetByName('Sheet1');  // Adjust if your sheet name is different
    if (!sheet) {
      throw new Error('Sheet not found: Sheet1');
    }

    var calendar = CalendarApp.getDefaultCalendar();  // Use default calendar or specify an ID
    Logger.log('Using calendar: ' + calendar.getName());

    // Get data from the sheet
    var range = sheet.getDataRange();
    var values = range.getValues();

    // Loop through each row, skipping the first row (assuming it's headers)
    for (var i = 1; i < values.length; i++) {
      var title = values[i][0];  // Event title from column A
      var date = values[i][1];   // Date from column B
      var startTime = values[i][2];  // Start time from column C
      var endTime = values[i][3];    // End time from column D

      // Log values for debugging
      Logger.log('Row ' + (i + 1) + ': Title: ' + title + ', Date: ' + date + ', Start Time: ' + startTime + ', End Time: ' + endTime);

      // Combine date and time to create Date objects for start and end times
      var startDateTime = new Date(date + " " + startTime);
      var endDateTime = new Date(date + " " + endTime);

      // Log the Date objects to check their values
      Logger.log('Creating event: ' + title + ' from ' + startDateTime.toString() + ' to ' + endDateTime.toString());

      // Create event in Google Calendar
      var event = calendar.createEvent(title, startDateTime, endDateTime);
      Logger.log('Event created: ' + event.getId());
    }
    
    Logger.log('Events created successfully.');
  } catch (e) {
    Logger.log('Error: ' + e.message);
  }
}
