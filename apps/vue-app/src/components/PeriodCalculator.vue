<script lang="ts">
import { ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import { getFormattedStringFromDays, Period } from '@time-calculator/common'

export default {
  name: 'PeriodCalculator',
  components: {
    FlatPickr,
  },
  props: {
    periodInfo: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-period', 'delete-period'],
  setup(props, { emit }) {
    const dateValue = ref<string>('')

    if (props.periodInfo.startDate && props.periodInfo.endDate) {
      const start = new Date(props.periodInfo.startDate).toISOString().split('T')[0]
      const end = new Date(props.periodInfo.endDate).toISOString().split('T')[0]
      dateValue.value = `${start} to ${end}`
    }

    const config = {
      mode: 'range',
      maxDate: new Date(),
      dateFormat: 'Y-m-d',
    }

    const handleChange = (dates: Date[]) => {
      if (dates.length === 2) {
        const newPeriod = new Period({
          id: props.periodInfo.id,
          startDate: dates[0],
          endDate: dates[1],
        })
        emit('update-period', newPeriod)
      }
    }

    return {
      dateValue,
      config,
      handleChange,
      getFormattedStringFromDays,
    }
  },
}
</script>

<template>
  <div
    class="card bg-base-100 card-bordered shadow-xl w-full sm:w-1/2 md:w-1/3 p-2 flex flex-col gap-4"
  >
    <div>Period</div>
    <FlatPickr
      v-model="dateValue"
      :config="config"
      class="input input-bordered w-full"
      @on-change="handleChange"
    />
    <div>Your time here has been {{ getFormattedStringFromDays(periodInfo.days) }}</div>
    <button @click="$emit('delete-period')" class="btn btn-error">Remove Period</button>
  </div>
</template>
