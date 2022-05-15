/* eslint-disable @typescript-eslint/naming-convention */
import type {NextPage} from 'next';
import Head from 'next/head';
import React, {useCallback, useState} from 'react';

import PromptForm from '../components/PromptForm';
import YoutubeThumbnail from '../components/YoutubeThumbnail';
import Loading from '../components/Loading';

const ShowVideo = (videoResult: any) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoResult.id}`;
  if (videoResult.thumbnail) {
    return (
      <YoutubeThumbnail
        videoUrl={videoUrl}
        title={videoResult.title}
        thumbnail={videoResult.thumbnail}
      />
    );
  }
  return <Loading />;
};

const Home: NextPage = () => {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState();
  const [videoResult, setVideoResult] = useState({
    id: null,
    thumbnail: null,
    title: null,
  });

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
    const resultVideo = result.items[0];
    console.log(resultVideo);
    const resultVideoId = resultVideo.id.videoId;
    const resultVideoThumbnail = resultVideo.snippet.thumbnails.high;
    const resultVideoTitle = resultVideo.snippet.title;
    setVideoResult({
      id: resultVideoId,
      thumbnail: resultVideoThumbnail,
      title: resultVideoTitle,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    (async () => {
      event.preventDefault();
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: userInput}),
      });
      const data = await response.json();
      getYoutubeSearchResults(data.result);
      setResult(data.result);
      setUserInput('');
    })();
  };

  return (
    <>
      <main>
        <h1>How are you feeling?</h1>
        <PromptForm
          submitHandler={submitHandler}
          userInput={userInput}
          setUserInput={setUserInput}
        />
        {ShowVideo(videoResult)}
        <div>{result}</div>
      </main>
    </>
  );
};

export default Home;
