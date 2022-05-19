import Image from 'next/image';

import {lilNostXPic as profilePic} from '../public/assets';

import styles from './AiProfile.module.css';

const AiProfile = () => {
  return (
    <div className={styles.heading}>
      <Image
        src={profilePic}
        alt="profile picture of AI bot Lil Nos X"
        height={50}
        width={50}
        className={styles.profilePhoto}
        layout="fixed"
      />
      <h1>Lil Nost X</h1>
    </div>
  );
};
export default AiProfile;
