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
        const absDays = Math.abs(numberOfDays);
        const years = Math.floor(absDays / 365);
        const months = Math.floor(absDays % 365 / 30);
        const days = Math.floor(absDays % 365 % 30);

        const yearsDisplay = years > 0 ? years + (years === 1 ? " year, " : " years, ") : "";
        const monthsDisplay = months > 0 ? months + (months === 1 ? " month, " : " months, ") : "";
        const daysDisplay = days > 0 ? days + (days === 1 ? " day" : " days") : "";
        return (Math.sign(numberOfDays) === -1 ? "- " : "") +yearsDisplay + monthsDisplay + daysDisplay; 
    }
}