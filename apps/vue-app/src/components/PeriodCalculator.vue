<script lang="ts">
import { ref, watch } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { getFormattedStringFromDays, Period } from '@time-calculator/common'

export default {
  name: 'PeriodCalculator',
  components: {
    Datepicker,
  },
  props: {
    periodInfo: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-period', 'delete-period'],
  setup(props, { emit }) {
    console.log(
      'PeriodCalculator setup',
      new Date(props.periodInfo.startDate),
      new Date(props.periodInfo.endDate),
    )
    // Reactive property for the date range
    const dateRange = ref<[Date, Date]>([
      new Date(props.periodInfo.startDate),
      new Date(props.periodInfo.endDate),
    ])

    // Watch for changes in dateRange and emit updates
    watch(dateRange, ([startDate, endDate]) => {
      if (startDate && endDate) {
        const newPeriod = new Period({
          id: props.periodInfo.id,
          startDate,
          endDate,
        })
        emit('update-period', newPeriod)
      }
    })

    return {
      dateRange,
      getFormattedStringFromDays: getFormattedStringFromDays,
    }
  },
}
</script>

<template>
  <div
    class="card bg-base-100 card-bordered shadow-xl w-full sm:w-1 md:w-1/3 min-w-56 p-2 flex flex-col gap-4"
  >
    <div>Period</div>
    <Datepicker
      v-model="dateRange"
      :is-range="true"
      :max-date="new Date()"
      :clearable="true"
      format="MM/dd/yyyy"
      placeholder="Select date range"
      range
    />
    <div>Your time here has been {{ getFormattedStringFromDays(periodInfo.days) }}</div>
    <button @click="$emit('delete-period')" class="btn btn-error">Remove Period</button>
  </div>
</template>
