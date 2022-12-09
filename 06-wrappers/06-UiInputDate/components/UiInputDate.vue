<template>
  <ui-input v-bind="$attrs" v-model="value" :type="type" :valueAsNumber="valueAsNumber" @input="inputDate">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (val) => ['date', 'time', 'datetime-local'].includes(val),
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    value() {
      if (!this.modelValue) {
        return '';
      }

      let valByType = new Date(this.modelValue).toISOString();

      if (this.type === 'date') {
        valByType = valByType.substring(0, 10);
      } else if (this.type === 'time') {
        valByType = valByType.substring(11, 16);
      } else if (this.type === 'datetime-local') {
        valByType = valByType.substring(0, 16);
      }

      return valByType;
    },
    valueAsNumber: {
      get() {
        return new Date(this.modelValue).getTime();
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },

  methods: {
    inputDate(e) {
      this.valueAsNumber = e.target.valueAsNumber;
    },
  },
};
</script>
