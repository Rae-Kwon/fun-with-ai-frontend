import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';

import {getFromLocalStorage, setToLocalStorage} from '../helpers';

import DarkModeSwitch from './DarkModeSwitch';
import LightModeSwitch from './LightModeSwitch';

const ToggleMode = () => {
  const [mounted, setMounted] = useState(false);
  const {resolvedTheme} = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    getFromLocalStorage('theme');
  }, []);

  useEffect(() => {
    const currentTheme = resolvedTheme?.trim();
    setToLocalStorage('theme', currentTheme as string);
  }, [resolvedTheme]);

  if (!mounted) return null;
  if (resolvedTheme === 'dark') return <LightModeSwitch />;
  if (resolvedTheme === 'light') return <DarkModeSwitch />;
  return null;
};
export default ToggleMode;
