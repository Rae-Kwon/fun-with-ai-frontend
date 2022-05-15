/* eslint-disable @typescript-eslint/naming-convention */
import type {NextPage} from 'next';
import Head from 'next/head';
import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import PromptForm from '../components/PromptForm';
import YoutubeThumbnail from '../components/YoutubeThumbnail';
import Loading from '../components/Loading';

interface ResultType {
  prompt: {id: string; message: string};
  res: {id: string; message: string; video: VideoResultType};
}

interface VideoResultType {
  id: string;
  thumbnail: any;
  title: string;
}

const ShowResponse = (res: any) => {
  if (res.message !== undefined && res.video !== undefined) {
    const {id, title, thumbnail} = res.video;
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;
    return (
      <>
        <p>Lil Nost X</p>
        <YoutubeThumbnail
          videoUrl={videoUrl}
          title={title}
          thumbnail={thumbnail}
        />
        {res.message}
      </>
    );
  }
  if (res === undefined) return <Loading />;
};

const Home: NextPage = () => {
  const [userInput, setUserInput] = useState('');
  const [results, setResults] = useState<ResultType[]>([]);

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
    const resultVideoId = resultVideo.id.videoId;
    const resultVideoThumbnail = resultVideo.snippet.thumbnails.high;
    const resultVideoTitle = resultVideo.snippet.title;
    const resultVideoObj = {
      id: resultVideoId,
      thumbnail: resultVideoThumbnail,
      title: resultVideoTitle,
    };
    return resultVideoObj;
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
      const responseData = await response.json();
      const youtubeData = await getYoutubeSearchResults(responseData.result);
      setResults((prevState) => [
        ...prevState,
        {
          prompt: {id: uuidv4(), message: userInput},
          res: {
            id: responseData.id,
            message: responseData.result,
            video: youtubeData,
          },
        },
      ]);
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
        {results.map(({prompt, res}) => (
          <React.Fragment key={uuidv4()}>
            <section key={prompt.id}>{prompt.message}</section>
            <section key={res.id}>{ShowResponse(res)}</section>
          </React.Fragment>
        ))}
      </main>
    </>
  );
};

export default Home;
