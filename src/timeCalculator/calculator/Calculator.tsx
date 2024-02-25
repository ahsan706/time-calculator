import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PeriodCalculator from "./PeriodCalculator";
import { Period } from "./Period";
import { totalDaysFromPeriodList } from "../util/utils";

function Calculator({ updateDays }: { updateDays: (days: number) => void; }) {
    const [periodList, setPeriodList] = useState([] as Period[]);
    useEffect(() => {
        // Load Periods from Local Storage if they exist.
        const periodListFromLocalStorage = JSON.parse(localStorage.getItem('periodList') ?? '[]');
        if (periodListFromLocalStorage.length > 0 && periodList.length === 0) {
            setPeriodList(periodListFromLocalStorage.map((period:any) => new Period({ ...period,inDate: new Date(period.inDate), outDate: new Date(period.outDate) })));
        }
    }, [periodList.length]);
    useEffect(() => {
        updateDays(totalDaysFromPeriodList(periodList));
        localStorage.setItem('periodList', JSON.stringify(periodList.filter((period) => period.inDate !== null && period.outDate !== null)));
    }, [periodList, updateDays]);
    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border border-blue-700 rounded my-2"
            onClick={() => {
                setPeriodList([...periodList, new Period({
                    id: uuidv4(),
                    inDate: null,
                    outDate: null
                })]);
            }} >Add Period</button>
            <div className="flex flex-wrap gap-2vw justify-center">
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