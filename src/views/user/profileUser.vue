<template>
  <div class="container mt-2">
    <div class="card shadow rounded" style="font-size: 89%; max-width: 700px; margin: auto;">
      <div class="card-header text-center bg-primary text-white py-0">
        <h3 class="mb-0">Profil Pengguna</h3>
        <hr />
      </div>

      <div class="card-body" v-if="user && Object.keys(user).length">
        <div class="mb-1 row" v-for="(label, key) in fieldLabels" :key="key">
          <label class="col-sm-4 col-form-label fw-bold">{{ label }}</label>
          
          <div class="col-sm-8">
            <template v-if="isEditing">
              <input
                :value="editUser[key] || ''"
                @input="editUser[key] = $event.target.value"
                class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ key === 'tanggalLahir' ? formatDate(user[key]) : user[key] || '-' }}
            </template>
          </div>

          <hr class="mt-2 mb-2" />
        </div>

        <div class="text-center mt-4">
          <button v-if="!isEditing" class="btn btn-warning" @click="startEdit">
            Edit Profile
          </button>
          <div v-else>
            <button class="btn btn-success me-2" @click="saveChanges">Simpan</button>
            <button class="btn btn-secondary" @click="cancelEdit">Batal</button>
          </div>
        </div>
      </div>

      <div class="card-body text-center" v-else>
        <div class="spinner-border text-secondary mb-2" role="status"></div>
        <p>Memuat data pengguna...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const userStore = useAuthStore();
    const user = ref({});
    const isEditing = ref(false);
    const editUser = ref({});

    const fieldLabels = {
      nik: 'NIK',
      nama: 'Nama',
      jenisKelamin: 'Jenis Kelamin',
      tanggalLahir: 'Tanggal Lahir',
      email: 'E-mail',
      alamat: 'Alamat',
      pendidikan: 'Pendidikan',
      pekerjaan: 'Pekerjaan',
      agama: 'Agama',
      perkawinan: 'Status Perkawinan',
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/me', {
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        user.value = response.data;
      } catch (error) {
        console.error('❌ Gagal memuat data user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal memuat data user',
          text: 'Terjadi kesalahan saat mengambil data.',
        });
      }
    };

    const formatDate = (date) => {
      if (!date) return '-';
      const d = new Date(date);
      return isNaN(d)
        ? 'Invalid Date'
        : d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
    };

    const startEdit = () => {
      isEditing.value = true;
      editUser.value = { ...user.value };
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editUser.value = {};
    };

    const saveChanges = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/user/${this.value.userid}`,
          editUser.value,
          {
            headers: { Authorization: `Bearer ${userStore.token}` },
          }
        );
        user.value = response.data;
        isEditing.value = false;

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Perubahan berhasil disimpan.',
        });
      } catch (error) {
        console.error('❌ Gagal menyimpan data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal menyimpan data',
          text: 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.',
        });
      }
    };

    onMounted(fetchUserProfile);

    return {
      user,
      editUser,
      isEditing,
      fieldLabels,
      formatDate,
      startEdit,
      cancelEdit,
      saveChanges,
    };
  },
});
</script>
