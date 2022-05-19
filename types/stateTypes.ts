interface ResultType {
  res: {id: string; message: string; video?: VideoResultType};
  prompt: {id: string; message: string};
}

interface VideoResultType {
  id: string;
  thumbnail: ThumbnailType;
  title: string;
}

interface ThumbnailType {
  url: string;
}

export type {ResultType, ThumbnailType, VideoResultType};
