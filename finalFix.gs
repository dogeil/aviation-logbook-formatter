function rowsWithYear() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("modifiedData");
  const range = sheet.getDataRange();
  const values = range.getValues();
  let totalTimes = 0;
  const flights = ["SBEG", "SWKO"]; //Example

  for (let i = 0; i < values.length; i++) {
    if (values[i][3].toString().indexOf(flights[0]) !== -1 && values[i][4].toString().indexOf(flights[1]) !== -1 && values[i+1][3].toString().indexOf(flights[1]) !== -1 && values[i+1][4].toString().indexOf(flights[0]) !== -1){
      liftoffRange = sheet.getRange("F" + (i+1));
      landingRange = sheet.getRange("G" + (i+1));
      const liftoffTime = liftoffRange.getValue();
      const landingTime = landingRange.getValue();

      // Convert times to hours and minutes
      const liftoffHours = parseInt(liftoffTime.toString().split(":")[0].slice(-2));
      const liftoffMinutes = parseInt(liftoffTime.toString().split(":")[1]);
      const landingHours = parseInt(landingTime.toString().split(":")[0].slice(-2));
      const landingMinutes = parseInt(landingTime.toString().split(":")[1]);
      const { liftoffTimeAfter, landingTimeAfter } = randomizeTimes(liftoffHours, liftoffMinutes, landingHours, landingMinutes, 18, 21);
      console.log("Randomized lift-off time:", liftoffTimeAfter);
      console.log("Randomized landing time:", landingTimeAfter);
      liftoffRange.setValue(liftoffTimeAfter);
      landingRange.setValue(landingTimeAfter);

      var jValue = sheet.getRange("J" + (i+1)).getValue();
      var kValue = sheet.getRange("K" + (i+1)).getValue();

      sheet.getRange("J" + (i+1)).setValue(kValue);
      sheet.getRange("K" + (i+1)).setValue(jValue);
      totalTimes++;
    }
    else if(values[i][3].toString().indexOf(flights[1]) !== -1 && values[i][4].toString().indexOf(flights[0]) !== -1 && values[i-1][3].toString().indexOf(flights[0]) !== -1 && values[i-1][4].toString().indexOf(flights[1]) !== -1) { // Column A is index 0
      liftoffRange = sheet.getRange("F" + (i+1));
      landingRange = sheet.getRange("G" + (i+1));
      const liftoffTime = liftoffRange.getValue();
      const landingTime = landingRange.getValue();

      // Convert times to hours and minutes
      const liftoffHours = parseInt(liftoffTime.toString().split(":")[0].slice(-2));
      const liftoffMinutes = parseInt(liftoffTime.toString().split(":")[1]);
      const landingHours = parseInt(landingTime.toString().split(":")[0].slice(-2));
      const landingMinutes = parseInt(landingTime.toString().split(":")[1]);
      const { liftoffTimeAfter, landingTimeAfter } = randomizeTimes(liftoffHours, liftoffMinutes, landingHours, landingMinutes, 21, 24);
      liftoffRange.setValue(liftoffTimeAfter);
      landingRange.setValue(landingTimeAfter);

      var jValue = sheet.getRange("J" + (i+1)).getValue();
      const jHours = parseInt(jValue.toString().split(":")[0].slice(-2));
      const jMinutes = parseInt(jValue.toString().split(":")[1]);
      if(jHours == 0 && jMinutes == 0)

      var kValue = sheet.getRange("K" + (i+1)).getValue();

      sheet.getRange("J" + (i+1)).setValue(kValue);
      sheet.getRange("K" + (i+1)).setValue(jValue);
      totalTimes++;
    }
    if(totalTimes > 64) { break }
  }
}

