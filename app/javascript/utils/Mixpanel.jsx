import mixpanel from 'mixpanel-browser';

// Use window.__ENV__ which we'll define in our application layout
const ENV = window.__ENV__ || {};
const MIXPANEL_TOKEN = ENV.MIXPANEL_TOKEN || '';
const isProduction = ENV.NODE_ENV === 'production';

console.log(`Mixpanel Token: ${MIXPANEL_TOKEN}`);
console.log(`Environment: ${isProduction ? 'production' : 'development'}`);

// Only initialize if token is available
if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN);
}

export const Mixpanel = {
  identify: (id) => {
    if (isProduction && MIXPANEL_TOKEN) {
      mixpanel.identify(id);
    }
  },
  alias: (id) => {
    if (isProduction && MIXPANEL_TOKEN) {
      mixpanel.alias(id);
    }
  },
  track: (name, props) => {
    if (isProduction && MIXPANEL_TOKEN) {
      mixpanel.track(name, props);
    } else {
      console.log(`[Mixpanel - DEV] ${name}`, props);
    }
  }
};
