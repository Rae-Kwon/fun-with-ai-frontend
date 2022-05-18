import YoutubeThumbnail from './YoutubeThumbnail';
import styles from './ShowResponse.module.css';

const ShowResponse = ({res}: any) => {
  if (res?.video !== undefined) {
    const videoDetails = res?.video;
    const videoUrl = `https://www.youtube.com/watch?v=${videoDetails.id}`;
    return (
      <>
        <YoutubeThumbnail
          title={videoDetails.title}
          thumbnail={videoDetails.thumbnail}
        />
        <a href={videoUrl} target="_blank" rel="noreferrer">
          <div className={styles.aiResponseContainer}>
            {res?.message}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className={styles.externalLinkIcon}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </a>
      </>
    );
  }

  return null;
};

export default ShowResponse;
