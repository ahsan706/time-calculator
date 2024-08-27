import { useState } from "react";
import Calculator from "./calculator/Calculator";
import { getFormattedStringFromDays } from "./util/utils";


function MainLayout() {
  const [totalDays, setTotalDays] = useState(0);
  const updateDays = (days: number) => {
    setTotalDays(days);
  };
  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <h1>Time Calculator</h1>
      <h2>Your time here has been {getFormattedStringFromDays(totalDays)}</h2>
      <Calculator updateDays={updateDays} />
    </div>
  );
}

export default MainLayout;