import { useState } from "react";
import Calculator from "./calculator/Calculator";
import "./MainLayout.css";
import { getFormatedStringFromDays } from "./util/utils";


function MainLayout() {
  const [totalDays, setTotalDays] = useState(0);
  const updateDays = (days: number) => {
    setTotalDays(days);
  };
  return (
    <div className='mainLayout'>
      <h1 >Time Calculator</h1>
      Your time here has been {getFormatedStringFromDays(totalDays)}
      <Calculator updateDays={updateDays} />
    </div>
  );
}

export default MainLayout;