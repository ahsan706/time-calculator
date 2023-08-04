import { useState } from "react";
import DatePicker from "react-datepicker";
import { PeriodInformation } from "./PeriodInformation";
import "react-datepicker/dist/react-datepicker.css";
import './Period.css';

function Period({ updatePeriod, deletePeriod, periodInfo }: { updatePeriod: (updatePeriodValue: PeriodInformation) => void, deletePeriod: () => void, periodInfo: PeriodInformation }) {
  const [periodInformation, setPeriodInformation] = useState<PeriodInformation>(periodInfo);
  const handleCalendarOpen = () => {
    document.addEventListener('touchstart', (event: TouchEvent) => {
      event.stopPropagation();
    }, true);
  };
  const updatePeriodInformation = () => {
      setPeriodInformation(new PeriodInformation({ ...periodInformation}));
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
          closeOnScroll={true}
          withPortal
          onCalendarOpen={handleCalendarOpen} />
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
          minDate={periodInformation.startDate}
          withPortal
          onCalendarOpen={handleCalendarOpen} />
      <div>Your time here has been {periodInformation.days}</div> 
      <button onClick={() => deletePeriod()}
        style={{ width: 'fit-content', margin: 'auto' }}>Remove Period</button>
    </div>
  );
};

export default Period;