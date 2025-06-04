<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import GradientBarChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "../components/Carousel.vue";
import { useAuthStore } from "@/store/authStore";

// State mini card
const totalPengajuan = ref(0);
const pengajuanNonSelesai = ref(0);
const waitingList = ref(0);
const selesai = ref(0);

// Chart data
const chartData = ref({
  labels: [],
  datasets: [{ label: "Pengajuan", data: [] }],
});

const chartStatus = ref({
  labels: [],
  datasets: [{ label: "Jumlah", data: [] }],
});

onMounted(async () => {
  const authStore = useAuthStore();
  try {
    const response = await axios.get("http://localhost:3000/api/pengajuan", {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });

    const data = Array.isArray(response.data) ? response.data : [];

    totalPengajuan.value = data.length;
    pengajuanNonSelesai.value = data.filter(
      (item) => item.statusPengajuan !== "SELESAI"
    ).length;
    waitingList.value = data.filter(
      (item) => item.statusPengajuan === "PENDING"
    ).length;
    selesai.value = data.filter(
      (item) => item.statusPengajuan === "SELESAI"
    ).length;

    // Line chart - Pengajuan per bulan
    const monthlyCount = Array(12).fill(0);
    data.forEach((item) => {
      if (item.tanggalPengajuan) {
        const date = new Date(item.tanggalPengajuan);
        if (!isNaN(date)) {
          const month = date.getMonth();
          monthlyCount[month]++;
        }
      }
    });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    chartData.value = {
      labels: monthNames,
      datasets: [
        {
          label: "Pengajuan",
          data: monthlyCount,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };

    // Bar chart - Pengajuan per status (lengkap)
    const allStatuses = [
      "TOLAK",
      "PENDING",
      "ON_PROCESS",
      "MENUNGGU_TTD",
      "SELESAI",
    ];

    const statusCounts = allStatuses.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    data.forEach((item) => {
      const status = item.statusPengajuan;
      if (Object.prototype.hasOwnProperty.call(statusCounts, status)) {
        statusCounts[status]++;
      }
    });

    const statusColors = {
      TOLAK: "#e74a3b", // merah
      PENDING: "#f6c23e", // kuning
      ON_PROCESS: "#36b9cc", // biru muda
      MENUNGGU_TTD: "#858796", // abu
      SELESAI: "#1cc88a", // hijau
    };

    chartStatus.value = {
      labels: allStatuses,
      datasets: [
        {
          label: "Jumlah",
          data: allStatuses.map((status) => statusCounts[status]),
          backgroundColor: allStatuses.map((status) => statusColors[status]),
        },
      ],
    };

    // Debug log
    console.log("ChartData:", chartData.value);
    console.log("ChartStatus:", chartStatus.value);
  } catch (error) {
    console.error("Gagal mengambil data pengajuan:", error);
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
              title="Pengajuan"
              :value="pengajuanNonSelesai"
              :description="`<span class='text-sm font-weight-bolder text-success'>Administrasi</span>`"
              :icon="{
                component: 'ni ni-send',
                background: 'bg-gradient-primary',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Waiting List"
              :value="waitingList"
              :description="`<span class='text-sm font-weight-bolder text-warning'>Menunggu</span>`"
              :icon="{
                component: 'ni ni-time-alarm',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Selesai"
              :value="selesai"
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
              title="Total Pengajuan"
              :value="totalPengajuan"
              :description="`<span class='text-sm font-weight-bolder text-info'>Pengajuan</span>`"
              :icon="{
                component: 'ni ni-collection',
                background: 'bg-gradient-warning',
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
                title="Grafik Pengajuan Administrasi"
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
                title="Statistik Pengajuan per Status"
                :description="`<i class='fa fa-circle text-info'></i> Status pengajuan berdasarkan data`"
                :chart="chartStatus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
