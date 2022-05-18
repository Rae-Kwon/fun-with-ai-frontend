/* eslint-disable @typescript-eslint/naming-convention */
import type {NextPage} from 'next';
import Head from 'next/head';
import React, {useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import cn from 'classnames';

import PromptForm from '../components/PromptForm';
import YoutubeThumbnail from '../components/YoutubeThumbnail';
import Loading from '../components/Loading';
import ClearStorage from '../components/ClearStorage';

import styles from './Home.module.css';

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
        <YoutubeThumbnail title={title} thumbnail={thumbnail} />
        <a href={videoUrl} target="_blank" rel="noreferrer">
          <div className={styles.aiResponseContainer}>
            {res.message}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className={styles.externalLinkIcon}
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </a>
      </>
    );
  }
  return <Loading />;
};

const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
};

const setToLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
};

const removeFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key);
  }
};

const Home: NextPage = () => {
  const messageEndRef = useRef<null | HTMLDivElement>(null);
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
        {
          prompt: {id: uuidv4(), message: userInput},
          res: {
            id: responseData.id,
            message: responseData.result,
            video: youtubeData,
          },
        },
        ...prevState,
      ]);
      setUserInput('');
    })();
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [results]);

  useEffect(() => {
    const savedResults = getFromLocalStorage('results');
    if (savedResults !== null) {
      const resultsParsed = JSON.parse(savedResults!);
      setResults(resultsParsed);
    }
  }, []);

  useEffect(() => {
    const resultsToStore = JSON.stringify(results);
    setToLocalStorage('results', resultsToStore);
  }, [results]);

  return (
    <main className={styles.chatbox}>
      <div className={styles.chatContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>Lil Nost X</h1>
          <ClearStorage
            clear={removeFromLocalStorage}
            setResults={setResults}
          />
        </header>
        <section className={styles.chat}>
          {[...results].reverse().map(({prompt, res}) => (
            <React.Fragment key={uuidv4()}>
              <section key={prompt.id} className={styles.userPrompt}>
                <div className={cn(styles.message, styles.userMessage)}>
                  {prompt.message}
                </div>
              </section>
              <section
                key={res.id}
                className={cn(styles.message, styles.aiResponse)}
              >
                {ShowResponse(res)}
              </section>
            </React.Fragment>
          ))}

          <div className={styles.chatEnd} ref={messageEndRef} />
        </section>
        <footer className={styles.chatbar}>
          <PromptForm
            submitHandler={submitHandler}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        </footer>
      </div>
    </main>
  );
};

export default Home;
