import type {Dispatch, FormEvent} from 'react';

import type {ResultType, ThumbnailType} from './stateTypes';

interface ClearStorageProps {
  clear: (key: string) => void;
  setResults: React.Dispatch<React.SetStateAction<ResultType[]>>;
}

interface PromptFormProps {
  submitHandler: (input: string, event?: FormEvent<HTMLFormElement>) => void;
  userInput: string;
  setUserInput: Dispatch<string>;
}

interface PresetPromptsProps {
  submitHandler: (input: string, event?: FormEvent<HTMLFormElement>) => void;
}

interface PresetPromptProps {
  prompt: string;
  promptHandler: (event: FormEvent<HTMLButtonElement>) => void;
  setOpen: Dispatch<boolean>;
}

interface YoutubeThumbnailProps {
  title?: string;
  thumbnail?: ThumbnailType;
}

interface ShowResponseProps {
  res: ResultType['res'];
}

interface UserPromptProps {
  message: string;
}

export type {
  ClearStorageProps,
  PromptFormProps,
  PresetPromptsProps,
  PresetPromptProps,
  YoutubeThumbnailProps,
  ShowResponseProps,
  UserPromptProps,
};
