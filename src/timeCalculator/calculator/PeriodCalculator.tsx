import { useState } from "react";
import { Period } from "./Period";
import DatePicker from "react-datepicker";
import { getFormatedStringFromDays } from "../util/utils";
import "react-datepicker/dist/react-datepicker.css";
import './Period.css';


function PeriodCalculator({ updatePeriod, deletePeriod, periodInfo }: { updatePeriod: (updatePeriodValue: Period) => void, deletePeriod: () => void, periodInfo: Period }) {
  const [periodInformation, setPeriodInformation] = useState<Period>(periodInfo);
  const updatePeriodInformation = () => {
      setPeriodInformation(new Period({ ...periodInformation}));
      updatePeriod(periodInformation);
  };
  return (
    <div className="period">
      Period Name
      <input value={periodInfo.name} onChange={(event) => {
        periodInformation.name = event.target.value;
        updatePeriodInformation();
        }}/>
      <div>Start Date</div>
      <DatePicker selected={periodInformation.startDate}
          onChange={(date) => {
            periodInformation.startDate = date;
            updatePeriodInformation();
          }}
          selectsStart
          startDate={periodInformation.startDate}
          endDate={periodInformation.endDate}
          placeholderText={"Start Date"}
          closeOnScroll={true} />
      <div>End Date</div>
        <DatePicker selected={periodInformation.endDate}
          onChange={(date) => {
            periodInformation.endDate = date;
            updatePeriodInformation();
          }}
          placeholderText={"End Date"}
          closeOnScroll={true}
          selectsEnd
          startDate={periodInformation.startDate}
          endDate={periodInformation.endDate}
          minDate={periodInformation.startDate} />
      <div>Your time here has been  {getFormatedStringFromDays(periodInformation.days)}</div> 
      <button onClick={() => deletePeriod()}
        style={{ width: 'fit-content', margin: 'auto' }}>Remove Period</button>
    </div>
  );
};

export default PeriodCalculator;