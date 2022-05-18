import type {FormEventHandler, Dispatch} from 'react';

import styles from './PromptForm.module.css';

interface PromptFormProps {
  submitHandler: FormEventHandler<HTMLFormElement>;
  userInput: string;
  setUserInput: Dispatch<string>;
}

const PromptForm = ({
  submitHandler,
  userInput,
  setUserInput,
}: PromptFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        submitHandler(event);
      }}
      className={styles.chatbar}
    >
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
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </label>
    </form>
  );
};
export default PromptForm;
