<template>
  <button type="button" @click="changeCount">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count(newVal) {
      this.localCount = newVal;
    },
  },

  methods: {
    changeCount() {
      this.$emit('update:count', ++this.localCount);
    },
  },
};
</script>
