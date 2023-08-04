export function getNumberOfDaysBetweenDates(startDate: Date, endDate: Date) {

    const timeDifference = endDate.getTime() - startDate.getTime();
  
    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));
    return daysDifference;
  }