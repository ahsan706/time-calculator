import { useState } from "react";
import { Period } from "@time-calculator/common";
import Flatpickr from "react-flatpickr";
import { getFormattedStringFromDays } from "@time-calculator/common";

function PeriodCalculator({
  updatePeriod,
  deletePeriod,
  periodInfo,
}: {
  updatePeriod: (updatePeriodValue: Period) => void;
  deletePeriod: () => void;
  periodInfo: Period;
}) {
  const [periodInformation, setPeriodInformation] =
    useState<Period>(periodInfo);

  const handleValueChange = (dates: Date[]) => {
    if (dates.length === 2) {
      const newPeriod = new Period({
        ...periodInformation,
        startDate: dates[0],
        endDate: dates[1],
      });
      setPeriodInformation(newPeriod);
      updatePeriod(newPeriod);
    }
  };

  return (
    <div className="card bg-base-100 card-bordered shadow-xl w-full sm:w-1/2 md:w-1/3 p-2 flex flex-col gap-4">
      <div>Period</div>
      <Flatpickr
        className="input input-bordered w-full"
        options={{
          mode: "range",
          maxDate: new Date(),
          dateFormat: "Y-m-d",
        }}
        value={
          [periodInformation.startDate, periodInformation.endDate].filter(
            Boolean
          ) as Date[]
        }
        onChange={handleValueChange}
      />
      <div>
        Your time here has been{" "}
        {getFormattedStringFromDays(periodInformation.days)}
      </div>
      <button onClick={() => deletePeriod()} className="btn btn-error">
        Remove Period
      </button>
    </div>
  );
}

export default PeriodCalculator;
