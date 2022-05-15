/* eslint-disable @typescript-eslint/naming-convention */
import {Request, Response} from 'express';
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({apiKey: process.env.OPENAI_KEY});

const openai = new OpenAIApi(configuration);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response) => {
  try {
    const response = await openai.createCompletion('text-curie-001', {
      prompt: generatePrompt(req.body.prompt),
      max_tokens: 50,
      top_p: 1,
      stop: ['Mood', 'Song:'],
    });
    const result = response.data.choices;
    if (result) {
      res.status(200).json({id: response.data.id, result: result[0].text});
    }
  } catch (error: any) {
    res.status(503).json({result: error.message});
  }
};

const generatePrompt = (prompt: string) => {
  return `A song for when I'm feeling:
  
  Mood: sad unhappy sorrowful dejected depressed miserable
  Song: Mad World by Tears for Fears.
  Mood: sad unhappy sorrowful dejected depressed miserable
  Song: Everybody Hurts by R.E.M.
  Mood: Sad Unhappy Sorrowful Dejected Depressed Miserable
  Song: Landslide by Fleetwood Mac.
  Mood: happy cheerful merry joyful jovial delighted
  Song: Happy by Pharrel Williams.
  Mood: happy cheerful merry joyful jovial delighted
  Song: Don't Worry Be Happy by Bobby McFerrin.
  Mood: Happy Cheerful Merry Joyful Jovial Delighted
  Song: Valerie by Mark Ronson ft. Amy Winehouse.
  Mood: angry mad irate vexed irritated exasperated indignant irked
  Song: Psychosocial by Slipknot.
  Mood: angry mad irate vexed irritated exasperated indignant irked
  Song: Killing in the Name by Rage Against the Machine.
  Mood: Angry Mad Irate Vexed Irritated Exasperated Indignant Irked
  Song: F*ck You by CeeLo Green.
  Mood: light-hearted buoyant jolly playful upbeat
  Song: Walking on Sunshine by Katrina & The Waves.
  Mood: light-hearted buoyant jolly playful upbeat
  Song: Don't Stop Me Now by Queen.
  Mood: Light-hearted Buoyant Jolly Playful Upbeat
  Song: Dancing Queen by ABBA.
  Mood: celebrate commemorate acknowledge toast
  Song: Good as Hell by Lizzo.
  Mood: celebrate commemorate acknowledge toast
  Song: CAN'T STOP THE FEELING! by Justin Timberlake.
  Mood: Celebrate Commemorate Acknowledge Toast
  Song: Celebration by Kool & The Gang.
  Mood: funky groovy bluesy jazzy
  Song: Juice by Lizzo.
  Mood: funky groovy bluesy jazzy
  Song: Never Catch Me by Flying Lotus ft. Kendrick Lamar
  Mood: Funky Groovy Bluesy Jazzy
  Song: Give Up The Funk by Parliament Funkadelic.
  Mood: jam head bang dance
  Song: Wax Simulacra by The Mars Volta.
  Mood: jam head bang dance
  Song: Crazy Train by Ozzy Osbourne.
  Mood: Jam Head bang Dance
  Song: Bohemian Rhapsody by Queen.
  Mood: ${prompt}
  Song:`;
};
