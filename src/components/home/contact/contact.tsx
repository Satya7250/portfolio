'use client';

import { motion } from 'motion/react';
import { Mail, ArrowUpRight } from 'lucide-react';

import { contact } from '@/lib/contact';
import { Card, CardContent } from '@/components/ui/card';

const THEME = {
  card: 'bg-card/60 border-border/50 hover:border-primary/30',

  icon: 'bg-primary/10 border-primary/20 text-primary',

  glow: 'bg-primary/10',

  hoverText: 'group-hover:text-primary',
};

export default function ContactSection() {
  const mailtoLink = `mailto:${contact.email}?subject=Portfolio Inquiry`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl"
    >
      <a href={mailtoLink} aria-label={`Send an email to ${contact.email}`} className="block">
        <Card
          className={`group relative overflow-hidden ${THEME.card} backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
        >
          {/* Glow */}
          <div
            className={`absolute top-1/2 -left-20 h-40 w-40 -translate-y-1/2 rounded-full ${THEME.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
          />

          <div
            className={`absolute top-1/2 -right-20 h-40 w-40 -translate-y-1/2 rounded-full ${THEME.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
          />

          <CardContent className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`rounded-xl border p-3 ${THEME.icon} `}>
                  <Mail className="h-5 w-5" />
                </div>

                <span className="text-lg font-medium tracking-tight">{contact.email}</span>
              </div>

              <ArrowUpRight
                className={`text-muted-foreground h-5 w-5 transition-all duration-300 ${THEME.hoverText} group-hover:translate-x-1 group-hover:-translate-y-1`}
              />
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}
