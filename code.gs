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

      // Log the data for debugging
      Logger.log('Row ' + (i + 1) + ': ' + JSON.stringify(values[i]));

      // Check if start or end time is missing
      if (!startTime || !endTime) {
        Logger.log('Start time or end time is missing for row ' + (i + 1));
        continue;  // Skip this row
      }

      // Convert date string to a Date object
      var eventDate = new Date(date);
      
      // Split startTime and endTime (assuming HH:mm format)
      var startHourMinute = startTime.split(':');
      var endHourMinute = endTime.split(':');

      // Create Date objects for the start and end times
      var startDateTime = new Date(eventDate);
      startDateTime.setHours(parseInt(startHourMinute[0]), parseInt(startHourMinute[1]));

      var endDateTime = new Date(eventDate);
      endDateTime.setHours(parseInt(endHourMinute[0]), parseInt(endHourMinute[1]));

      // If end time is earlier than start time, assume it's on the next day
      if (endDateTime <= startDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1);
      }

      // Log the Date objects for debugging
      Logger.log('Creating event: ' + title + ' from ' + startDateTime.toString() + ' to ' + endDateTime.toString());

      // Create the event in the Google Calendar
      var event = calendar.createEvent(title, startDateTime, endDateTime);
      Logger.log('Event created: ' + event.getId());
    }
    
    Logger.log('Events created successfully.');
  } catch (e) {
    Logger.log('Error: ' + e.message);
  }
}
