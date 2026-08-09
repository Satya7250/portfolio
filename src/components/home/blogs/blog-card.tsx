'use client';

import Link from 'next/link';
import { ArrowUpRight, RotateCwFadingClock } from 'lucide-react';
import { motion } from 'motion/react';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface BlogCardProps {
  title: string;
  description: string;
  readTime: string;
  url: string;
}

export function BlogCard({ title, description, readTime, url }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <Card className="group border-border/50 bg-card/40 h-full backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
        <CardHeader className="space-y-4">
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <RotateCwFadingClock className="size-3.5" />
            <span>{readTime}</span>
          </div>

          <h3 className="line-clamp-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-orange-300">
            {title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {description}
          </p>
        </CardContent>

        <CardFooter>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-300 transition-all hover:gap-3"
          >
            Read on Hashnode
            <ArrowUpRight className="size-4" />
          </Link>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
