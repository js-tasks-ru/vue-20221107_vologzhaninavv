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
      meetup: null,
      loading: false,
      error: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      async handler(id) {
        this.loading = true;

        try {
          this.error = null;
          this.meetup = await fetchMeetupById(id);
        } catch (e) {
          this.error = e.message;
          this.meetup = null;
        }

        this.loading = false;
      },
    },
  },

  template: `
    <div class="page-meetup">
      <UiContainer v-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <template v-else>
        <MeetupView v-if="meetup" :meetup="meetup" />

        <UiContainer v-else-if="error">
          <UiAlert>{{ error }}</UiAlert>
        </UiContainer>
      </template>
    </div>`,
});
