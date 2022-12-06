<template>
  <component :is="tag" v-bind="attrs" class="button" :class="className">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiButton',

  inheritAttrs: false,

  props: {
    tag: {
      required: false,
      default: 'button',
    },
    variant: {
      type: String,
      required: false,
      default: 'secondary',
      validator: (variant) => ['primary', 'secondary', 'danger'].includes(variant),
    },
    block: {
      type: Boolean,
    },
  },

  computed: {
    attrs() {
      const attrs = {
        ...this.$attrs,
      };

      if (this.tag === 'button' && !attrs.type) {
        attrs.type = 'button';
      }

      return attrs;
    },
    className() {
      const className = [`button_${this.variant}`];

      if (this.block) {
        className.push('button_block');
      }

      return className;
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}

.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}

.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}

.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
