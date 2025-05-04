<template>
  <div class="history-container">
    <div class="card modern-card">
      <div class="card-header">
        <h2 class="card-title">Aduan dan Laporan</h2>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari ..."
          class="search-input"
        />
      </div>

      <div class="card-container">
        <div v-for="Lapor in filteredLapor" :key="Lapor.laporid" class="report-card">
          <h3>{{ Lapor.nama }}</h3>
          <p>{{ Lapor.isiLaporan.substring(0, 50) }}...</p>
          <button v-if="!Lapor.diterima" @click="previewLaporan(Lapor)" class="preview-button">Lihat Detail</button>
        </div>
      </div>

      <div v-if="selectedLaporan" class="modal-overlay" @click.self="selectedLaporan = null">
        <div class="modal-content">
          <h3>{{ selectedLaporan.nama }}</h3>
          <p>{{ selectedLaporan.isiLaporan }}</p>
          <button @click="terimaLaporan(selectedLaporan)" class="accept-button">Terima</button>
          <button @click="selectedLaporan = null" class="close-button">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export default {
  name: "Lapor",
  data() {
    return {
      lapor: [],
      searchQuery: "",
      selectedLaporan: null,
    };
  },
  computed: {
    filteredLapor() {
      return this.lapor.filter((item) =>
        item.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.isiLaporan.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchPengajuan() {
      const authStore = useAuthStore();
      if (!authStore.token) {
        console.error("Token kosong! Tidak dapat melakukan permintaan API.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/lapor", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        this.lapor = response.data.map((item) => ({
          laporid: item.laporid,
          nama: item.nama,
          isiLaporan: item.isiLaporan,
          diterima: false,
        }));
      } catch (error) {
        console.error("Error fetching Pengajuan:", error);
      }
    },
    previewLaporan(laporan) {
      this.selectedLaporan = laporan;
    },
    terimaLaporan(laporan) {
      laporan.diterima = true;
      this.selectedLaporan = null;
    },
  },
  mounted() {
    this.fetchPengajuan();
  },
};
</script>

<style scoped>
.history-container {
  background-color: #f4f7fa;
  padding: 20px;
}

.modern-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.card-title {
  margin: 0;
  font-weight: 600;
  color: #333;
  font-size: 1.25rem;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 20px;
}

.report-card {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.report-card:hover {
  transform: translateY(-5px);
}

.report-card h3 {
  margin: 0 0 10px;
  font-size: 1rem;
  color: #333;
}

.report-card p {
  margin: 0 10px 10px 0;
  font-size: 0.875rem;
  color: #555;
}

.preview-button {
  padding: 6px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.preview-button:hover {
  background-color: #0056b3;
}

.accept-button {
  padding: 8px 16px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.accept-button:hover {
  background-color: #218838;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  text-align: center;
}

.close-button {
  margin-top: 20px;
  padding: 8px 16px;
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #c82333;
}
</style>
