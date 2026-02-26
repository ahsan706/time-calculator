import { Component } from '@angular/core';
import { getFormattedStringFromDays } from '@time-calculator/common';
import { CalculatorComponent } from './calculator/calculator.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CalculatorComponent],
  host: {
    class: 'contents',
  },
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  totalDays = 0;

  onTotalDaysChange(days: number): void {
    this.totalDays = days;
  }

  formattedDays(days: number): string {
    return getFormattedStringFromDays(days);
  }
}
