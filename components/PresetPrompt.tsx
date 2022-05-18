import type {FormEvent, KeyboardEvent, MouseEvent} from 'react';

import type {PresetPromptProps} from '../types';

import styles from './PresetPrompt.module.css';

const PresetPrompt = ({prompt, promptHandler, setOpen}: PresetPromptProps) => {
  const promptEventHandler = (
    event: KeyboardEvent | MouseEvent | FormEvent<HTMLButtonElement>,
  ) => {
    if (
      (event as KeyboardEvent).key === 'Enter' ||
      (event as MouseEvent).type === 'click'
    ) {
      promptHandler(event as FormEvent<HTMLButtonElement>);
      setOpen(false);
    }
  };

  return (
    <button
      className={styles.presetPrompt}
      type="button"
      onClick={promptEventHandler}
      onKeyDown={promptEventHandler}
    >
      {prompt}
    </button>
  );
};
export default PresetPrompt;
