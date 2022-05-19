import type {KeyboardEvent, MouseEvent} from 'react';

import type {ClearStorageProps} from '../types';

import styles from './ClearStorage.module.css';

const ClearStorage = ({clear, setResults}: ClearStorageProps) => {
  const clearHandler = (event: KeyboardEvent | MouseEvent) => {
    if (
      (event as KeyboardEvent).key === 'Enter' ||
      (event as MouseEvent).type === 'click'
    ) {
      clear('results');
      setResults([]);
    }
  };

  return (
    <label htmlFor="clearButton" className={styles.clearContainer}>
      <input
        type="reset"
        id="clearButton"
        className={styles.clearButton}
        aria-label="Clear AI conversation"
      />
      <div className={styles.clearIconContainer}>
        <span className={styles.tooltipText}>Clear Chat</span>
        <div
          onClick={clearHandler}
          onKeyDown={clearHandler}
          role="button"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.clearIcon}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </label>
  );
};
export default ClearStorage;
