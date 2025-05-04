<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import GradientBarChart from "@/examples/Charts/GradientLineChart.vue"; 
import Carousel from "../components/Carousel.vue";
import { useAuthStore } from "@/store/authStore";

// State untuk statistik mini card
const totalPengajuan = ref(0);
const pengajuanNonSelesai = ref(0);
const waitingList = ref(0);
const selesai = ref(0);

// Data grafik line dan bar
const chartData = ref({
  labels: [],
  datasets: [{ label: "Pengajuan", data: [] }]
});

const chartStatus = ref({
  labels: [],
  datasets: [{ label: "Jumlah", data: [] }]
});

onMounted(async () => {
    const authStore = useAuthStore();
  try {
    const response = await axios.get("http://localhost:3000/api/pengajuan",{
        headers: { Authorization: `Bearer ${authStore.token}` },
    });
    const data = response.data;

    // Mini card stats
    totalPengajuan.value = data.length;
    pengajuanNonSelesai.value = data.filter(item => item.status !== "SELESAI").length;
    waitingList.value = data.filter(item => item.status === "PENDING").length;
    selesai.value = data.filter(item => item.status !== "SELESAI").length;

    // Line chart - jumlah pengajuan per bulan
    const monthlyCount = Array(12).fill(0);
    data.forEach(item => {
      const date = new Date(item.created_at);
      const month = date.getMonth(); // 0 - 11
      monthlyCount[month]++;
    });

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    chartData.value = {
      labels: monthNames,
      datasets: [
        {
          label: "Pengajuan",
          data: monthlyCount
        }
      ]
    };

    // Bar chart - jumlah pengajuan per status
    const statusCounts = {};
    data.forEach(item => {
      const status = item.status || "LAINNYA";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    chartStatus.value = {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: "Jumlah",
          data: Object.values(statusCounts),
          backgroundColor: [
            "#f6c23e", "#36b9cc", "#1cc88a", "#e74a3b", "#858796"
          ]
        }
      ]
    };
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
                component: 'ni ni',
                background: 'bg-gradient-primary',
                shape: 'rounded-circle'
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Waiting List"
              :value="waitingList"
              :description="`<span class='text-sm font-weight-bolder text-success'>Menunggu</span>`"
              :icon="{
                component: 'ni ni',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle'
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Selesai"
              :value="selesai"
              :description="`<span class='text-sm font-weight-bolder text-success'>Lapor</span>`"
              :icon="{
                component: 'ni ni',
                background: 'bg-gradient-success',
                shape: 'rounded-circle'
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Total Pengajuan"
              :value="totalPengajuan"
              :description="`<span class='text-sm font-weight-bolder text-success'>Pengajuan</span>`"
              :icon="{
                component: 'ni ni',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle'
              }"
            />
          </div>
        </div>

        <!-- CHARTS -->
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <div class="card z-index-2">
              <gradient-line-chart
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
