import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      type: String,
      required: false,
      default: () => '',
    },
    image: {
      type: String,
      required: false,
      default: () => '',
    },
  },

  computed: {
    bgImage() {
      return this.image
        ? {
            '--bg-url': `url(${this.image})`,
          }
        : {};
    },
  },

  template: `
    <div class="meetup-cover" :style="bgImage">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
