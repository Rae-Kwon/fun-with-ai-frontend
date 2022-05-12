import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useState} from 'react';

import PromptForm from '../components/PromptForm';

const Home: NextPage = () => {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    (async () => {
      event.preventDefault();
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: userInput}),
      });
      const data = await response.json();
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
        <div>{result}</div>
      </main>
    </>
  );
};

export default Home;
