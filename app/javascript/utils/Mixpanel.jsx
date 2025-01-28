
import mixpanel from 'mixpanel-browser';

mixpanel.init('YOUR_MIXPANEL_TOKEN');

let env_check = process.env.NODE_ENV === 'production';

export let Mixpanel = {
  identify: (id) => {
    if (env_check) 
      mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) 
      mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) 
      mixpanel.track(name, props);
  }
};
