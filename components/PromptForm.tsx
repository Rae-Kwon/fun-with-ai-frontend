import type {FormEventHandler, Dispatch} from 'react';

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
    >
      <label htmlFor="prompt">
        <input
          aria-label="user prompt"
          type="text"
          name="prompt"
          id="prompt"
          placeholder="How are you feeling?"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          autoComplete="off"
        />
      </label>
      <label htmlFor="formSubmit">
        <input
          aria-label="form submit"
          type="submit"
          name="formSubmit"
          id="formSubmit"
          value="Give me a song"
        />
      </label>
    </form>
  );
};
export default PromptForm;
