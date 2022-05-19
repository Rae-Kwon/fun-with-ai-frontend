import {useTheme} from 'next-themes';

import styles from './DarkModeSwitch.module.css';

const DarkModeSwitch = () => {
  const {setTheme} = useTheme();
  return (
    <div className={styles.darkModeContainer}>
      <div className={styles.darkModeIconContainer}>
        <span className={styles.tooltipText}>Dark Mode</span>
        <div
          onClick={() => setTheme('dark')}
          onKeyDown={(event) => {
            if (event.key === 'Enter') setTheme('dark');
          }}
          role="button"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.darkModeIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default DarkModeSwitch;
