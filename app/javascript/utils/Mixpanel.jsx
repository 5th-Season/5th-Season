import mixpanel from 'mixpanel-browser';

// Use window.__ENV__ which we'll define in our application layout
const ENV = window.__ENV__ || {};
const MIXPANEL_TOKEN = ENV.MIXPANEL_TOKEN || '';
const isProduction = ENV.NODE_ENV === 'production';

console.log(`Mixpanel Token: ${MIXPANEL_TOKEN}`);
console.log(`Environment: ${isProduction ? 'production' : 'development'}`);

// Only initialize if token is available and not empty
const hasValidToken = MIXPANEL_TOKEN && MIXPANEL_TOKEN.trim().length > 0;

if (hasValidToken) {
  try {
    mixpanel.init(MIXPANEL_TOKEN);
    console.log('Mixpanel initialized successfully');
  } catch (error) {
    console.error('Error initializing Mixpanel:', error);
  }
} else {
  console.log('Mixpanel not initialized - no valid token provided');
}

export const Mixpanel = {
  identify: (id) => {
    if (isProduction && hasValidToken) {
      try {
        mixpanel.identify(id);
      } catch (error) {
        console.error('Error identifying user in Mixpanel:', error);
      }
    }
  },
  alias: (id) => {
    if (isProduction && hasValidToken) {
      try {
        mixpanel.alias(id);
      } catch (error) {
        console.error('Error aliasing user in Mixpanel:', error);
      }
    }
  },
  track: (name, props) => {
    if (isProduction && hasValidToken) {
      try {
        mixpanel.track(name, props);
      } catch (error) {
        console.error('Error tracking event in Mixpanel:', error);
      }
    } else {
      console.log(`[Mixpanel - DEV] ${name}`, props);
    }
  }
};
