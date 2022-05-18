import Image from 'next/image';

import styles from './YoutubeThumbnail.module.css';

interface YoutubeThumbnailProps {
  title?: string;
  thumbnail?: {url: string; width: string; height: string};
}

const YoutubeThumbnail = ({title, thumbnail}: YoutubeThumbnailProps) => {
  let thumbnailUrl = '';
  if (thumbnail?.url) thumbnailUrl = thumbnail.url;
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
};

export default YoutubeThumbnail;
