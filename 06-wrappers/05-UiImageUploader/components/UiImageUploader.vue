<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': isLoading }">
      <span class="image-uploader__text">{{ title }}</span>
      <input
        ref="inputFile"
        v-bind:="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @click="removeFile"
        @change="changeImage"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
      required: false,
      default: '',
    },
    uploader: {
      type: Function,
      required: false,
    },
  },

  emits: ['remove', 'upload', 'error', 'select'],

  data() {
    return {
      isLoading: false,
      localPreview: null,
    };
  },

  computed: {
    bgImage() {
      return this.localPreview ? `url(${this.localPreview})` : 'var(--default-cover)';
    },
    title() {
      if (this.isLoading) {
        return 'Загрузка...';
      }

      return this.localPreview ? 'Удалить изображение' : 'Загрузить изображение';
    },
  },

  watch: {
    preview: {
      immediate: true,
      handler(val) {
        this.localPreview = val;
      },
    },
  },

  methods: {
    async changeImage(e) {
      const file = e.target.files[0];
      if (!file) {
        return false;
      }

      this.isLoading = true;
      if (this.uploader) {
        try {
          const result = await this.uploader(file);
          this.$emit('upload', result);
        } catch (e) {
          this.removeInputValue();
          this.$emit('error', e);
        }
      } else {
        this.localPreview = URL.createObjectURL(file);
      }

      this.$emit('select', file);
      this.isLoading = false;
    },
    removeFile(e) {
      if (this.isLoading) {
        return false;
      }

      if (this.localPreview) {
        this.removeInputValue();
        this.localPreview = null;
        this.$emit('remove');
      }
    },
    removeInputValue() {
      this.$refs.inputFile.value = null;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), v-bind(bgImage);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