function ifrDeleter() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("modifiedData");
  const range = sheet.getDataRange();
  const values = range.getValues();
  let totalTimes = 0;

  for (let i = 0; i < values.length; i++) {
    ifrRange = sheet.getRange("L" + (i+1));
    landingRange = sheet.getRange("N" + (i+1));
    const ifrTime = ifrRange.getValue();
    const landingTime = landingRange.getValue();

    // Convert times to hours and minutes
    const ifrHours = parseInt(ifrTime.toString().split(":")[0].slice(-2));
    const ifrMinutes = parseInt(ifrTime.toString().split(":")[1]);
    const landingHours = parseInt(landingTime.toString().split(":")[0].slice(-2));
    const landingMinutes = parseInt(landingTime.toString().split(":")[1]);
    if(ifrHours == landingHours && ifrMinutes == landingMinutes) {
      // Generate a random number between 40 and 50
      let randomMinutes = Math.floor(Math.random() * 11) + 40;

      // Format the time as HH:MM
      let ifrTimeAfter = `00:${randomMinutes.toString().padStart(2, '0')}`;

      // Set the value
      ifrRange.setValue(ifrTimeAfter);
      console.log(i+1)
    }
    else {
      continue
    }
    totalTimes++;
    if(totalTimes > 0) 
    {
      break
    }
  }
}

function fixRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  const range = sheet.getDataRange();
  const values = range.getValues();
  for (let i = 0; i < values.length; i++) {
    console.log(i+1)
    liftoffRange = sheet.getRange("F" + (i+1));
    const liftoffTime = liftoffRange.getValue();
    const liftoffHours = parseInt(liftoffTime.toString().split(":")[0].slice(-2));
    const liftoffMinutes = parseInt(liftoffTime.toString().split(":")[1]);

    totalRange = sheet.getRange("N" + (i+1));
    const totalTime = totalRange.getValue();
    const totalHours = parseInt(totalTime.toString().split(":")[0].slice(-2));
    const totalMinutes = parseInt(totalTime.toString().split(":")[1]);

    const newLanding = sumHoursAndMinutes(liftoffHours, liftoffMinutes, totalHours, totalMinutes)
    console.log("LIFTOFF: "+liftoffHours+":"+liftoffMinutes+" TIME: "+totalHours+":"+totalMinutes+" SUM: "+ newLanding.hours.toString().padStart(2, '0') + ':' + newLanding.minutes.toString().padStart(2, '0'))

    landingRange = sheet.getRange("G" + (i+1));
    landingRange.setValue(newLanding.hours.toString().padStart(2, '0') + ':' + newLanding.minutes.toString().padStart(2, '0'));
  }
}

function sumHoursAndMinutes(hours1, minutes1, hours2, minutes2) {
  // Calculate the total minutes
  const totalMinutes = hours1 * 60 + minutes1 + hours2 * 60 + minutes2;

  // Calculate the hours and minutes from the total minutes
  let hours = Math.floor(totalMinutes / 60);
  if (hours >= 24){ hours = hours-24 }
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

function randomizeTimes(liftOffHours, liftOffMinutes, landingHours, landingMinutes, min, max) {
  // Calculate the time difference in hours
  const timeDifference = landingHours - liftOffHours;

  // Generate a random lift-off hour between 6 PM and midnight (18:00 - 23:59)
  const randomLiftOffHour = Math.floor(Math.random() * 6) + min;

  // Calculate the landing hour by adding the time difference
  let randomLandingHour = randomLiftOffHour + timeDifference;

  // Ensure landing hour is before midnight (24:00)
  if (randomLandingHour >= max) {
    randomLandingHour -= max;
  }

  // Format the times with leading zeros if needed
  const formattedLiftOffTime = `${randomLiftOffHour.toString().padStart(2, '0')}:${liftOffMinutes.toString().padStart(2, '0')}`;
  const formattedLandingTime = `${randomLandingHour.toString().padStart(2, '0')}:${landingMinutes.toString().padStart(2, '0')}`;

  return {
    liftoffTimeAfter: formattedLiftOffTime,
    landingTimeAfter: formattedLandingTime
  };
}
