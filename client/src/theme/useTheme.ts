import { useState, useEffect } from 'react';
import store from '../store';
import theme from '.';

export const useTheme = () => {
  const [siteTheme, setSiteTheme] = useState(theme.light);

  const { profile } = store.getState().profile;

  console.log(profile.theme);

  useEffect(() => {
    if (profile) {
      profile.theme === 'dark' && setSiteTheme(theme.dark);
    }
  }, [profile]);

  return { siteTheme, setSiteTheme };
};
