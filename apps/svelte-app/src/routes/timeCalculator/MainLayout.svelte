<script lang="ts">
    import Calculator from './calculator/Calculator.svelte';
    import { getFormattedStringFromDays } from '@time-calculator/common';
  
    let totalDays = 0;
  
    const updateDays = (days: number) => {
      totalDays = days;
    };
  </script>
  
  <div class="flex justify-center flex-col items-center gap-4 p-2">
    <h1>Time Calculator</h1>
    <h2>Your time here has been {getFormattedStringFromDays(totalDays)}</h2>
    <Calculator {updateDays} />
  </div>
  