import type {Dispatch, FormEvent, KeyboardEvent} from 'react';

import styles from './PromptForm.module.css';
import PresetPrompts from './PresetPrompts';

interface PromptFormProps {
  submitHandler: (input: string, event?: FormEvent<HTMLFormElement>) => void;
  userInput: string;
  setUserInput: Dispatch<string>;
}

const PromptForm = ({
  submitHandler,
  userInput,
  setUserInput,
}: PromptFormProps) => {
  const enterKeyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitHandler(userInput);
    }
  };
  return (
    <form
      onSubmit={(event) => {
        submitHandler(userInput, event);
      }}
      className={styles.chatbar}
    >
      <PresetPrompts submitHandler={submitHandler} />
      <label htmlFor="prompt" className={styles.chatInputContainer}>
        <input
          aria-label="user prompt"
          type="text"
          name="prompt"
          id="prompt"
          placeholder="How are you feeling?"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          autoComplete="off"
          className={styles.chatInput}
          tabIndex={0}
        />
      </label>
      <label htmlFor="formSubmit" className={styles.sendButtonContainer}>
        <span className={styles.tooltipText}>Send</span>
        <input
          aria-label="form submit"
          type="submit"
          name="formSubmit"
          id="formSubmit"
          value="Give me a song"
          className={styles.submitButton}
        />
        <div className={styles.sendButtonIconContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.sendButton}
            viewBox="0 0 20 20"
            fill="currentColor"
            onKeyDown={enterKeyHandler}
            tabIndex={0}
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </label>
    </form>
  );
};
export default PromptForm;
