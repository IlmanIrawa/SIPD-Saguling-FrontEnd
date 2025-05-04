<template>
  <div class="contact-wrapper">
    <div class="contact-card">
      <h1 class="contact-title">Kontak Kami</h1>
      <p class="contact-description">Hubungi kami melalui platform berikut untuk informasi lebih lanjut.</p>

      <div class="contact-info">
        <div class="contact-item">
          <i class="fab fa-whatsapp contact-icon" style="color: #25D366;"></i>
          <a href="https://wa.me/yourphonenumber" class="contact-link">WhatsApp</a>
        </div>

        <div class="contact-item">
          <i class="fab fa-facebook-f contact-icon" style="color: #1877F2;"></i>
          <a href="https://facebook.com/yourprofile" class="contact-link">Facebook</a>
        </div>

        <div class="contact-item">
          <i class="fab fa-instagram contact-icon" style="color: #E1306C;"></i>
          <a href="https://instagram.com/yourprofile" class="contact-link">Instagram</a>
        </div>

        <div class="contact-item">
          <i class="fab fa-twitter contact-icon" style="color: #1DA1F2;"></i>
          <a href="https://twitter.com/yourprofile" class="contact-link">Twitter</a>
        </div>

        <div class="contact-item">
          <i class="fas fa-envelope contact-icon" style="color: #D44638;"></i>
          <a href="mailto:your@email.com" class="contact-link">Email</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactCard"
};
</script>

<style scoped>
.contact-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #e0f7fa, #fce4ec);
  min-height: 100vh;
}

.contact-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.contact-title {
  font-size: 2.2em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.contact-description {
  font-size: 1.1em;
  margin-bottom: 30px;
  color: #666;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 1.2em;
}

.contact-icon {
  font-size: 2em;
}

.contact-link {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #007BFF;
}
</style>
