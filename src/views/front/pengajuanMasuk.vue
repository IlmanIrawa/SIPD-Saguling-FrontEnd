<template>
  <div class="history-container">
    <div class="card modern-card">
      <div class="card-header">
        <h2 class="card-title">Pengajuan Administrasi Masuk</h2>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari ..."
          class="search-input"
        />
      </div>
      <div class="table-responsive" id="print-section">
        <table class="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NIK</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Handphone</th>
              <th>KTP</th>
              <th>KK</th>
              <th>Keperluan</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pengajuan in paginatedPengajuan" :key="pengajuan.pengajuanid">
              <td>#{{ pengajuan.pengajuanid }}</td>
              <td>{{ pengajuan.nik }}</td>
              <td>{{ pengajuan.nama }}</td>
              <td>{{ pengajuan.alamat }}</td>
              <td>{{ pengajuan.noHp }}</td>
              <td>
                <img :src="`http://localhost:3000/uploads/${pengajuan.ktp}`" alt="KTP" width="50" height="50" />
              </td>
              <td>
                <img :src="`http://localhost:3000/uploads/${pengajuan.kk}`" alt="KK" width="50" height="50" />
              </td>
              <td>{{ pengajuan.keperluan }}</td>
              <td>{{ formatTanggal(pengajuan.tanggalPengajuan) }}</td>
              <td>
                <span class="badge" :class="getStatusClass(pengajuan.statusPengajuan)">
                  {{ pengajuan.statusPengajuan }}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-info"
                  @click="openModal(pengajuan)"
                  :disabled="pengajuan.statusPengajuan === 'SELESAI'"
                >
                  Terima
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

    <ModalApp :visible="showForm" @update:visible="showForm = $event">
      <formAccPengajuan
        :visible="showForm"
        :item="selectedPengajuan"
        @update:visible="showForm = $event"
        @updateStatus="handleSubmit"
        @close="closeForm"
      />
    </ModalApp>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import ModalApp from "@/views/ModalApp.vue";
import formAccPengajuan from "@/views/front/formAccPengajuan.vue";

export default {
  components: { ModalApp, formAccPengajuan },
  data() {
    return {
      pengajuan: [],
      showForm: false,
      selectedPengajuan: null,
      searchQuery: "",
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    filteredPengajuan() {
      return this.pengajuan.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
    paginatedPengajuan() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredPengajuan.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.filteredPengajuan.length / this.perPage);
    },
  },
  methods: {
    async fetchPengajuan() {
      const authStore = useAuthStore();
      if (!authStore.token) return;
      try {
        const { data } = await axios.get("http://localhost:3000/api/pengajuan", {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.pengajuan = data;
      } catch (error) {
        console.error("Error fetching Pengajuan:", error);
      }
    },
    formatTanggal(tanggal) {
      return tanggal ? new Date(tanggal).toISOString().split("T")[0] : "";
    },
    openModal(pengajuan) {
      this.selectedPengajuan = pengajuan;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.selectedPengajuan = null;
    },
    getStatusClass(status) {
      return {
        SELESAI: "badge-success",
        PENGIRIMAN: "badge-warning",
        ON_PROCESS: "badge-danger",
      }[status] || "badge-default";
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  mounted() {
    this.fetchPengajuan();
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.pagination button {
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
}
/* CSS Lengkap */
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
  margin-bottom: 0;
  font-weight: 600;
  color: #333;
  font-size: 1.25rem;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.modern-table thead {
  background-color: #f1f3f5;
}

.modern-table thead th {
  padding: 15px;
  text-align: left;
  color: #495057;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #dee2e6;
}

.modern-table tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.modern-table tbody td {
  padding: 15px;
  vertical-align: middle;
  border-bottom: 1px solid #e9ecef;
}

.btn {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn-sm {
  font-size: 0.8rem;
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
}

.btn-success:disabled {
  background-color: #c3e6cb;
  color: #6c757d;
}

.badge {
  padding: 0.4em 0.7em;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.badge-success {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.badge-warning {
  background-color: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.badge-danger {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}
.badge {
  padding: 0.4em 0.7em;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.badge-success {
  background-color: #28a745; /* Hijau */
  color: white;
}

.badge-warning {
  background-color: #ffc107; /* Kuning */
  color: black;
}

.badge-danger {
  background-color: #dc3545; /* Merah */
  color: white;
}

.badge-default {
  background-color: #6c757d; /* Abu-abu untuk status yang tidak dikenal */
  color: white;
}
.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
}
</style>
