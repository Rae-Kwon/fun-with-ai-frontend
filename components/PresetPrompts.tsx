import type {FormEvent, KeyboardEvent, MouseEvent} from 'react';
import {useState} from 'react';
import cn from 'classnames';
import {v4 as uuidv4} from 'uuid';

import type {PresetPromptsProps} from '../types';

import styles from './PresetPrompts.module.css';
import PresetPrompt from './PresetPrompt';

const PresetPrompts = ({submitHandler}: PresetPromptsProps) => {
  const [isOpen, setOpen] = useState(false);
  const prompts = [
    {id: uuidv4(), mood: 'Happy'},
    {id: uuidv4(), mood: 'Sad'},
    {id: uuidv4(), mood: 'Angry'},
    {id: uuidv4(), mood: 'Celebrate'},
    {id: uuidv4(), mood: 'Funky'},
    {id: uuidv4(), mood: 'Jam'},
    {id: uuidv4(), mood: 'Light-hearted'},
  ];

  const animationHandler = (event: KeyboardEvent | MouseEvent) => {
    if (
      (event as KeyboardEvent).key === 'Enter' ||
      (event as MouseEvent).type === 'click'
    ) {
      setOpen((prevState) => !prevState);
    }
  };

  const promptHandler = (
    event: FormEvent<HTMLButtonElement> | KeyboardEvent | MouseEvent,
  ) => {
    const {textContent} = event.currentTarget;
    if (
      textContent &&
      ((event as KeyboardEvent).key === 'Enter' ||
        (event as MouseEvent).type === 'click')
    )
      submitHandler(textContent);
  };

  return (
    <div className={styles.presetPromptsContainer}>
      <div className={styles.presetPromptsIconContainer}>
        <span className={styles.tooltipText}>Select a prompt</span>
        <div
          onClick={animationHandler}
          onKeyDown={animationHandler}
          role="button"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.presetPromptsIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
      </div>

      <div
        className={cn(
          styles.presetPrompts,
          isOpen ? styles.openPrompts : styles.closePrompts,
        )}
      >
        {prompts.map((prompt) => {
          return (
            <PresetPrompt
              key={prompt.id}
              prompt={prompt.mood}
              promptHandler={promptHandler}
              setOpen={setOpen}
            />
          );
        })}
      </div>
    </div>
  );
};
export default PresetPrompts;
