<template>
  <div class="p-4 card">
    <div class="card-header pb-0">
      <h6>{{ title }}</h6>
      <p v-if="description" class="text-sm" v-html="description" />
    </div>
    <div class="card-body p-3" style="height: 400px">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'

// Registrasi elemen-elemen Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

// Props
const props = defineProps({
  chart: Object,
  title: String,
  description: String
})

// Reactive Chart Data dan Options
const chartData = computed(() => props.chart)

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: true
    }
  }
}))
</script>
