<script setup>
import { ref, reactive, onMounted } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import formAset from "@/views/admin/formAset.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const asets = ref([]);
const isLoading = ref(false);
const showForm = ref(false);
const selectedAset = reactive({
  nama: "",
  tanggalBeli: "",
  harga: "",
  statusAset: "",
  keterangan: "",
});
const isEdit = ref(false);

async function fetchAsets() {
  isLoading.value = true;
  const authStore = useAuthStore();
  
  if (!authStore.token) {
    console.error("Token kosong! Pastikan pengguna sudah login.");
    isLoading.value = false;
    return;
  }
  
  try {
    const response = await axios.get("http://localhost:3000/api/aset", {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    
    console.log("Data dari API:", response.data);
    asets.value = response.data.map(aset => ({
      ...aset,
      tanggalBeli: new Date(aset.tanggalBeli).toLocaleDateString("id-ID"),
    }));
  } catch (error) {
    console.error("Error fetching asets:", error);
  } finally {
    isLoading.value = false;
  }
}

async function handleSubmit(aset) {
  const authStore = useAuthStore();
  isLoading.value = true;

  try {
    if (isEdit.value) {
      await axios.patch(`http://localhost:3000/api/aset/${aset.asetid}`, aset, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    } else {
      await axios.post("http://localhost:3000/api/aset", aset, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    }
    await fetchAsets();
    alert(isEdit.value ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!");
  } catch (error) {
    console.error("Error saving aset:", error);
  } finally {
    isLoading.value = false;
    closeForm();
  }
}

function deleteAset(asetid) {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("Token kosong! Tidak dapat melakukan permintaan API.");
    return;
  }
  isLoading.value = true;
  axios.delete(`http://localhost:3000/api/aset/${asetid}`, {
    headers: { Authorization: `Bearer ${authStore.token}` },
  })
  .then(() => {
    asets.value = asets.value.filter(aset => aset.asetid !== asetid);
    alert("Aset berhasil dihapus.");
  })
  .catch(error => {
    console.error("Error deleting aset:", error);
  })
  .finally(() => {
    isLoading.value = false;
  });
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

function confirmDeleteAset(aset) {
  if (window.confirm(`Apakah Anda yakin ingin menghapus aset "${aset.nama}"?`)) {
    deleteAset(aset.asetid);
  }
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
          placeholder="Cari ..."
          class="search-input"
        />
        <button @click="showAddForm" class="btn btn-light d-flex align-items-center">
          <i class="bi bi-clipboard2-plus me-2"></i> Tambah Aset
        </button>
      </div>
      <div class="card-body p-0">
        <div v-if="isLoading" class="text-center py-4"><span>Loading...</span></div>
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-light">
              <tr>
                <th>Nama</th>
                <th>Tanggal Beli</th>
                <th>Harga</th>
                <th>Status Aset</th>
                <th>Keterangan</th>
                <th class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="aset in asets" :key="aset.asetid">
                <td>{{ aset.nama }}</td>
                <td>{{ aset.tanggalBeli }}</td>
                <td>{{ aset.harga }}</td>
                <td class="text-primary">{{ aset.statusAset }}</td>
                <td>{{ aset.keterangan }}</td>
                <td class="text-center">
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
        </div>
      </div>
    </div>
    <ModalApp v-model="showForm">
      <formAset :user="selectedAset" :isEdit="isEdit" @submit="handleSubmit" @cancel="closeForm" />
    </ModalApp>
  </div>
</template>

<style scoped>
/* Menambahkan garis batas antar baris pada tabel */
.table tbody tr {
  border-bottom: 1px solid #dee2e6;
}

/* Mengatur ketebalan dan warna garis untuk lebih jelas */
.table thead th {
  border-bottom: 2px solid #dee2e6;
}

/* Opsional: Memberikan padding agar data tidak terlalu rapat */
.table td, .table th {
  padding: 12px;
}

/* Menyoroti baris saat di-hover */
.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
}
.master-data-container {
  background-color: #f4f6f9;
  padding: 20px;
}

.card {
  border: none;
  overflow: hidden;
}

.table-hover tbody tr:hover {
  background-color: rgba(74, 144, 226, 0.05);
  transition: background-color 0.2s ease;
}

.badge {
  font-size: 0.8em;
  padding: 0.4em 0.6em;
}

.badge.bg-warning {
  background-color: #ffc107 !important;
}

.btn-group .btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .table-responsive {
    font-size: 0.9em;
  }

  .btn-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-group .btn {
    width: 100%;
  }
}
/* Mengurangi ukuran font dan padding pada tabel */
.table {
  font-size: 0.85rem; /* Mengecilkan ukuran font */
  white-space: nowrap; /* Mencegah teks turun ke baris berikutnya */
}

.table th, .table td {
  padding: 8px; /* Mengurangi padding agar lebih ringkas */
}

/* Memastikan tabel bisa di-scroll jika lebarnya melebihi layar */
.table-responsive {
  overflow-x: auto;
}

/* Menyembunyikan beberapa kolom pada layar kecil agar tabel tetap rapi */
@media (max-width: 768px) {
  .table th:nth-child(5),
  .table td:nth-child(5),
  .table th:nth-child(6),
  .table td:nth-child(6),
  .table th:nth-child(7),
  .table td:nth-child(7) {
    display: none; /* Sembunyikan kolom tertentu di layar kecil */
  }
}
.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

</style>
