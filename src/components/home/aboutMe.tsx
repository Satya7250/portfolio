import Image from 'next/image';
import GradientCard from '@/components/home/aboutCard';

interface AboutMeProps {
  imageSrc: string;
  imageAlt: string;
  intro: string;
  name: string;
  role: string;
  bio: string;
}

export default function AboutMe({ imageSrc, imageAlt, intro, name, role, bio }: AboutMeProps) {
  return (
    <GradientCard
      left={
        <figure className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width:1024px) 420px, (min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      }
      right={
        <article className="max-w-xl">
          <p className="text-sm font-medium tracking-wide text-emerald-600">{intro}</p>

          <h3 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{name}</h3>

          <p className="mt-3 text-lg font-medium text-emerald-500">{role}</p>

          <p className="mt-6 text-base leading-8 text-slate-700 dark:text-slate-300">{bio}</p>
        </article>
      }
    />
  );
}
