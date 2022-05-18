import Image from 'next/image';

import type {YoutubeThumbnailProps} from '../types';
import Error from './Error';

import styles from './YoutubeThumbnail.module.css';

const YoutubeThumbnail = ({title, thumbnail}: YoutubeThumbnailProps) => {
  let thumbnailUrl = '';
  if (thumbnail?.url) thumbnailUrl = thumbnail.url;

  if (title !== 'error') {
    return (
      <div className={styles.thumbnail}>
        <Image
          src={thumbnailUrl}
          alt={title}
          width={480}
          height={360}
          layout="intrinsic"
          className={styles.thumbnailImg}
        />
      </div>
    );
  }

  return <Error />;
};

export default YoutubeThumbnail;
