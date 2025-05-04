<template>
  <div class="wrapper-container">
    <div class="container mt-5">
      <div class="header-container">
        <h6 class="header-title">📋 Laporan Masuk</h6>
        <p class="header-subtitle">Pantau semua laporan yang masuk secara real-time</p>
        <select v-model="filterStatus" class="form-select mt-3 w-50 mx-auto">
          <option value="">Semua</option>
          <option value="MENUNGGU">Menunggu</option>
          <option value="PROSESS">Proses</option>
          <option value="DITINDAK_LANJUTI">Ditindak Lanjuti</option>
        </select>
      </div>
      <hr class="divider" />

      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Memuat data...</p>
      </div>

      <div v-else-if="laporan.length === 0" class="text-center empty-message">
        🚫 Tidak ada laporan masuk.
      </div>

      <div v-else>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Pelapor</th>
              <th>No HP</th>
              <th>Isi Laporan</th>
              <th>Status Laporan</th>
              <th>Lampiran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredLaporan" :key="item.laporid">
              <td>{{ index + 1 }}</td>
              <td>{{ item.nama }}
                <span v-if="item.statusLapor === 'MENUNGGU'" style="color:red;">(Menunggu)</span>
              </td>
              <td>{{ item.nohp }}</td>
              <td>{{ item.isiLaporan }}</td>
              <td>{{ item.statusLapor }}</td>
              <td>
                <button v-if="item.lampiran" @click="showLampiran(item.lampiran)" class="btn-primary">
                  📎 Lihat Lampiran
                </button>
              </td>
              <td>
                <button @click="openEditModal(item)" class="btn btn-warning btn-sm"><i class="bi bi-pencil-square"></i>Terima</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal for Editing -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h3>Edit Status Laporan</h3>
          <form @submit.prevent="updateStatusLapor(currentItem, selectedStatus)">
            <div class="form-group">
              <label for="statusLapor">Pilih Status Laporan:</label>
              <select v-model="selectedStatus" id="statusLapor" class="form-select">
                <option v-for="status in statusLapor" :key="status" :value="status">{{ status }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-success mt-3">Update</button>
            <button type="button" class="btn btn-danger mt-3" @click="closeModal">Batal</button>
          </form>
        </div>
      </div>

      <!-- Popup for Lampiran -->
      <div v-if="showPopup" class="popup-overlay" @click="closePopup">
        <div class="popup-content" @click.stop>
          <img :src="currentLampiran" alt="Lampiran" class="popup-image" />
          <button class="btn-close" @click="closePopup"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export default {
  data() {
    return {
      laporan: [],
      loading: true,
      showPopup: false,
      currentLampiran: "",
      filterStatus: "",
      statusLapor: ['MENUNGGU', 'PROSESS', 'DITINDAK_LANJUTI'],
      showModal: false,
      selectedStatus: '',
      currentItem: null,
    };
  },
  computed: {
    filteredLaporan() {
      if (!this.filterStatus) return this.laporan;
      return this.laporan.filter((item) => item.statusLapor === this.filterStatus);
    },
  },
  methods: {
    async fetchLaporan() {
      try {
        const authStore = useAuthStore();
        const response = await axios.get("http://localhost:3000/api/lapor", {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.laporan = response.data;
      } catch (error) {
        console.error("Gagal memuat data laporan:", error);
      } finally {
        this.loading = false;
      }
    },
    async updateStatusLapor(item, status) {
      try {
        const authStore = useAuthStore();
        await axios.put(
          `http://localhost:3000/api/lapor/${item.laporid}`,
          { statusLapor: status },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        item.statusLapor = status; // Update status di UI
        this.closeModal();
      } catch (error) {
        console.error("Gagal memperbarui status laporan:", error);
      }
    },
    showLampiran(lampiran) {
      this.currentLampiran = `http://localhost:3000/uploads/${lampiran}`;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.currentLampiran = "";
    },
    openEditModal(item) {
      this.currentItem = item;
      this.selectedStatus = item.statusLapor;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentItem = null;
      this.selectedStatus = '';
    },
  },
  mounted() {
    this.fetchLaporan();
  },
};
</script>

<style scoped>
/* Style yang sudah ada */
.wrapper-container {
  padding: 40px 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.header-container {
  text-align: center;
  margin-bottom: 30px;
}

.header-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}

.header-subtitle {
  font-size: 1rem;
  color: #6c757d;
}

/* Style for Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.btn {
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  margin: 5px;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

/* Mengatur tampilan dasar tabel */
.table {
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
}

.table td,
.table th {
  padding: 8px 10px;
  vertical-align: middle;
  font-size: 14px;
  border-bottom: 1px solid #dee2e6;
}

.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}

.table thead th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #000;
  text-transform: uppercase;
  font-weight: bold;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
  transition: background-color 0.2s ease;
}

.table td,
.table th {
  border-right: 1px solid #ddd;
}

.table td:last-child,
.table th:last-child {
  border-right: none;
}

/* Popup style */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 600px;
}

.popup-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}
</style>
