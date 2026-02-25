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

<div class="card bg-base-100 card-bordered shadow-xl w-full sm:w-1/2 md:w-1/3 p-2 flex flex-col gap-4">
	<div>Period</div>

	<input
		bind:this={inputEl}
		class="input input-bordered w-full"
		placeholder="Select date range"
		readonly
	/>

	<div>Your time here has been {getFormattedStringFromDays(period.days)}</div>

	<button class="btn btn-error" on:click={() => deletePeriod(index)}>
		Remove Period
	</button>
</div>
