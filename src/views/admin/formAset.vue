<template>
    <div>
      <form @submit.prevent="submitForm">
        <h2>{{ formTitle }}</h2>
        <hr>
        <table>
          <tbody>
            <tr>
              <td>Nama</td>
              <td><input type="text" v-model="form.nama" id="nama" required /></td>
            </tr>
            <tr>
              <td>Tanggal Beli</td>
              <td><input type="text" v-model="form.tanggalBeli" id="tanggalBeli" required /></td>
            </tr>
            <tr>
              <td>Harga</td>
              <td><input type="number" v-model="form.harga" id="harga" required /></td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <select v-model="form.statusAset" id="statusAset" required>
                  <option value="ADA">ADA</option>
                  <option value="HILANG">HILANG</option>
                  <option value="RUSAK">RUSAK</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td><input type="text" v-model="form.keterangan" id="keterangan" required /></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div class="button-group">
                  <button type="submit">
                    {{ isEdit ? "Simpan Perubahan" : "Tambah Aset" }}
                  </button>
                  <button type="button" class="cancel" @click="$emit('cancel')">Batal</button>
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
        asetid: null, 
        nama: "",
        tanggalBeli: "",
        harga: "",
        statusAset: "",
        keterangan: "",
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
        asetid: null,
        nama: "",
        tanggalBeli: "",
        harga: "",
        statusAset: "",
        keterangan: "",
      },
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem && newItem.asetid) {
          this.form = { ...newItem };
        } else {
          this.resetForm();
        }
      },
    },
  },
  computed: {
    formTitle() {
      return this.isEdit ? "Edit Aset" : "Tambah Aset";
    },
  },
  methods: {
    resetForm() {
      this.form = {
        asetid: null,
        nama: "",
        tanggalBeli: "",
        harga: "",
        statusAset: "",
        keterangan: "",
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
          await axios.patch(
            `http://localhost:3000/api/aset/${this.form.asetid}`,
            this.form,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Data aset berhasil diperbarui!");
        } else {
          await axios.post("http://localhost:3000/api/aset", this.form, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Data aset berhasil ditambahkan!");
        }

        this.$emit("submit", this.form);
        this.resetForm();
        this.$emit("cancel");
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
  margin-top: 20px; /* Jarak antara form dan header */
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
