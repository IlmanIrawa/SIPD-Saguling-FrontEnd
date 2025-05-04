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
            <span class="fw-semibold text-secondary">Pendapatan Desa</span>
            <span class="fs-4 fw-bold text-dark">Rp0,00</span>
          </div>
        </div>

        <!-- Kartu Belanja -->
        <div class="card shadow-sm">
          <div class="card-body d-flex justify-content-between align-items-center">
            <span class="fw-semibold text-secondary">Belanja Desa</span>
            <span class="fs-4 fw-bold text-dark">Rp0,00</span>
          </div>
        </div>

        <!-- Tombol Lihat Selengkapnya -->
        <div class="mt-3">
          <button class="btn btn-outline-dark btn-sm">
            <i class="bi bi-file-earmark-text-fill me-1"></i>
            LIHAT DATA LEBIH LENGKAP
          </button>
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
