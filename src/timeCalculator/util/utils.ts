export function getNumberOfDaysBetweenDates(startDate: Date | null, endDate: Date | null) {
    if (endDate && startDate) {
        const timeDifference = endDate.getTime() - startDate.getTime();
        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
        const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));
        return daysDifference;
    } else {
        return 0;
    }
  }
  export function getFormatedStringFromDays(numberOfDays:number) {
    if(numberOfDays === 0){
        return "0 day";
    }else{
        var years = Math.floor(numberOfDays / 365);
        var months = Math.floor(numberOfDays % 365 / 30);
        var days = Math.floor(numberOfDays % 365 % 30);

        var yearsDisplay = years > 0 ? years + (years === 1 ? " year, " : " years, ") : "";
        var monthsDisplay = months > 0 ? months + (months === 1 ? " month, " : " months, ") : "";
        var daysDisplay = days > 0 ? days + (days === 1 ? " day" : " days") : "";
        return yearsDisplay + monthsDisplay + daysDisplay; 
    }
}