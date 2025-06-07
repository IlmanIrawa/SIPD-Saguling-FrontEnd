<template>
  <section class="p-4 bg-white rounded shadow">
    <!-- Judul -->
    <div class="text-center mb-4">
      <h2 class="fw-bold text-success">Statistik Penduduk</h2>
      <hr />
      <p class="text-muted">
        Visualisasi data kependudukan berdasarkan kategori pendidikan, pekerjaan, agama, jenis kelamin, perkawinan, dan usia.
      </p>
    </div>

    <!-- Chart Statistik (2 per baris) -->
    <div class="row gy-4">
      <div
        class="col-md-6"
        v-for="(chart, index) in chartDataList"
        :key="index"
      >
        <GradientLineChart
          :id="`chart-${index}`"
          :title="chart.title"
          :chart="{
            labels: chart.labels,
            datasets: [
              {
                label: chart.title,
                data: chart.data
              }
            ]
          }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";

const users = ref([]);
const chartDataList = ref([]);

// Utility: Hitung jumlah berdasarkan field tertentu
const countByField = (data, field) => {
  const result = {};
  data.forEach((item) => {
    const key = item[field] || "Tidak Diisi";
    result[key] = (result[key] || 0) + 1;
  });
  return result;
};

// Utility: Hitung kelompok usia
const countByAgeGroup = (data) => {
  const result = {
    "Balita (0-5)": 0,
    "Anak (6-12)": 0,
    "Remaja (13-17)": 0,
    "Dewasa (18-59)": 0,
    "Lansia (60+)": 0,
  };
  const now = new Date();

  data.forEach((item) => {
    const birth = new Date(item.tanggalLahir);
    const age = now.getFullYear() - birth.getFullYear();
    if (age <= 5) result["Balita (0-5)"]++;
    else if (age <= 12) result["Anak (6-12)"]++;
    else if (age <= 17) result["Remaja (13-17)"]++;
    else if (age <= 59) result["Dewasa (18-59)"]++;
    else result["Lansia (60+)"]++;
  });

  return result;
};

// Format data untuk chart
const convertToChartData = (obj) => {
  return {
    labels: Object.keys(obj),
    data: Object.values(obj),
  };
};

// Ambil data dari API dan proses chart
const fetchData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/user/stat");
    const data = await res.json();
    users.value = data;

    chartDataList.value = [
      {
        title: "Pendidikan",
        ...convertToChartData(countByField(data, "pendidikan")),
      },
      {
        title: "Pekerjaan",
        ...convertToChartData(countByField(data, "pekerjaan")),
      },
      {
        title: "Agama",
        ...convertToChartData(countByField(data, "agama")),
      },
      {
        title: "Jenis Kelamin",
        ...convertToChartData(countByField(data, "jenisKelamin")),
      },
      {
        title: "Perkawinan",
        ...convertToChartData(countByField(data, "perkawinan")),
      },
      {
        title: "Kelompok Usia",
        ...convertToChartData(countByAgeGroup(data)),
      },
    ];
  } catch (err) {
    console.error("Gagal mengambil data pengguna:", err);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
section {
  max-width: 1200px;
  margin: auto;
  border-radius: 20px;
}
</style>
