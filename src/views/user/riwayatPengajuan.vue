<template>
  <div class="history-container">
    <div class="card modern-card">
      <div class="card-header">
        <h2 class="card-title">Riwayat Pengajuan </h2>
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
              <th>Status</th>
              <th>Lampiran</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pengajuan in spk" :key="pengajuan.pengajuanid">
              <td>
                <span class="text-muted">#{{ pengajuan.pengajuanid }}</span>
              </td>
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
              <td>
                <span class="badge" :class="getStatusClass(pengajuan.statusPengajuan)">
                  {{ pengajuan.statusPengajuan }}
                </span>
              </td>
              <td>
                <button
                  v-if="pengajuan.lampiran"
                  class="btn btn-sm btn-success"
                  @click="previewLampiran(`http://localhost:3000/uploads/${pengajuan.lampiran}`)"
                >
                  Lihat Lampiran
                </button>
                <span v-else class="text-muted">-</span>
              </td>
              <td>{{ pengajuan.catatan }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <ModalApp v-model:visible="showForm">
      <FormSpk
        :visible="showForm"
        :item="selectedSpk"
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
import FormSpk from "@/views/wh_operator/FormSpk.vue";

export default {
  name: "RiwayatSPK",
  components: {
    ModalApp,
    FormSpk,
  },
  data() {
    return {
      spk: [], // Data pengajuan
      showForm: false,
      selectedSpk: null,
    };
  },
  methods: {
    async fetchPengajuan() {
      const authStore = useAuthStore();
      if (!authStore.token) {
        console.error("Token kosong! Tidak dapat melakukan permintaan API.");
        return;
      }

      console.log("Token dari authStore:", authStore.token); // Tambahkan logging ini
      console.log("NIK dari authStore:", authStore.nik); // Tambahkan logging ini

      try {
        const response = await axios.get(
          "http://localhost:3000/api/pengajuan/by-nik",
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );

        console.log("Response dari API:", response); // Tambahkan logging ini
        console.log("Data dari API:", response.data); // Tambahkan logging ini

        // Proses data pengajuan
        this.spk = response.data.map((item) => ({
          pengajuanid: item.pengajuanid,
          nik: item.nik,
          nama: item.nama,
          alamat: item.alamat,
          noHp: item.noHp,
          ktp: item.ktp,
          kk: item.kk,
          lampiran: item.lampiran,
          keperluan: item.keperluan,
          statusPengajuan: item.statusPengajuan,
          catatan: item.catatan
        }));

        console.log("Data pengajuan setelah diproses:", this.spk); // Tambahkan logging ini

      } catch (error) {
        console.error("Error fetching Pengajuan:", error);
        console.error("Detail error:", error.response); // Tambahkan logging ini
      }
    },

    async handleSubmit(updatedData) {
      const authStore = useAuthStore();
      if (!authStore.token) {
        console.error("Token kosong! Tidak dapat melakukan permintaan API.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/pengajuan",
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );

        console.log("Pengajuan berhasil diperbarui:", response.data);
        this.fetchPengajuan(); // Refresh data
        this.closeForm();
      } catch (error) {
        console.error("Error updating Pengajuan:", error);
      }
    },

    openModal(pengajuan) {
      // Menampilkan modal dengan data yang dipilih
      this.selectedSpk = pengajuan;
      this.showForm = true;
    },

    previewLampiran(fileUrl) {
      window.open(fileUrl, "_blank");
    },
    closeForm() {
      // Menutup modal dan reset data
      this.showForm = false;
      this.selectedSpk = null;
    },

    getStatusClass(statusPengajuan) {
      switch (statusPengajuan) {
        case "SELESAI":
          return "badge-success";
        case "PENGIRIMAN":
          return "badge-warning";
        case "TOLAK":
          return "badge-danger";
        default:
          return "badge-default";
      }
    },
  },
  mounted() {
    this.fetchPengajuan(); // Panggil fetchPengajuan saat komponen dimuat
  },
};
</script>

<style scoped>
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
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}
</style>