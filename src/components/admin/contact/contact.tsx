'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { updateContact } from '@/actions/contact';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactManagerProps {
  initialEmail: string;
}

export function ContactManager({ initialEmail }: ContactManagerProps) {
  const [email, setEmail] = useState(initialEmail);

  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      try {
        await updateContact(email);

        toast.success('Contact information updated.');
      } catch {
        toast.error('Failed to update contact information.');
      }
    });
  }

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>

        <CardDescription>Update the email displayed on your portfolio.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
