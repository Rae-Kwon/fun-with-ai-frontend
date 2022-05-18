/* eslint-disable @typescript-eslint/naming-convention
  --------
  This rule applies as the header Content-Type for
  the fetch function must be Kebab-Case.
*/
const getAiResponse = async (input: string) => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({prompt: input}),
  });
  const responseData = await response.json();

  return responseData;
};

const getYoutubeSearchResults = async (song: string) => {
  const youtubeApiKey = process.env.NEXT_PUBLIC_YOUTUBE_KEY;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${song}&key=${youtubeApiKey}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await response.json();
  if (result.items) {
    const resultVideo = result.items[0];
    const resultVideoId = resultVideo.id.videoId;
    const resultVideoThumbnail = resultVideo.snippet.thumbnails.high;
    const resultVideoTitle = resultVideo.snippet.title;
    const resultVideoObj = {
      id: resultVideoId,
      thumbnail: resultVideoThumbnail,
      title: resultVideoTitle,
    };
    return resultVideoObj;
  }

  return {
    id: 'error 403',
    thumbnail: {url: 'nourl'},
    title: 'error',
  };
};

export {getAiResponse, getYoutubeSearchResults};
