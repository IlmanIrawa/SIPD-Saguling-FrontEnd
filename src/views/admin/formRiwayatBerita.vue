<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>{{ formTitle }}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td>Judul</td>
            <td>
              <input type="text" v-model="form.judul" id="judul" required />
            </td>
          </tr>
          <tr>
            <td>Isi Berita</td>
            <td>
              <textarea v-model="form.isiBerita" id="isi" required></textarea>
            </td>
          </tr>
          <tr>
            <td>Gambar</td>
            <div>
              <img
                :src="`http://localhost:3000/uploads/${form.gambar}`"
                alt="Gambar"
                width="100"
                height="100"
              />
              <input
              type="file"
              id="gambar"
              class="form-control"
              @change="handleFileUpload($event, 'gambar')"
            />
            </div>
          </tr>
          <tr>
            <td></td>
            <td>
              <div class="button-group">
                <button type="submit">
                  {{ isEdit ? "Simpan Perubahan" : "Tambah Berita" }}
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
import Swal from "sweetalert2";

export default {
  name: "BeritaForm",
  props: {
    item: {
      type: Object,
      default: () => ({
        beritaid: null,
        judul: "",
        isiBerita: "",
        gambar: "",
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
        beritaid: null,
        judul: "",
        isiBerita: "",
        gambar: "",
      },
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem && newItem.beritaid) {
          this.form = { ...newItem };
        } else {
          this.resetForm();
        }
      },
    },
  },
  computed: {
    formTitle() {
      return this.isEdit ? "Edit Berita" : "Tambah Berita";
    },
  },
  methods: {
    resetForm() {
      this.form = {
        beritaid: null,
        judul: "",
        isiBerita: "",
        gambar: "",
      };
    },
    async submitForm() {
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        Swal.fire("Token Tidak Valid", "Silakan login kembali!", "warning");
        return;
      }

      try {
        if (this.isEdit) {
          await axios.patch(
            `http://localhost:3000/api/berita/${this.form.beritaid}`,
            this.form,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Swal.fire("Berhasil", "Berita berhasil diperbarui!", "success");
        } else {
          await axios.post("http://localhost:3000/api/berita", this.form, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("Berhasil", "Berita berhasil ditambahkan!", "success");
        }

        this.$emit("submit", this.form);
        this.resetForm();
      } catch (error) {
        console.error("Gagal menyimpan berita:", error);
        Swal.fire(
          "Gagal",
          error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi!",
          "error"
        );
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 0px; /* Jarak antara form dan header */
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
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
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
