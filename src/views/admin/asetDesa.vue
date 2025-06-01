<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import formAset from "@/views/admin/formAset.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'; // <--- Tambahkan ini

const asets = ref([]);
const isLoading = ref(false);
const showForm = ref(false);
const searchQuery = ref("");
const filterStatus = ref("");
const selectedAset = reactive({
  nama: "",
  tanggalBeli: "",
  harga: "",
  statusAset: "",
  keterangan: "",
});
const isEdit = ref(false);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 10;

async function fetchAsets() {
  isLoading.value = true;
  const authStore = useAuthStore();

  if (!authStore.token) {
    await Swal.fire("Error", "Token kosong! Pastikan pengguna sudah login.", "error");
    isLoading.value = false;
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/api/aset", {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });

    asets.value = response.data.map(aset => ({
      ...aset,
      tanggalBeli: new Date(aset.tanggalBeli).toLocaleDateString("id-ID"),
    }));
  } catch (error) {
    console.error("Error fetching asets:", error);
    await Swal.fire("Gagal", "Gagal mengambil data aset.", "error");
  } finally {
    isLoading.value = false;
  }
}

const filteredAsets = computed(() => {
  return asets.value.filter(aset => {
    return (
      aset.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterStatus.value === "" || ["ADA", "HILANG", "RUSAK"].includes(aset.statusAset) && aset.statusAset === filterStatus.value)
    );
  });
});

// Pagination computed
const totalPages = computed(() => Math.ceil(filteredAsets.value.length / itemsPerPage));
const paginatedAsets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredAsets.value.slice(start, start + itemsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function showAddForm() {
  Object.assign(selectedAset, { nama: "", tanggalBeli: "", harga: "", statusAset: "", keterangan: "" });
  isEdit.value = false;
  showForm.value = true;
}

function editAset(aset) {
  Object.assign(selectedAset, aset);
  isEdit.value = true;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  isEdit.value = false;
  Object.assign(selectedAset, { nama: "", tanggalBeli: "", harga: "", statusAset: "", keterangan: "" });
}

async function confirmDeleteAset(aset) {
  const result = await Swal.fire({
    title: `Hapus Aset "${aset.nama}"?`,
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (result.isConfirmed) {
    await deleteAset(aset.asetid);
  }
}

async function deleteAset(asetid) {
  const authStore = useAuthStore();

  if (!authStore.token) {
    await Swal.fire("Error", "Token kosong! Tidak dapat melakukan permintaan API.", "error");
    return;
  }

  isLoading.value = true;
  try {
    await axios.delete(`http://localhost:3000/api/aset/${asetid}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    asets.value = asets.value.filter(aset => aset.asetid !== asetid);
    await Swal.fire("Berhasil", "Aset berhasil dihapus.", "success");
  } catch (error) {
    console.error("Error deleting aset:", error);
    await Swal.fire("Gagal", "Gagal menghapus aset.", "error");
  } finally {
    isLoading.value = false;
  }
}

function exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(asets.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Aset");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "data_aset.xlsx");
}

onMounted(fetchAsets);
</script>


<template>
  <div class="master-data-container">
    <div class="card shadow-sm rounded-lg">
      <div class="card-header text-white p-4 d-flex justify-content-between align-items-center">
        <h2 class="text-xl font-weight-bold mb-0">Data Aset </h2>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari berdasarkan nama..."
          class="search-input"
        />
        <select v-model="filterStatus" class="search-input">
          <option value="">Semua Status</option>
          <option value="ADA">ADA</option>
          <option value="HILANG">HILANG</option>
          <option value="RUSAK">RUSAK</option>
        </select>
        <div>
          <button @click="showAddForm" class="btn btn-light me-2 d-flex align-items-center">
            <i class="bi bi-clipboard2-plus me-2"></i> Tambah Aset
          </button>
          <button @click="exportToExcel" class="btn btn-success d-flex align-items-center">
            <i class="bi bi-file-earmark-excel me-2"></i> Ekspor ke Excel
          </button>
        </div>
      </div>
      <div class="card-body p-0">
        <div v-if="isLoading" class="text-center py-4"><span>Loading...</span></div>
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0 text-center">
            <thead class="bg-light">
              <tr>
                <th>Nama</th>
                <th>Tanggal Beli</th>
                <th>Harga</th>
                <th>Status Aset</th>
                <th>Keterangan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="aset in paginatedAsets" :key="aset.asetid">
                <td>{{ aset.nama }}</td>
                <td>{{ aset.tanggalBeli }}</td>
                <td>{{ aset.harga }}</td>
                <td class="text-primary">{{ aset.statusAset }}</td>
                <td>{{ aset.keterangan }}</td>
                <td>
                  <button @click="editAset(aset)" class="btn btn-outline-warning btn-sm me-2">
                    <i class="bi bi-pencil-square"></i> Edit
                  </button>
                  <button @click="confirmDeleteAset(aset)" class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-trash3"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination mt-3 d-flex justify-content-center">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary me-2">
              Previous
            </button>
            <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary ms-2">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalApp v-model:visible="showForm">
      <formAset
        :user="selectedAset"
        :item="selectedAset"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </ModalApp>
  </div>
</template>

<style scoped>
.table tbody tr {
  border-bottom: 1px solid #dee2e6;
}

.table thead th {
  border-bottom: 2px solid #dee2e6;
}

.table td, .table th {
  padding: 12px;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
}
.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}
</style>
