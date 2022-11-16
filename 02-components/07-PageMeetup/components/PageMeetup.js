import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: {},
      loading: false,
      error: false,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      async handler(id) {
        this.loading = true;

        try {
          this.error = '';
          this.meetup = await fetchMeetupById(id);
        } catch (e) {
          this.error = e.message;
          this.meetup = {};
        }

        this.loading = false;
      },
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="!loading && !error" :meetup="meetup" />

      <UiContainer v-else-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
