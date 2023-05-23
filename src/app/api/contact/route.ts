import { NextResponse } from 'next/server';
import { createIdentifier, verifyIdentifier } from '@/lib/identifiers';
import Send from '@/lib/mailjet';

export async function GET() {
  return NextResponse.json({ error: "Unknown error", success: false });
  // try {
  //   const id = await createIdentifier();

  //   return NextResponse.json({ hash: id, timestamp: Date.now(), success: true });
  // } catch (error) {
  //   return NextResponse.json({ error: "Something went wrong", success: false });
  // }
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { id, fax, name, email, message } = res;

    const timestamp = await verifyIdentifier(id);
    const currentTimestamp = Date.now();

    const difference = currentTimestamp - parseInt(timestamp);

    // If the difference is less than 10 seconds, return an error. This is likely a bot.
    if (difference < 10000) return NextResponse.json({ error: "Unknown error", success: false });

    // If the fax field exists, this is likely a bot
    if (fax) return NextResponse.json({ error: "Unknown error", success: false });

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

    return NextResponse.json({ success: true });
  } catch (error) {
    // Tech debt: we don't guarantee this to be a transactional operation, we just do everything under the same try/catch
    // Other tech debt: we don't guarantee that the email will send, but we return a success response anyway
    return NextResponse.json({ error: "Something went wrong", success: false });
  }
}