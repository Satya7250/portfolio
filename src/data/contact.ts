import { db } from '@/db';
import { defaultContact } from '@/lib/contact';

export interface Contact {
  email: string;
}

export async function getContact(): Promise<Contact> {
  const contact = await db.query.contactInfo.findFirst();

  return contact
    ? {
        email: contact.email,
      }
    : defaultContact;
}
