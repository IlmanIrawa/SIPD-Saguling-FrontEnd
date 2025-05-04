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
        console.log("item dari props:", newItem); // DEBUG
        if (newItem && newItem.sosialid && this.isEdit) {
          // Set form hanya jika dalam mode edit dan item valid
          this.form = { ...newItem };
        } else {
          this.resetForm(); // Reset form jika dalam mode tambah
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
        alert("Token tidak valid, silakan login kembali!");
        return;
      }

      if (this.isEdit) {
        if (!this.form.sosialid || isNaN(parseInt(this.form.sosialid))) {
          alert("ID sosial tidak valid.");
          return;
        }
      }

      console.log("Submit form dengan data:", this.form);

      try {
        if (this.isEdit) {
          await axios.put(
            `http://localhost:3000/api/sosial/${this.form.sosialid}`,
            this.form,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          alert("Data sosial berhasil diedit!");
        } else {
          await axios.post("http://localhost:3000/api/sosial", this.form, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Data sosial berhasil ditambahkan!");
        }
        // Emit submit dan reset form hanya setelah berhasil submit
        this.$emit("submit", this.form);
        this.resetForm(); // Reset form setelah data berhasil disubmit
      } catch (error) {
        console.error("Gagal menyimpan data:", error);
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
