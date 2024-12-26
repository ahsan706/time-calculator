import { useState } from "react";
import { Period } from "@time-calculator/common";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
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

  const handleValueChange = (newValue: DateValueType) => {
    if (newValue?.startDate && newValue?.endDate) {
      const newPeriod = new Period({
        ...periodInformation,
        startDate: new Date(newValue?.startDate),
        endDate: new Date(newValue?.endDate),
      });
      setPeriodInformation(newPeriod);
      updatePeriod(newPeriod);
    }
  };

  return (
    <div className="card bg-base-100 card-bordered shadow-xl w-full sm:w-1/2 md:w-1/3 p-2 flex flex-col gap-4">
      <div>Period</div>
      <Datepicker
        value={periodInformation}
        onChange={handleValueChange}
        maxDate={new Date()}
      />
      <div>
        Your time here has been{" "}
        {getFormattedStringFromDays(periodInformation.days)}
      </div>
      <button onClick={() => deletePeriod()} className="btn">
        Remove Period
      </button>
    </div>
  );
}

export default PeriodCalculator;
