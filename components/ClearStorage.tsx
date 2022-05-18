import styles from './ClearStorage.module.css';

interface ResultType {
  prompt: {id: string; message: string};
  res: {id: string; message: string; video: VideoResultType};
}

interface VideoResultType {
  id: string;
  thumbnail: any;
  title: string;
}

interface ClearStorageProps {
  clear: any;
  setResults: React.Dispatch<React.SetStateAction<ResultType[]>>;
}

const ClearStorage = ({clear, setResults}: ClearStorageProps) => {
  const clickHandler = () => {
    clear('results');
    setResults([]);
  };

  return (
    <label htmlFor="clearButton" className={styles.clearContainer}>
      <span className={styles.tooltipText}>Clear Chat</span>
      <input
        type="reset"
        id="clearButton"
        className={styles.clearButton}
        aria-label="Clear AI conversation"
        onClick={clickHandler}
      />
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
    </label>
  );
};
export default ClearStorage;
