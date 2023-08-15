import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PeriodCalculator from "./PeriodCalculator";
import { Period } from "./Period";

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
        updateDays(periodList.reduce((a, b) => a + b.days, 0));
        localStorage.setItem('periodList', JSON.stringify(periodList.filter((period) => period.inDate !== null && period.outDate !== null)));
    }, [periodList, updateDays]);
    return (
        <>
            <button onClick={() => {
                setPeriodList([...periodList, new Period({
                    name: "New Period",
                    id: uuidv4(),
                    inDate: null,
                    outDate: null
                })]);
            }} style={{ marginBottom: '1vw', marginTop: '1vw' }}>Add Period</button>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2vw', justifyContent: 'center' }}>
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