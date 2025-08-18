import { OpenAI } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

if (!process.env.OPENAI_ASSISTANT_ID) {
  throw new Error('Missing OPENAI_ASSISTANT_ID environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

export default openai;