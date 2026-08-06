import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  headingId?: string;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  headingId,
  align = 'center',
  as = 'h2',
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const Heading = as;

  return (
    <header className={cn('mb-10', align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow && (
        <p
          className={cn(
            'text-sm font-semibold tracking-[0.3em] uppercase',
            'text-primary',
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      )}

      <Heading
        id={headingId}
        className={cn('mt-3 text-4xl font-bold tracking-tight sm:text-5xl', titleClassName)}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={cn(
            'text-muted-foreground mt-5 text-lg leading-8',
            align === 'center' && 'mx-auto max-w-2xl',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
