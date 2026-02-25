<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import flatpickr from 'flatpickr';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import { getFormattedStringFromDays, Period } from '@time-calculator/common';

	export let period: Period;
	export let index: number;
	export let updatePeriod: (index: number, updatedPeriod: Period) => void;
	export let deletePeriod: (index: number) => void;

	let inputEl: HTMLInputElement;
	let fp: Instance;

	onMount(() => {
		const defaultDate = [period.startDate, period.endDate].filter(
			(d): d is Date => d != null
		);

		fp = flatpickr(inputEl, {
			mode: 'range',
			maxDate: new Date(),
			dateFormat: 'Y-m-d',
			defaultDate,
			onChange(dates) {
				if (dates.length === 2) {
					const updatedPeriod = new Period({
						id: period.id,
						startDate: dates[0],
						endDate: dates[1]
					});
					updatePeriod(index, updatedPeriod);
				}
			}
		}) as Instance;
	});

	onDestroy(() => {
		fp?.destroy();
	});
</script>

<div
	class="card flex w-full flex-col items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-lg sm:w-1/2 md:w-1/3"
>
	<div class="text-lg font-semibold">Period</div>

	<input
		bind:this={inputEl}
		class="input input-bordered w-full"
		placeholder="Select date range"
		readonly
	/>

	<div class="text-sm text-gray-600">
		Your time here has been <span class="font-medium"
			>{getFormattedStringFromDays(period.days)}</span
		>
	</div>

	<button
		class="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
		on:click={() => deletePeriod(index)}
	>
		Remove Period
	</button>
</div>
