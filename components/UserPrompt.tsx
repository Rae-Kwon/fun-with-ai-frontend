import cn from 'classnames';

import styles from './UserPrompt.module.css';

const UserPrompt = ({message}: any) => {
  return (
    <div className={cn(styles.message, styles.userMessage)}>{message}</div>
  );
};
export default UserPrompt;
