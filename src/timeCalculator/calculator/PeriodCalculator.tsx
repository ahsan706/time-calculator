import { useState } from "react";
import { Period } from "./Period";
import DatePicker from "react-datepicker";
import { getFormatedStringFromDays } from "../util/utils";
import "react-datepicker/dist/react-datepicker.css";
import './Period.css';


function PeriodCalculator({ updatePeriod, deletePeriod, periodInfo }: { updatePeriod: (updatePeriodValue: Period) => void, deletePeriod: () => void, periodInfo: Period }) {
  const [periodInformation, setPeriodInformation] = useState<Period>(periodInfo);
  const updatePeriodInformation = () => {
    setPeriodInformation(new Period({ ...periodInformation }));
    updatePeriod(periodInformation);
  };
  return (
    <div className="period">
      Period Name
      <input value={periodInfo.name} onChange={(event) => {
        periodInformation.name = event.target.value;
        updatePeriodInformation();
      }} />
      <div>In Date</div>
      <DatePicker
        closeOnScroll={true}
        dateFormat={"dd/MM/yyyy"}
        placeholderText={"In Date"}
        selected={periodInformation.inDate}
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
        onChange={(date) => {
          periodInformation.outDate = date;
          updatePeriodInformation();
        }}
        startDate={periodInformation.outDate}
      />
      <div>Your time here has been  {getFormatedStringFromDays(periodInformation.days)}</div>
      <button onClick={() => deletePeriod()}
        style={{ width: 'fit-content', margin: 'auto' }}>Remove Period</button>
    </div>
  );
};

export default PeriodCalculator;