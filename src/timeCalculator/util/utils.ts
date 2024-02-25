import { Period } from "../calculator/Period";

export function getNumberOfDaysBetweenDates(
  inDate: Date | null,
  outDate: Date | null
) {
  if (inDate && outDate) {
    const timeDifference = outDate.getTime() - inDate.getTime();
    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));
    return daysDifference;
  } else {
    return 0;
  }
}
export function getFormatedStringFromDays(numberOfDays: number) {
  if (numberOfDays === 0) {
    return "0 day";
  } else {
    const absDays = Math.abs(numberOfDays);
    const years = Math.floor(absDays / 365);
    const months = Math.floor((absDays % 365) / 30);
    const days = Math.floor((absDays % 365) % 30);

    const yearsDisplay =
      years > 0 ? years + (years === 1 ? " year, " : " years, ") : "";
    const monthsDisplay =
      months > 0 ? months + (months === 1 ? " month, " : " months, ") : "";
    const daysDisplay = days > 0 ? days + (days === 1 ? " day" : " days") : "";
    return (
      (Math.sign(numberOfDays) === -1 ? "- " : "") +
      yearsDisplay +
      monthsDisplay +
      daysDisplay
    );
  }
}
export function totalDaysFromPeriodList(periodList: Period[]) {
  let totalDays = 0;
  let inCountry = true;
  for (let i = 0; i < periodList.length; i++) {
    if (inCountry) {
      totalDays += getNumberOfDaysBetweenDates(
        periodList[i].inDate,
        periodList[i].outDate
      );
      inCountry = false;
    } else {
      inCountry = true;
    }
  }
  return totalDays;
}
