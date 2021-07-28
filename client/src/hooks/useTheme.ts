import { useState, useEffect } from 'react';
import store from '../store';
import theme from '../theme';
import { IThemeType } from '../theme';

type UseThemeType = () => {
  siteTheme: IThemeType;
  setSiteTheme: React.Dispatch<React.SetStateAction<IThemeType>>;
};

export const useTheme: UseThemeType = () => {
  const [siteTheme, setSiteTheme] = useState(theme.light);

  const { profile } = store.getState().profile;

  useEffect(() => {
    if (profile) {
      profile.theme === 'dark' && setSiteTheme(theme.dark);
    }
  }, [profile]);

  return { siteTheme, setSiteTheme };
};
