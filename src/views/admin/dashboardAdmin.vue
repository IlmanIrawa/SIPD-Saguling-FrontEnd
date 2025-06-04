<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import GradientBarChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "../components/Carousel.vue";
import { useAuthStore } from "@/store/authStore";

// State mini card
const totalLaporan = ref(0);
const laporanMenunggu = ref(0);
const laporanProses = ref(0);
const laporanTindakLanjuti = ref(0);

// Chart data
const chartData = ref({
  labels: [],
  datasets: [{ label: "Laporan", data: [] }],
});

const chartStatus = ref({
  labels: [],
  datasets: [{ label: "Jumlah", data: [] }],
});

onMounted(async () => {
  const authStore = useAuthStore();
  try {
    const response = await axios.get("http://localhost:3000/api/lapor", {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });

    const data = Array.isArray(response.data) ? response.data : [];

    totalLaporan.value = data.length;
    laporanMenunggu.value = data.filter(item => item.statusLapor === "MENUNGGU").length;
    laporanProses.value = data.filter(item => item.statusLapor === "PROSESS").length;
    laporanTindakLanjuti.value = data.filter(item => item.statusLapor === "DITINDAK_LANJUTI").length;

    // Line chart - Laporan per bulan
    const monthlyCount = Array(12).fill(0);
    data.forEach(item => {
      if (item.tanggalLapor) {
        const date = new Date(item.tanggalLapor);
        if (!isNaN(date)) {
          const month = date.getMonth();
          monthlyCount[month]++;
        }
      }
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    chartData.value = {
      labels: monthNames,
      datasets: [
        {
          label: "Laporan",
          data: monthlyCount,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };

    // Bar chart - Jumlah per status
    const statusList = ["MENUNGGU", "PROSESS", "DITINDAK_LANJUTI"];
    const statusCounts = statusList.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});
    data.forEach(item => {
      const status = item.statusLapor;
      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      }
    });

    const statusColors = {
      MENUNGGU: "#f6c23e",
      PROSESS: "#36b9cc",
      DITINDAK_LANJUTI: "#1cc88a",
    };

    chartStatus.value = {
      labels: statusList,
      datasets: [
        {
          label: "Jumlah",
          data: statusList.map(status => statusCounts[status]),
          backgroundColor: statusList.map(status => statusColors[status]),
        },
      ],
    };

  } catch (error) {
    console.error("Gagal mengambil data laporan:", error);
  }
});
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <!-- MINI CARD -->
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Menunggu"
              :value="laporanMenunggu"
              :description="`<span class='text-sm font-weight-bolder text-warning'>Status Awal</span>`"
              :icon="{
                component: 'ni ni-watch-time',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Diproses"
              :value="laporanProses"
              :description="`<span class='text-sm font-weight-bolder text-info'>Sedang Diproses</span>`"
              :icon="{
                component: 'ni ni-settings-gear-65',
                background: 'bg-gradient-info',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Ditindaklanjuti"
              :value="laporanTindakLanjuti"
              :description="`<span class='text-sm font-weight-bolder text-success'>Selesai</span>`"
              :icon="{
                component: 'ni ni-check-bold',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Total Laporan"
              :value="totalLaporan"
              :description="`<span class='text-sm font-weight-bolder text-dark'>Semua Laporan</span>`"
              :icon="{
                component: 'ni ni-collection',
                background: 'bg-gradient-dark',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>

        <!-- CHARTS -->
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <div class="card z-index-2">
              <gradient-line-chart
                v-if="chartData.labels.length > 0"
                id="chart-line"
                title="Grafik Laporan"
                :description="`<i class='fa fa-arrow-up text-success'></i>
                <span class='font-weight-bold'>Statistik per Bulan</span>`"
                :chart="chartData"
              />
            </div>
          </div>
          <div class="col-lg-5">
            <carousel />
          </div>
        </div>

        <!-- BAR CHART STATUS -->
        <div class="row mt-4">
          <div class="col-lg-12">
            <div class="card z-index-2">
              <gradient-bar-chart
                v-if="chartStatus.labels.length > 0"
                id="chart-status"
                title="Statistik Laporan per Status"
                :description="`<i class='fa fa-circle text-info'></i> Status laporan berdasarkan data`"
                :chart="chartStatus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
