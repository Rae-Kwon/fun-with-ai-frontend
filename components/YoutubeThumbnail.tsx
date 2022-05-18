import Image from 'next/image';

import styles from './YoutubeThumbnail.module.css';

interface YoutubeThumbnailProps {
  title?: string;
  thumbnail?: {url: string};
}

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

  return <div className={styles.thumbnail}>Error Could Not Load</div>;
};

export default YoutubeThumbnail;
