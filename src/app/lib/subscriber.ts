"use server";

import { PrismaClient } from '@prisma/client';
import { verifyIdentifier } from './identifiers';
import 'server-only'
import { prisma } from './prisma';

export async function addSubcriber(prevState: any, data: FormData): Promise<{ message: string, success: boolean }> {
  const name = data.get('name');
  const email = data.get('email');
  const fax = data.get('fax');

  if (!name || !email || typeof name !== 'string' || typeof email !== 'string') {
    return { message: 'An error occurred while adding the subscriber.', success: false };
  }

  // If the fax field exists, this is likely a bot
  if (fax) return { success: false, message: 'An error occurred while adding the subscriber.' };

  if (name.length === 0 || email.length === 0) {
    return { success: false, message: 'An error occurred while adding the subscriber.' };
  }

  try {
    await prisma.subscriber.findUnique({
      where: {
        email
      }
    })

    if (!prevState) {
      return { success: false, message: 'You\'ve already subscribed!' };
    }

    await prisma.subscriber.create({
      data: {
        name,
        email
      }
    });

    return { success: true, message: 'Successfully added subscriber.' };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while adding the subscriber.', success: false };
  }
}