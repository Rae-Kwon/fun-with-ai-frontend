import type {FormEvent} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import React, {useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import cn from 'classnames';

import type {ResultType} from '../types';
import PromptForm from '../components/PromptForm';
import ClearStorage from '../components/ClearStorage';
import AiProfile from '../components/AiProfile';
import WelcomeMessage from '../components/WelcomeMessage';
import ShowResponse from '../components/ShowResponse';
import UserPrompt from '../components/UserPrompt';
import {
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
  getAiResponse,
  getYoutubeSearchResults,
} from '../helpers';

import styles from './Home.module.css';

const Home: NextPage = () => {
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [userInput, setUserInput] = useState('');
  const [results, setResults] = useState<ResultType[]>([]);

  const submitHandler = (input: string, event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    (async () => {
      const aiResponseData = await getAiResponse(input);
      const youtubeData = await getYoutubeSearchResults(aiResponseData.result);
      const result = {
        id: aiResponseData.id,
        message: aiResponseData.result,
        video: youtubeData,
      };
      setResults((prevState) => [
        {
          prompt: {id: uuidv4(), message: input},
          res: result,
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
          <AiProfile />
          <ClearStorage
            clear={removeFromLocalStorage}
            setResults={setResults}
          />
        </header>
        <section className={styles.chat}>
          <WelcomeMessage />
          {[...results].reverse().map(({res, prompt}) => (
            <React.Fragment key={uuidv4()}>
              <section key={prompt.id} className={styles.userPrompt}>
                <UserPrompt message={prompt.message} />
              </section>
              <section
                key={res.id}
                className={cn(styles.message, styles.aiResponse)}
              >
                <ShowResponse res={res} />
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
