import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
createApp({
  data() {
    return {
      meetups: {},
      meetupId: 0,
    };
  },
  computed: {
    meetupTitle() {
      if (!this.meetups[this.meetupId]) {
        return '';
      }

      return this.meetups[this.meetupId].title;
    },
  },
  watch: {
    meetupId: {
      handler(meetupId) {
        if (this.meetups[meetupId]) {
          return;
        }

        fetchMeetupById(meetupId).then((result) => {
          this.meetups[meetupId] = result;
        });
      },
    },
  },
}).mount('#app');
