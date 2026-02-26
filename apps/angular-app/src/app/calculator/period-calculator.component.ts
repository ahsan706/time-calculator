import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
import { getFormattedStringFromDays, Period } from '@time-calculator/common';
import type { Instance } from 'flatpickr/dist/types/instance';

@Component({
  selector: 'app-period-calculator',
  standalone: true,
  host: {
    class: 'contents',
  },
  templateUrl: './period-calculator.component.html',
})
export class PeriodCalculatorComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) periodInfo!: Period;
  @Output() updatePeriod = new EventEmitter<Period>();
  @Output() deletePeriod = new EventEmitter<void>();

  @ViewChild('periodPicker', { static: true }) periodPicker!: ElementRef<HTMLInputElement>;

  private picker?: Instance;

  ngOnChanges(changes: SimpleChanges): void {
    if ('periodInfo' in changes) {
      queueMicrotask(() => this.syncPicker());
    }
  }

  ngOnDestroy(): void {
    this.picker?.destroy();
  }

  formattedDays(days: number): string {
    return getFormattedStringFromDays(days);
  }

  private syncPicker(): void {
    const input = this.periodPicker?.nativeElement;
    if (!input || !this.periodInfo) {
      return;
    }

    const defaultDate = [this.periodInfo.startDate, this.periodInfo.endDate].filter(
      (date): date is Date => date !== null,
    );

    if (!this.picker) {
      this.picker = flatpickr(input, {
        mode: 'range',
        maxDate: new Date(),
        dateFormat: 'Y-m-d',
        defaultDate,
        onChange: (dates) => {
          if (dates.length === 2) {
            this.updatePeriod.emit(
              new Period({
                id: this.periodInfo.id,
                startDate: dates[0],
                endDate: dates[1],
              }),
            );
          }
        },
      }) as Instance;
      return;
    }

    this.picker.setDate(defaultDate, false);
  }
}
