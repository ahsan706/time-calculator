<script lang="ts">
import { ref, onMounted, watch, type Ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import PeriodCalculator from './PeriodCalculator.vue'
import { Period, totalDaysFromPeriodList } from '@time-calculator/common'

export default {
  name: 'TimeCalculator',
  components: {
    PeriodCalculator,
  },
  props: {
    updateDays: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const periodList: Ref<Period[], Period[]> = ref([])

    const loadFromLocalStorage = () => {
      const storedPeriods = JSON.parse(localStorage.getItem('periodList') || '[]')
      if (storedPeriods.length) {
        periodList.value = storedPeriods.map(
          (period: { id: string; startDate: string; endDate: string }) =>
            new Period({
              ...period,
              startDate: new Date(period.startDate),
              endDate: new Date(period.endDate),
            }),
        )
      }
    }

    const saveToLocalStorage = () => {
      const validPeriods = periodList.value.filter(
        (period: Period) => period.startDate && period.endDate,
      )
      localStorage.setItem('periodList', JSON.stringify(validPeriods))
    }

    const addPeriod = () => {
      periodList.value.push(new Period({ id: uuidv4(), startDate: null, endDate: null }))
    }

    const updatePeriod = (index: number, updatedPeriod: Period) => {
      periodList.value[index] = updatedPeriod
    }

    const deletePeriod = (index: number) => {
      periodList.value.splice(index, 1)
    }

    watch(
      periodList,
      () => {
        props.updateDays(totalDaysFromPeriodList(periodList.value))
        saveToLocalStorage()
      },
      { deep: true },
    )

    onMounted(() => {
      loadFromLocalStorage()
    })

    return {
      periodList,
      addPeriod,
      updatePeriod,
      deletePeriod,
    }
  },
}
</script>

<template>
  <div class="flex justify-center flex-col items-center">
    <button class="btn btn-primary mb-4" @click="addPeriod">Add Period</button>
    <div class="flex flex-wrap justify-center gap-4">
      <PeriodCalculator
        v-for="(period, index) in periodList"
        :key="period.id"
        :periodInfo="period"
        @update-period="(updatedPeriod: Period) => updatePeriod(index, updatedPeriod)"
        @delete-period="() => deletePeriod(index)"
      />
    </div>
  </div>
</template>
