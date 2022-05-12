import {Request, Response} from 'express';
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({apiKey: process.env.OPENAI_KEY});

const openai = new OpenAIApi(configuration);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response) => {
  try {
    const response = await openai.createCompletion('text-curie-001', {
      prompt: generatePrompt(req.body.prompt),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      max_tokens: 50,
      temperature: 0.5,
      stop: [' User:', ' Response:'],
    });
    const result = response.data.choices;
    if (result) {
      res.status(200).json({result: result[0].text});
    }
  } catch (error: any) {
    res.status(503).json({result: error.message});
  }
};

const generatePrompt = (prompt: string) => {
  return `Suggest a song depending on the person's mood.
  
  User: I'm feeling sad.
  Response: I found a sad song. Mad World by Tears for Fears.
  User: I'm sad.
  Response: Here's a sad song. Everybody Hurts by R.E.M.
  User: I'm feeling happy.
  Response: I found a happy song. Happy by Pharrel Williams.
  User: I'm happy.
  Response: Here's a happy song. Don't Worry Be Happy by Bobby McFerrin.
  User: I'm feeling angry.
  Response: Here's a song to let out your anger. Psychosocial by Slipknot.
  User: I'm angry.
  Response: I found a song to let out your anger. Killing in the Name by Rage Against the Machine.
  User: I want something light-hearted.
  Response: Here's something light-hearted. Walking on Sunshine by Katrina & The Waves.
  User: Something light-hearted.
  Response: Here's a light-hearted song. Don't Stop Me Now by Queen.
  User: I want to celebrate.
  Response: Here's a song to celebrate to. Good as Hell by Lizzo.
  User: I'm feeling celebratory.
  Response: Celebrate to this. CAN'T STOP THE FEELING! by Justin Timberlake.
  User: I'm feeling funky.
  Response: This'll get you in the groove. Juice by Lizzo.
  User: Play something funky.
  Response: Here's something funky. Never Catch Me by Flying Lotus ft. Kendrick Lamar
  User: I want to jam out.
  Response: Jam out to this. Wax Simulacra by The Mars Volta.
  User: Play a song to jam out to.
  Response: You can jam to this. Crazy Train by Ozzy Osbourne.
  User: ${prompt}
  Response:`;
};
