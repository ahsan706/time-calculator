import { LegacyRef, forwardRef, useState } from "react";
import { Period } from "./Period";
import DatePicker from "react-datepicker";
import { getFormatedStringFromDays } from "../util/utils";
import "react-datepicker/dist/react-datepicker.css";


function PeriodCalculator({ updatePeriod, deletePeriod, periodInfo }: { updatePeriod: (updatePeriodValue: Period) => void, deletePeriod: () => void, periodInfo: Period }) {
  const [periodInformation, setPeriodInformation] = useState<Period>(periodInfo);
  const updatePeriodInformation = () => {
    setPeriodInformation(new Period({ ...periodInformation }));
    updatePeriod(periodInformation);
  };
  const CustomDateButton = forwardRef(({ value, onClick }:any, ref:LegacyRef<HTMLButtonElement> ) => (
    <button className="bg-gray-300 hover:bg-gray-500 text-white border border-gray-500 rounded px-2" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <div className="flex flex-col gap-1vw mt-1vw mb-1vw md:w-1/4 sm:w-1/2 w-1/2 items-center border-solid border-2 border-blue-600 rounded border-opacity-25 m-2 px-3 py-1 justify-evenly">
      <div>In Date</div>
      <DatePicker
        closeOnScroll={true}
        dateFormat={"dd/MM/yyyy"}
        placeholderText={"In Date"}
        selected={periodInformation.inDate}
        customInput={<CustomDateButton />}
        onChange={(date) => {
          periodInformation.inDate = date;
          updatePeriodInformation();
        }}
        startDate={periodInformation.inDate}
      />
      <div>Out Date</div>
      <DatePicker
        closeOnScroll={true}
        dateFormat={"dd/MM/yyyy"}
        placeholderText={"Out Date"}
        selected={periodInformation.outDate}
        customInput={<CustomDateButton />}
        onChange={(date) => {
          periodInformation.outDate = date;
          updatePeriodInformation();
        }}
        startDate={periodInformation.outDate}
      />
      <div>Your time here has been  {getFormatedStringFromDays(periodInformation.days)}</div>
      <button onClick={() => deletePeriod()}
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border border-blue-700 rounded mt-1">Remove Period</button>
    </div>
  );
};

export default PeriodCalculator;