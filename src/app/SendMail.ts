"use server";

import { verifyIdentifier } from '@/app/lib/identifiers';
import Send from '@/app/lib/mailjet';

export async function sendMail({ id, fax, name, email, message }: { id: string, fax: string, name: string, email: string, message: string }) {
  try {
    const timestamp = await verifyIdentifier(id);
    const currentTimestamp = Date.now();

    const difference = currentTimestamp - parseInt(timestamp);

    // If the difference is less than 3 seconds, return an error. This is likely a bot.
    if (difference < 3000) return false;

    // If the fax field exists, this is likely a bot
    if (fax) return false;

    await Send([
      {
        From: {
          Email: 'noreply@iodinedev.com',
          Name: 'Postman'
        },
        To: [
          {
            Email: 'mailbox@zachmontgomery.com',
            Name: 'Zachary Montgomery'
          }
        ],
        Subject: 'New message at zachmontgomery.com',
        TextPart: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        HTMLPart: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
      }
    ]);

    return true;
  } catch (error) {
    // Tech debt: we don't guarantee this to be a transactional operation, we just do everything under the same try/catch
    // Other tech debt: we don't guarantee that the email will send, but we return a success response anyway
    console.log("Failed to send email", error);
    return false;
  }
}