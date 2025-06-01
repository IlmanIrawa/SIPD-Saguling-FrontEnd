<template>
  <ModalApp :visible="localVisible" @update:visible="updateVisible">
    <div class="form-container">
      <h3 class="form-title">Proses Pengajuan</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>NIK</label>
          <input
            type="number"
            v-model="formItem.nik"
            readonly
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Nama</label>
          <input
            type="text"
            v-model="formItem.nama"
            readonly
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Alamat</label>
          <input
            type="text"
            v-model="formItem.alamat"
            readonly
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Handphone</label>
          <input
            type="text"
            v-model="formItem.noHp"
            readonly
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Keperluan</label>
          <input
            type="text"
            v-model="formItem.keperluan"
            readonly
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Kartu Tanda Penduduk</label>
          <br />
          <img
            :src="`http://localhost:3000/uploads/${formItem.ktp}`"
            alt="KTP"
            class="image-preview"
          />
        </div>
        <br />
        <div class="form-group">
          <label>Kartu Keluarga</label>
          <br />
          <img
            :src="`http://localhost:3000/uploads/${formItem.kk}`"
            alt="KK"
            class="image-preview"
          />
        </div>
        <div class="form-group">
          <label>Dokumen Penunjang</label>
          <br />
          <button
            type="button"
            class="btn btn-primary"
            @click="previewDokumen"
            v-if="formItem.lampiran"
          >
            Preview PDF
          </button>
          <span v-else class="text-muted">Tidak ada dokumen</span>
        </div>

        <div class="form-group">
          <label>Status Pengajuan</label>
          <select v-model="formItem.statusPengajuan" class="form-control">
            <option value="TOLAK">Tolak</option>
            <option value="PENDING">Pending</option>
            <option value="ON_PROCESS">On Proses</option>
            <option value="MENUNGGU_TTD">Proses Tanda Tangan Kades</option>
            <option value="SELESAI">Selesai</option>
          </select>
        </div>
        <div class="form-group">
          <label>Catatan</label>
          <input
            type="Text"
            v-model="formItem.catatan"
            class="form-control"
          />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-success">Simpan</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Batal
          </button>
        </div>
      </form>
    </div>
  </ModalApp>
</template>

<script>
import { ref, watch } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export default {
  components: { ModalApp },
  props: {
    visible: Boolean,
    item: Object,
  },
  emits: ["update:visible", "updateStatus", "close"],
  setup(props, { emit }) {
    const localVisible = ref(props.visible);
    const formItem = ref({ ...props.item });

    // Pantau perubahan props agar modal selalu mendapatkan data terbaru
    watch(
      () => props.visible,
      (newVal) => {
        localVisible.value = newVal;
      }
    );

    watch(
      () => props.item,
      (newVal) => {
        formItem.value = { ...newVal };
      }
    );

    const previewDokumen = () => {
    const dokumenUrl = `http://localhost:3000/uploads/${formItem.value.lampiran}`;
  window.open(dokumenUrl, "_blank");
};


    const updateVisible = (value) => {
      emit("update:visible", value);
    };

    const closeModal = () => {
      emit("update:visible", false);
    };

    const submitForm = async () => {
      const authStore = useAuthStore();

      console.log("Data yang dikirim:", formItem.value); // Cek apakah data benar

      try {
        const response = await axios.patch(
          `http://localhost:3000/api/pengajuan/${formItem.value.pengajuanid}`,
          { statusPengajuan: formItem.value.statusPengajuan },
          { headers: { Authorization: `Bearer ${authStore.token}` } }
        );

        console.log("Response dari server:", response.data);

        // Pastikan perubahan diteruskan ke parent agar tampilan diperbarui
        emit("updateStatus", formItem.value);
        closeModal();
      } catch (error) {
        console.error("Gagal memperbarui status pengajuan:", error);
      }
    };

    return { localVisible, formItem, updateVisible, closeModal, submitForm , previewDokumen};
  },
};
</script>

<style scoped>
form {
  margin-top: 500px; /* Jarak antara form dan header */
}

table {
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
}

td {
  padding: 10px;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:disabled {
  background-color: #f5f5f5;
}

button {
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 10px;
}

button:hover {
  background-color: #4338ca;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.cancel {
  background-color: #dc2626;
}

.cancel:hover {
  background-color: #b91c1c;
}
.btn-primary {
  background-color: #2563eb;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

</style>
