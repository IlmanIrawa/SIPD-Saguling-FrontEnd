<template>
  <ModalApp :visible="localVisible" @update:visible="updateVisible">
    <div class="form-container">
      <h3 class="form-title">Pengajuan Masuk</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>NIK</label>
          <input type="number" v-model="formItem.nik" readonly class="form-control" />
        </div>
        <div class="form-group">
          <label>Nama</label>
          <input type="text" v-model="formItem.nama" readonly class="form-control" />
        </div>
        <div class="form-group">
          <label>Alamat</label>
          <input type="text" v-model="formItem.alamat" readonly class="form-control" />
        </div>
        <div class="form-group">
          <label>Handphone</label>
          <input type="text" v-model="formItem.noHp" readonly class="form-control" />
        </div>
        <div class="form-group">
          <label>Keperluan</label>
          <input type="text" v-model="formItem.keperluan" readonly class="form-control" />
        </div>

        <div class="form-group">
          <label>Kartu Tanda Penduduk</label>
          <div class="image-container">
            <img :src="`http://localhost:3000/uploads/${formItem.ktp}`" alt="KTP" class="image-preview" />
            <span class="eye-icon" @click="openPreview(`http://localhost:3000/uploads/${formItem.ktp}`)">👁️</span>
          </div>
        </div>

        <div class="form-group">
          <label>Kartu Keluarga</label>
          <div class="image-container">
            <img :src="`http://localhost:3000/uploads/${formItem.kk}`" alt="KK" class="image-preview" />
            <span class="eye-icon" @click="openPreview(`http://localhost:3000/uploads/${formItem.kk}`)">👁️</span>
          </div>
        </div>

        <div class="form-group">
          <label>Dokumen Penunjang</label>
          <br />
          <button type="button" class="btn btn-primary" @click="previewDokumen" v-if="formItem.lampiran">Preview PDF</button>
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
          <input type="text" v-model="formItem.catatan" class="form-control" />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-success">Simpan</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">Batal</button>
        </div>
      </form>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="preview-modal" @click.self="showPreview = false">
      <div class="preview-content">
        <span class="close-btn" @click="showPreview = false">&times;</span>
        <img :src="previewImageUrl" alt="Preview" class="preview-full" />
      </div>
    </div>
  </ModalApp>
</template>

<script>
import { ref, watch } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";

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

    const showPreview = ref(false);
    const previewImageUrl = ref("");

    const openPreview = (url) => {
      previewImageUrl.value = url;
      showPreview.value = true;
    };

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

    const updateVisible = (value) => {
      emit("update:visible", value);
    };

    const closeModal = () => {
      emit("update:visible", false);
    };

    const previewDokumen = () => {
      const dokumenUrl = `http://localhost:3000/uploads/${formItem.value.lampiran}`;
      window.open(dokumenUrl, "_blank");
    };

    const submitForm = async () => {
      const authStore = useAuthStore();
      try {
        await axios.patch(
          `http://localhost:3000/api/pengajuan/${formItem.value.pengajuanid}`,
          { statusPengajuan: formItem.value.statusPengajuan },
          { headers: { Authorization: `Bearer ${authStore.token}` } }
        );
        emit("updateStatus", formItem.value);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Status pengajuan berhasil diperbarui!",
        });
        closeModal();
      } catch (error) {
        console.error("Gagal memperbarui status pengajuan:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text:
            error.response?.data?.message ||
            "Gagal memperbarui status pengajuan. Silakan coba lagi!",
        });
      }
    };

    return {
      localVisible,
      formItem,
      updateVisible,
      closeModal,
      submitForm,
      showPreview,
      previewImageUrl,
      previewDokumen,
      openPreview,
    };
  },
};
</script>


<style scoped>
form {
  margin-top: 600px; /* Jarak antara form dan header */
}
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
  text-align: left;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.form-control:read-only {
  background-color: #f0f0f0;
}

.image-preview {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 8px;
}

.image-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.eye-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: white;
  border-radius: 4px;
  padding: 2px 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  user-select: none;
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.preview-content {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.preview-full {
  max-width: 100%;
  max-height: 80vh;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
