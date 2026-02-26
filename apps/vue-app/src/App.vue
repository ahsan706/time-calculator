<script setup lang="ts">
import './assets/main.css'
import { ref } from 'vue'
import { getFormattedStringFromDays } from '@time-calculator/common'
import TimeCalculator from './components/TimeCalculator.vue'

const totalDays = ref(0)
const updateDays = (updateDays: number) => {
  totalDays.value = updateDays
}
</script>

<template>
  <div class="flex justify-center flex-col items-center gap-4 p-2">
    <h1>Time Calculator</h1>
    <h2>Your time here has been {{ getFormattedStringFromDays(totalDays) }}</h2>
    <TimeCalculator :updateDays="updateDays" class="shadow-lg p-4 rounded-lg" />
  </div>
</template>
