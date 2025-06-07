<template>
  <section class="container my-5">
    <div class="row align-items-center g-4">
      <!-- Gambar Kiri -->
      <div class="col-md-6 text-center">
        <img
          src="@/assets/img/ilustrasi.png"
          alt="Ilustrasi APB Desa"
          class="img-fluid"
          style="max-width: 400px;"
        />
      </div>

      <!-- Konten Kanan -->
      <div class="col-md-6">
        <h2 class="fw-bold text-success">APB DESA</h2>
        <p class="text-muted">
          Akses cepat dan transparan terhadap APB Desa serta proyek pembangunan
        </p>

        <!-- Kartu Pendapatan -->
        <div class="card shadow-sm mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <span class="fw-semibold text-secondary .text-justify">APBD Desa (Anggaran Pendapatan dan Belanja Desa) adalah rencana keuangan tahunan desa yang memuat pendapatan, belanja, dan pembiayaan desa yang ditetapkan melalui musyawarah desa dan disahkan oleh kepala desa untuk mendukung penyelenggaraan pemerintahan, pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat desa.</span>
          </div>
        </div>

        <!-- Kartu Belanja -->
        <div class="card shadow-sm">
          <div class="card-body d-flex justify-content-between .text-justify">
            <span class="fw-semibold text-secondary">Tujuan APBD Desa adalah untuk merencanakan dan mengatur keuangan desa secara transparan dan akuntabel guna mendukung pelaksanaan pemerintahan, pembangunan, dan pelayanan masyarakat desa.
            Dasar hukum APBD Desa adalah Undang-Undang Nomor 6 Tahun 2014 tentang Desa, khususnya Pasal 72–74, serta diatur lebih lanjut dalam Peraturan Menteri Dalam Negeri Nomor 20 Tahun 2018 tentang Pengelolaan Keuangan Desa.</span>
          </div>
        </div>

        <!-- Tombol Lihat Selengkapnya -->
        <div class="mt-3">
          <a href="https://drive.google.com/file/d/1zd9zpqU39cnzE-iUDXzlpY8QHImN7x0q/view?usp=sharing"><button class="btn btn-outline-dark btn-sm">
            <i class="bi bi-file-earmark-text-fill me-1"></i>
            LIHAT DATA LEBIH LENGKAP
          </button></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Tidak ada logika khusus saat ini
</script>

<style scoped>
.card {
  border-radius: 10px;
  background-color: white;
}
</style>
