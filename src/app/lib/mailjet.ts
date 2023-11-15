import { Client } from 'node-mailjet';
import 'server-only'

interface Message {
  From: {
    Email: string;
    Name: string;
  };
  To: {
    Email: string;
    Name: string;
  }[];
  Subject: string;
  TextPart: string;
  HTMLPart: string;
}

export default async function Send(messages: Message[]): Promise<boolean> {
  try {
    if (!process.env.MAILJET_API_KEY) throw new Error('Missing MAILJET_API_KEY env var');
    if (!process.env.MAILJET_API_SECRET) throw new Error('Missing MAILJET_API_SECRET env var');
  
    const mailjet = Client.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_API_SECRET
    );

    const resp = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: messages
    });

    console.log(resp)
    console.log(resp.response)

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}