<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :id="toast.id" :key="toast.id" :type="toast.type" @close="removeToast($event)">
      <span>{{ toast.message }}</span>
    </ui-toast>
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

let globalToastId = 0;
export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    error(message) {
      this.addToast({
        type: 'error',
        message,
      });
    },
    success(message) {
      this.addToast({
        type: 'success',
        message,
      });
    },
    addToast({ type, message }) {
      this.toasts.push({
        id: globalToastId++,
        type,
        message,
      });
    },
    removeToast(id) {
      const index = this.toasts.findIndex((toast) => toast.id === id);
      this.toasts.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
