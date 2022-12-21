<template>
  <slot name="fulfilled" v-if="result" :result="result"></slot>
  <slot name="rejected" v-else-if="error" :error="error"></slot>
  <slot name="pending" v-else></slot>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      immediate: true,
      async handler() {
        this.resetResultPromise();
        await this.getResultPromise();
      },
    },
  },

  methods: {
    async getResultPromise() {
      try {
        this.result = await this.promise;
      } catch(e) {
        this.error = e;
      }
    },
    resetResultPromise() {
      this.result = null;
      this.error = null;
    },
  },
};
</script>
