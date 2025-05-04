<template>
  <div class="container">
    <h2>Statistik Penduduk</h2>
    <hr>
    <div class="charts">
      <div v-for="(chartData, index) in charts" :key="index" class="chart-container">
        <h3>{{ chartData.title }}</h3>
        <canvas :ref="chartData.ref"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

Chart.register(...registerables);

export default {
  data() {
    return {
      charts: [
        { title: "Pekerjaan", ref: "pekerjaanChart", api: "pekerjaan" },
        { title: "Agama", ref: "agamaChart", api: "agama" },
        { title: "Pendidikan", ref: "pendidikanChart", api: "pendidikan" },
        { title: "Perkawinan", ref: "perkawinanChart", api: "perkawinan" },
      ],
      chartInstances: {},
      chartData: null,  // Tempatkan data untuk semua chart di sini
    };
  },
  async mounted() {
    const authStore = useAuthStore();
    if (!authStore.token) {
      console.error("Token kosong! Tidak dapat melakukan permintaan API.");
      return;
    }
    await this.fetchAndRenderCharts(authStore.token);
  },
  methods: {
    async fetchAndRenderCharts(token) {
      try {
        // Ambil semua data statistik sekali
        const response = await axios.get("http://localhost:3000/api/statistik", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Simpan data statistik yang diterima
        this.chartData = response.data;

        // Render chart untuk setiap kategori
        for (let chart of this.charts) {
          const data = this.chartData[chart.api];
          const labels = data.map((item) => Object.values(item)[0]); // Nama kategori
          const values = data.map((item) => item.total); // Jumlah

          const ctx = this.$refs[chart.ref];
          if (ctx) {
            this.chartInstances[chart.ref] = new Chart(ctx, {
              type: "bar",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: chart.title,
                    data: values,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
              },
            });
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    },
  },
};
</script>

<style scoped>
.charts {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.chart-container {
  width: 45%;
  height: 300px;
}
h3 {
  text-align: center;
}
h2 {
  text-align: center;
  margin-top:10px;
}
.container {
  margin: 5px;
  border-radius: 10px;
  background-color: white;
}
</style>
