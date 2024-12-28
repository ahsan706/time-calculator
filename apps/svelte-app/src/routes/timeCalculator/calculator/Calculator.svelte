<script lang="ts">
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import PeriodCalculator from './PeriodCalculator.svelte';
  import { Period, totalDaysFromPeriodList } from '@time-calculator/common';

  // Props
  export let updateDays: (days: number) => void;

  // Reactive list of periods
  let periodList: Period[] = [];

  // Load periods from localStorage on mount
  onMount(() => {
    const periodListFromLocalStorage = JSON.parse(localStorage.getItem('periodList') || '[]');
    if (periodListFromLocalStorage.length > 0) {
      periodList = periodListFromLocalStorage.map(
        (period: { startDate: string; endDate: string; id?: string }) =>
          new Period({
            id: period.id || uuidv4(),
            startDate: new Date(period.startDate),
            endDate: new Date(period.endDate),
          })
      );
    }
  });

  // Update total days and save periods to localStorage when `periodList` changes
  $: {
    if (periodList.length > 0) {
      updateDays(totalDaysFromPeriodList(periodList));
      localStorage.setItem(
        'periodList',
        JSON.stringify(
          periodList.filter(
            (period) => period.startDate !== null && period.endDate !== null
          )
        )
      );
    }
  }

  // Add a new period
  function addPeriod() {
    periodList = [
      ...periodList,
      new Period({
        id: uuidv4(),
        startDate: null,
        endDate: null,
      }),
    ];
  }

  // Update a specific period
  function updatePeriod(index: number, updatedPeriod: Period) {
    const copyList = [...periodList];
    copyList[index] = updatedPeriod;
    periodList = copyList;
  }

  // Delete a specific period
  function deletePeriod(index: number) {
    periodList = [
      ...periodList.slice(0, index),
      ...periodList.slice(index + 1),
    ];
  }
</script>

<button class="btn" on:click={addPeriod}>Add Period</button>
<div class="flex flex-wrap justify-center w-full gap-4">
  {#each periodList as period, index}
    <PeriodCalculator
      {period}
      {index}
      {updatePeriod}
      {deletePeriod}
    />
  {/each}
</div>
