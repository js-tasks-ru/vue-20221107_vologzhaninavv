<template>
  <div class="toast" :class="[`toast_${type}`]">
    <ui-icon v-if="$options.icons[type]" class="toast__icon" :icon="$options.icons[type]" />
    <span>
      <slot>{{ message }}</slot>
    </span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: {
    UiIcon,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
      default: 5000,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['success', 'error'].includes(value),
    },
    message: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: ['close'],

  data() {
    return {
      timer: null,
    };
  },

  watch: {
    duration: {
      immediate: true,
      handler(newDuration) {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => this.closeMessage(), newDuration);
      },
    },
  },

  methods: {
    closeMessage() {
      this.$emit('close', this.id);
    },
  },

  icons: {
    error: 'alert-circle',
    success: 'check-circle',
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
