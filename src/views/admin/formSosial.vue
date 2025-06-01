<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>{{ formTitle }}</h2>
      <hr />
      <table>
        <tbody>
          <tr v-if="isEdit">
            <td>Sosial ID:</td>
            <td>
              <input
                type="number"
                v-model="form.sosialid"
                class="form-control"
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
            <td>Alamat</td>
            <td>
              <input type="text" v-model="form.alamat" id="alamat" required />
            </td>
          </tr>
          <tr>
            <td>Jenis Bantuan</td>
            <td>
              <input
                type="text"
                v-model="form.jenisBantuan"
                id="jenisBantuan"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <select
                v-model="form.usulSanggah"
                id="usulSanggah"
                required
                class="form-select"
              >
                <option value="LAYAK">LAYAK</option>
                <option value="TIDAK_LAYAK">TIDAK LAYAK</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div class="button-group">
                <button type="submit">
                  {{ isEdit ? "Simpan Perubahan" : "Tambah Data" }}
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
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/authStore";

export default {
  name: "SosialForm",
  props: {
    item: {
      type: Object,
      default: () => ({
        sosialid: null,
        nik: null,
        nama: "",
        alamat: "",
        jenisBantuan: "",
        usulSanggah: "LAYAK",
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
        sosialid: null,
        nik: null,
        nama: "",
        alamat: "",
        jenisBantuan: "",
        usulSanggah: "LAYAK",
      },
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem && newItem.sosialid && this.isEdit) {
          this.form = { ...newItem };
        } else {
          this.resetForm();
        }
      },
    },
  },
  computed: {
    formTitle() {
      return this.isEdit ? "Edit Data Sosial" : "Tambah Data Sosial";
    },
  },
  methods: {
    resetForm() {
      this.form = {
        sosialid: null,
        nik: null,
        nama: "",
        alamat: "",
        jenisBantuan: "",
        usulSanggah: "LAYAK",
      };
    },
    async submitForm() {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Token tidak valid",
          text: "Silakan login kembali!",
        });
        return;
      }

      if (this.isEdit) {
        if (!this.form.sosialid || isNaN(parseInt(this.form.sosialid))) {
          Swal.fire({
            icon: "error",
            title: "ID tidak valid",
            text: "ID sosial tidak valid.",
          });
          return;
        }
      }

      try {
        if (this.isEdit) {
          await axios.put(
            `http://localhost:3000/api/sosial/${this.form.sosialid}`,
            this.form,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data sosial berhasil diedit!",
          });
        } else {
          await axios.post("http://localhost:3000/api/sosial", this.form, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data sosial berhasil ditambahkan!",
          });
        }

        this.$emit("submit", this.form);
        this.resetForm();
      } catch (error) {
        console.error("Gagal menyimpan data:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menyimpan data.",
        });
      }
    },
  },
};
</script>


<style scoped>
form {
  margin-top: 20px;
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

.form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
