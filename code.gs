function createCalendarEvent() {
  var sheetId = '1dxSfhalF21UETn3Hz0HghU-ogMH3duooLRbxmqz8Scg';  // Replace with your Google Sheet ID
  
  Logger.log('Sheet ID: ' + sheetId);
  
  try {
    // Open the spreadsheet by ID
    var spreadsheet = SpreadsheetApp.openById(sheetId);
    Logger.log('Spreadsheet opened successfully: ' + spreadsheet.getName());

    var sheet = spreadsheet.getSheetByName('event');  // Adjust if your sheet name is different
    if (!sheet) {
      throw new Error('Sheet not found: event');
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
      var startTime = values[i][2];  // Start time from column C (as Date)
      var endTime = values[i][3];    // End time from column D (as Date)

      // Log the data for debugging
      Logger.log('Row ' + (i + 1) + ': ' + JSON.stringify(values[i]));

      // Check if start or end time is missing
      if (!startTime || !endTime) {
        Logger.log('Start time or end time is missing for row ' + (i + 1));
        continue;  // Skip this row
      }

      // If startTime and endTime are Date objects, extract hours and minutes
      var startHours = startTime.getHours();
      var startMinutes = startTime.getMinutes();
      var endHours = endTime.getHours();
      var endMinutes = endTime.getMinutes();

      // Parse the date and set the hours and minutes
      var startDateTime = new Date(date);
      startDateTime.setHours(startHours, startMinutes);
      
      var endDateTime = new Date(date);
      endDateTime.setHours(endHours, endMinutes);

      // Adjust endDateTime to the next day if endTime is earlier than startTime
      if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
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

