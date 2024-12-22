import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PeriodCalculator from "./PeriodCalculator";
import { Period } from "@time-calculator/common";
import { totalDaysFromPeriodList } from "@time-calculator/common";

function Calculator({ updateDays }: { updateDays: (days: number) => void; }) {
    const [periodList, setPeriodList] = useState([] as Period[]);

    useEffect(() => {
        // Load Periods from Local Storage if they exist.
        const periodListFromLocalStorage = JSON.parse(localStorage.getItem('periodList') ?? '[]');
        if (periodListFromLocalStorage.length > 0 && periodList.length === 0) {
            setPeriodList(periodListFromLocalStorage.map((period:any) => new Period({ ...period,startDate: new Date(period.startDate), endDate: new Date(period.endDate) })));
        }
    }, [periodList.length]);

    useEffect(() => {
        updateDays(totalDaysFromPeriodList(periodList));
        localStorage.setItem('periodList', JSON.stringify(periodList.filter((period) => period.startDate !== null && period.endDate !== null)));
    }, [periodList, updateDays]);
    
    return (
        <>
            <button className="btn"
            onClick={() => {
                setPeriodList([...periodList, new Period({
                    id: uuidv4(),
                    startDate: null,
                    endDate: null
                })]);
            }} >Add Period</button>
            <div className="flex flex-wrap justify-center w-full gap-4">
                {
                    periodList.map((period, index) =>
                        <PeriodCalculator key={index}
                            periodInfo={period} updatePeriod={(updatePeriodValue: Period) => {
                                let copyList = [...periodList];
                                copyList[index] = updatePeriodValue;
                                setPeriodList(copyList)
                            }}
                            deletePeriod={() => {
                                setPeriodList([...periodList.slice(0, index), ...periodList.slice(index + 1)])
                            }} />)
                }
            </div>
        </>
    );
}

export default Calculator;