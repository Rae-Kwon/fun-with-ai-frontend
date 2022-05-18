import type {Dispatch, FormEvent, KeyboardEvent} from 'react';

import styles from './PresetPrompt.module.css';

interface PresetPromptProps {
  prompt: string;
  promptHandler: (event: FormEvent<HTMLButtonElement>) => void;
  setOpen: Dispatch<boolean>;
}

const PresetPrompt = ({prompt, promptHandler, setOpen}: PresetPromptProps) => {
  const prompOnKeyDownHandler = (
    event: KeyboardEvent | FormEvent<HTMLButtonElement>,
  ) => {
    if ((event as KeyboardEvent).key === 'Enter') {
      promptHandler(event as FormEvent<HTMLButtonElement>);
      setOpen(false);
    }
  };

  return (
    <button
      className={styles.presetPrompt}
      type="button"
      onClick={(event) => promptHandler(event)}
      onKeyDown={prompOnKeyDownHandler}
    >
      {prompt}
    </button>
  );
};
export default PresetPrompt;
