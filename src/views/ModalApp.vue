<template>
  <div
    class="modal fade"
    :class="{ show: visible }"
    tabindex="-1"
    aria-modal="true"
    role="dialog"
    v-if="visible"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* Modal styling */
.modal {
  display: none;
  background: rgba(0, 0, 0, 0.5); /* Transparansi untuk latar belakang */
  justify-content: center;
  align-items: center;
}

.modal.show {
  display: flex; /* Tampilkan modal ketika properti visible=true */
}

.modal-dialog {
  max-width: 500px;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header .btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-header .btn-close:hover {
  color: red;
}

.modal-footer .btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.modal-footer .btn-secondary:hover {
  background-color: #5a6268;
}
</style>
