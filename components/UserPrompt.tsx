import cn from 'classnames';

import type {UserPromptProps} from '../types/propTypes';

import styles from './UserPrompt.module.css';

const UserPrompt = ({message}: UserPromptProps) => {
  return (
    <div className={cn(styles.message, styles.userMessage)}>{message}</div>
  );
};
export default UserPrompt;
