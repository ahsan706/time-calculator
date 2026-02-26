import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Period, totalDaysFromPeriodList } from '@time-calculator/common';
import { v4 as uuidv4 } from 'uuid';
import { PeriodCalculatorComponent } from './period-calculator.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, PeriodCalculatorComponent],
  host: {
    class: 'contents',
  },
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent implements OnInit {
  @Output() totalDaysChange = new EventEmitter<number>();

  periodList: Period[] = [];

  ngOnInit(): void {
    const storedPeriods = JSON.parse(localStorage.getItem('periodList') ?? '[]');

    this.periodList = storedPeriods.map(
      (period: { id: string; startDate: string; endDate: string }) =>
        new Period({
          id: period.id,
          startDate: new Date(period.startDate),
          endDate: new Date(period.endDate),
        }),
    );

    this.recalculateAndSave();
  }

  addPeriod(): void {
    this.periodList = [
      ...this.periodList,
      new Period({ id: uuidv4(), startDate: null, endDate: null }),
    ];
    this.recalculateAndSave();
  }

  onUpdatePeriod(index: number, period: Period): void {
    const copy = [...this.periodList];
    copy[index] = period;
    this.periodList = copy;
    this.recalculateAndSave();
  }

  onDeletePeriod(index: number): void {
    this.periodList = [
      ...this.periodList.slice(0, index),
      ...this.periodList.slice(index + 1),
    ];
    this.recalculateAndSave();
  }

  private recalculateAndSave(): void {
    const totalDays = totalDaysFromPeriodList(this.periodList);
    this.totalDaysChange.emit(totalDays);

    const validPeriods = this.periodList.filter(
      (period) => period.startDate !== null && period.endDate !== null,
    );

    localStorage.setItem('periodList', JSON.stringify(validPeriods));
  }
}
