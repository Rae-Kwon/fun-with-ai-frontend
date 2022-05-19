import {useTheme} from 'next-themes';

import styles from './LightModeSwitch.module.css';

const LightModeSwitch = () => {
  const {setTheme} = useTheme();
  return (
    <div className={styles.lightModeContainer}>
      <div className={styles.lightModeIconContainer}>
        <span className={styles.tooltipText}>Light Mode</span>
        <div
          onClick={() => setTheme('light')}
          onKeyDown={(event) => {
            if (event.key === 'Enter') setTheme('light');
          }}
          role="button"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.lightModeIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default LightModeSwitch;
