import cn from 'classnames';

import styles from './WelcomeMessage.module.css';

const WelcomeMessage = () => {
  return (
    <section className={cn(styles.message, styles.aiResponse)}>
      Hi I&apos;m Lil Nost X! Tell me, how&apos;re you feeling right now?
      I&apos;ll reply with a song. Sometimes I get confused and reply with a
      song name that doesn&apos;t belong to the artist but I&apos;ll still give
      you a song!!
    </section>
  );
};
export default WelcomeMessage;
