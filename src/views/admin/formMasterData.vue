<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>{{ formTitle }}</h2>
      <hr>
      <table>
        <tbody>
          <tr>
            <td>Id</td>
            <td>
              <input
                type="number"
                v-model="form.userid"
                id="userid"
                :disabled="isEdit"
                required
              />
            </td>
          </tr>
          <tr>
            <td>NIK</td>
            <td>
              <input type="number" v-model="form.nik" id="nik" required />
            </td>
          </tr>
          <tr>
            <td>Nama</td>
            <td>
              <input type="text" v-model="form.nama" id="nama" required />
            </td>
          </tr>
          <tr>
            <td>Jenis Kelamin</td>
            <td>
              <input type="text" v-model="form.jenisKelamin" id="jenisKelamin" required />
            </td>
          </tr>
          <tr>
            <td>Tanggal Lahir</td>
            <td>
              <input type="text" v-model="form.tanggalLahir" id="tanggalLahir" required />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input type="email" v-model="form.email" id="email" required />
            </td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>
              <input type="text" v-model="form.alamat" id="alamat" required />
            </td>
          </tr>
          <tr>
            <td>Pendidikan</td>
            <td>
              <input type="text" v-model="form.pendidikan" id="pendidikan" required />
            </td>
          </tr>
          <tr>
            <td>Pekerjaan</td>
            <td>
              <input type="text" v-model="form.pekerjaan" id="pekerjaan" required />
            </td>
          </tr>
          <tr>
            <td>Agama</td>
            <td>
              <input type="text" v-model="form.agama" id="agama" required />
            </td>
          </tr>
          <tr>
            <td>Status Perkawinan</td>
            <td>
              <input type="text" v-model="form.perkawinan" id="perkawinan" required />
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <select v-model="form.statusHidup" id="status" required>
                <option value="HIDUP">Hidup</option>
                <option value="MENINGGAL">Meninggal Dunia</option>
              </select>
            </td>
          </tr>
          <tr v-if="!isEdit">
            <td>Password</td>
            <td>
              <input type="password" v-model="form.password" id="password" required />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div class="button-group">
                <button type="submit">
                  {{ isEdit ? "Simpan Perubahan" : "Tambah User" }}
                </button>
                <button type="button" class="cancel" @click="$emit('cancel')">
                  Batal
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export default {
  name: "ItemForm",
  props: {
    item: {
      type: Object,
      default: () => ({
        userid: null,
        nik: "",
        nama: "",
        jenisKelamin: "",
        tanggalLahir: "",
        email: "",
        alamat: "",
        pendidikan: "",
        pekerjaan: "",
        agama: "",
        perkawinan: "",
        statusHidup: "HIDUP",
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        userid: null,
        nik: "",
        nama: "",
        jenisKelamin: "",
        tanggalLahir: "",
        email: "",
        alamat: "",
        pendidikan: "",
        pekerjaan: "",
        agama: "",
        perkawinan: "",
        statusHidup: "HIDUP",
        password: "", 
      },
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem && newItem.userid) {
          this.form = { ...newItem };
          delete this.form.password; // Hapus password saat edit agar tidak dikirim
        } else {
          this.resetForm();
        }
      },
    },
  },
  computed: {
    formTitle() {
      return this.isEdit ? "Edit User" : "Tambah User";
    },
  },
  methods: {
    resetForm() {
      this.form = {
        userid: null,
        nik: "",
        nama: "",
        jenisKelamin: "",
        tanggalLahir: "",
        email: "",
        alamat: "",
        pendidikan: "",
        pekerjaan: "",
        agama: "",
        perkawinan: "",
        statusHidup: "HIDUP",
        password: "", 
      };
    },
    async submitForm() {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        alert("Token tidak valid, silakan login kembali!");
        return;
      }

      try {
        if (this.isEdit) {
          const updateData = { ...this.form };
          delete updateData.password; 

          await axios.patch(
            `http://localhost:3000/api/user/${this.form.userid}`,
            updateData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Data berhasil diperbarui!");
        } else {
          await axios.post("http://localhost:3000/api/user", this.form, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Data berhasil ditambahkan!");
        }

        this.$emit("submit", this.form);
        this.resetForm();
      } catch (error) {
        console.error("Gagal menyimpan data:", error);
        alert(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi!");
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 400px; /* Jarak antara form dan header */
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

</style>
