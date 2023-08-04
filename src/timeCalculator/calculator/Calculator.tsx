import { useEffect, useState } from "react";
import Period from "./Period";
import { PeriodInformation } from "./PeriodInformation";
import { v4 as uuidv4 } from 'uuid';

function Calculator({ updateDays }: { updateDays: (days: number) => void; }) {
    const [periodList, setPeriodList] = useState([] as PeriodInformation[]);
    useEffect(() => {
        console.log('Ahsan')
        const periodListFromLocalStorage = JSON.parse(localStorage.getItem('periodList') ?? '[]');
        if (periodListFromLocalStorage.length > 0 && periodList.length === 0) {
            setPeriodList(periodListFromLocalStorage.map((period:any) => new PeriodInformation({ ...period,startDate: new Date(period.startDate), endDate: new Date(period.endDate) })));
        }
    }, [periodList.length]);
    useEffect(() => {
        updateDays(periodList.reduce((a, b) => a + b.days, 0));
        localStorage.setItem('periodList', JSON.stringify(periodList.filter((period) => period.startDate !== null && period.endDate !== null)));
    }, [periodList, updateDays]);
    return (
        <>
            <button onClick={() => {
                setPeriodList([...periodList, new PeriodInformation({
                    name: "Sample Period",
                    id: uuidv4(),
                    startDate: null,
                    endDate: null
                })]);
            }} style={{ marginBottom: '1vw', marginTop: '1vw' }}>Add Period</button>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2vw', justifyContent: 'center' }}>
                {
                    periodList.map((period, index) =>
                        <Period key={index}
                            periodInfo={period} updatePeriod={(updatePeriodValue: PeriodInformation) => {
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