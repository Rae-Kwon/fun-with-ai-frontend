import Image from 'next/image';

interface YoutubeThumbnailProps {
  videoUrl: string;
  title?: string;
  thumbnail?: {url: string; width: string; height: string};
}

const YoutubeThumbnail = ({
  videoUrl,
  title,
  thumbnail,
}: YoutubeThumbnailProps) => {
  let thumbnailUrl = '';
  let videoUrlLink = '';
  if (thumbnail?.url) thumbnailUrl = thumbnail.url;
  if (videoUrl) videoUrlLink = videoUrl;

  return (
    <a href={videoUrl}>
      <Image
        src={thumbnailUrl}
        alt={title}
        width={thumbnail?.width}
        height={thumbnail?.height}
      />
    </a>
  );
};

export default YoutubeThumbnail;
