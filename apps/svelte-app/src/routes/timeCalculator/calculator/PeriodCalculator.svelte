<script lang="ts">
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { getFormattedStringFromDays, Period } from '@time-calculator/common';
	import { format } from 'date-fns';

	// Props
	export let period: Period;
	export let index: number;
	export let updatePeriod: (index: number, updatedPeriod: Period) => void;
	export let deletePeriod: (index: number) => void;

	console.log('period', period);
	let startDate: Date | null = period.startDate;
	let endDate: Date | null = period.endDate;
	let dateFormat = 'MMM d, yyyy';
	let isOpen = false;

	// Reactive formatted dates
	$: formattedStartDate = startDate ? format(startDate, dateFormat) : '';
	$: formattedEndDate = endDate ? format(endDate, dateFormat) : '';

	// Previous values for comparison
	let prevStartDate: Date | null = startDate;
	let prevEndDate: Date | null = endDate;

	// Update the period only if the dates have changed
	$: if (startDate && endDate) {
		if (startDate !== prevStartDate || endDate !== prevEndDate) {
			const updatedPeriod: Period = new Period({
				id: period.id,
				startDate: new Date(startDate),
				endDate: new Date(endDate)
			});
			updatePeriod(index, updatedPeriod);

			// Update previous values
			prevStartDate = startDate;
			prevEndDate = endDate;
		}
	}

	// Toggle date picker visibility
	const toggleDatePicker = () => {
		isOpen = !isOpen;
	};
</script>

<div
	class="card flex w-full flex-col items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-lg sm:w-1/2 md:w-1/3"
>
	<div class="text-lg font-semibold">Period</div>

	<div class="w-full">
		<DatePicker bind:isOpen bind:startDate bind:endDate isRange>
			<button
				type="button"
				class="flex w-full items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
				on:click={toggleDatePicker}
				aria-expanded={isOpen}
				aria-haspopup="dialog"
			>
				<div class="flex-grow text-sm text-gray-700">
					{#if startDate && endDate}
						{formattedStartDate} - {formattedEndDate}
					{:else}
						Pick a date
					{/if}
				</div>
			</button>
		</DatePicker>
	</div>

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
