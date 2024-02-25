import { useState } from "react";
import Calculator from "./calculator/Calculator";
import { getFormatedStringFromDays as getFormattedStringFromDays } from "./util/utils";


function MainLayout() {
  const [totalDays, setTotalDays] = useState(0);
  const updateDays = (days: number) => {
    setTotalDays(days);
  };
  return (
    <div className='flex flex-col items-center'>
      <h1 className="my-2">Time Calculator</h1>
      <h2 className="my-2">Your time here has been {getFormattedStringFromDays(totalDays)}</h2>
      <Calculator updateDays={updateDays} />
    </div>
  );
}

export default MainLayout;