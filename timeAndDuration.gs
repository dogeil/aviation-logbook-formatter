function convertMinutesTo24HourFormat(minutes) {
  // Calculate hours and minutes
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Format the time string
  const formattedTime = `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;

  return formattedTime;
}

function calculateFlightDuration() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();

  for (let i = 1087; i <= lastRow; i++) {
    const liftoffTime = sheet.getRange("F" + i).getValue();
    const landingTime = sheet.getRange("G" + i).getValue();

    // Convert times to hours and minutes
    const liftoffHours = parseInt(liftoffTime.toString().split(":")[0].slice(-2));
    const liftoffMinutes = parseInt(liftoffTime.toString().split(":")[1]);
    const landingHours = parseInt(landingTime.toString().split(":")[0].slice(-2));
    const landingMinutes = parseInt(landingTime.toString().split(":")[1]);

    // Add 2 hours and subtract 6 minutes
    var adjustedLiftoffHours = liftoffHours + 2;
    var adjustedLiftoffMinutes = liftoffMinutes - 6;
    var adjustedLandingHours = landingHours + 2;
    var adjustedLandingMinutes = landingMinutes - 6;

    // Adjust minutes and hours if necessary
    if (adjustedLiftoffMinutes < 0) {
      adjustedLiftoffHours--;
      adjustedLiftoffMinutes += 60;
    }
    if (adjustedLandingMinutes < 0) {
      adjustedLandingHours--;
      adjustedLandingMinutes += 60;
    }

    // Format the adjusted times
    const adjustedLiftoffTime = `${adjustedLiftoffHours.toString().padStart(2, '0')}:${adjustedLiftoffMinutes.toString().padStart(2, '0')}`;
    const adjustedLandingTime = `${adjustedLandingHours.toString().padStart(2, '0')}:${adjustedLandingMinutes.toString().padStart(2, '0')}`;

    const trueLiftOffMinutes = adjustedLiftoffHours * 60 + adjustedLiftoffMinutes;
    const trueLandingMinutes = adjustedLandingHours * 60 + adjustedLandingMinutes;

    if(trueLiftOffMinutes >= 1080 && trueLandingMinutes >= 1080) {
      sheet.getRange("K" + i).setValue(convertMinutesTo24HourFormat(trueLandingMinutes - trueLiftOffMinutes));
      sheet.getRange("J" + i).setValue("00:00");
    }
    else if(!(trueLiftOffMinutes >= 1080) && trueLiftOffMinutes >= 360 && trueLandingMinutes >= 1080) {
      sheet.getRange("K" + i).setValue(convertMinutesTo24HourFormat(trueLandingMinutes - 1080));
      sheet.getRange("J" + i).setValue(convertMinutesTo24HourFormat(1080 - trueLiftOffMinutes));
    }
    else if(trueLiftOffMinutes <= 360 && trueLandingMinutes <= 360) {
      sheet.getRange("K" + i).setValue(convertMinutesTo24HourFormat(trueLandingMinutes - trueLiftOffMinutes));
      sheet.getRange("J" + i).setValue("00:00");
    }
    else if(!(trueLiftOffMinutes >= 1080) && trueLiftOffMinutes <= 360 && trueLandingMinutes >= 360) {
      sheet.getRange("K" + i).setValue(convertMinutesTo24HourFormat(360 - trueLiftOffMinutes));
      sheet.getRange("J" + i).setValue(convertMinutesTo24HourFormat(trueLandingMinutes - 360));
    }
    else if(trueLiftOffMinutes >= 1080 && trueLandingMinutes <= 360) {
      sheet.getRange("K" + i).setValue(convertMinutesTo24HourFormat((1440 - trueLandingMinutes) + trueLiftOffMinutes));
      sheet.getRange("J" + i).setValue("00:00");
    }
    else {
      sheet.getRange("K" + i).setValue("00:00");
      sheet.getRange("J" + i).setValue(convertMinutesTo24HourFormat(trueLandingMinutes - trueLiftOffMinutes));
    }
  }
}
