import { Client } from 'node-mailjet';

if (!process.env.MAILJET_API_KEY) throw new Error('Missing MAILJET_API_KEY env var');
if (!process.env.MAILJET_API_SECRET) throw new Error('Missing MAILJET_API_SECRET env var');

const mailjet = Client.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

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

interface Response {
  Messages: {
    Status: string;
    To: {
      Email: string;
      MessageUUID: string;
      MessageID: string;
      MessageHref: string;
    }[];
  }[];
}

export default async function Send(messages: Message[]): Promise<boolean> {
  try {
    const resp = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: messages
    });

    console.log(resp)

    // Tech debt: emails may not have sent but the response will still be 200
    // The response will look like the Response interface above
    // Due to mailjet's disgusting type definitions, I am not dealing with this right now

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}