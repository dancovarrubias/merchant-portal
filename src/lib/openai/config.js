import { OpenAI } from 'openai';

// Solo validar las variables en runtime, no durante el build
const isConfigured = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_ASSISTANT_ID);

let openai = null;

if (isConfigured) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || '';
export const isOpenAIConfigured = isConfigured;

export default openai;