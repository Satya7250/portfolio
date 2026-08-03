// import { FileText } from "lucide-react";
// import OrbitFeatures from "@/components/home/orbit";

// export default function Home() {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-background">
//       <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-16 px-6 py-24 md:flex-row md:items-center md:justify-between md:gap-12">
//         {/* ---------------- Left: identity + resume ---------------- */}
//         <div className="flex max-w-md flex-col items-center gap-8 text-center md:items-start md:text-left">
//           <div>
//             <p className="text-sm font-medium tracking-wide text-muted-foreground">
//               Hi, I&apos;m
//             </p>
//             <h1 className="mt-2 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
//               Satya Prakash
//             </h1>
//             <p className="mt-4 text-base leading-relaxed text-muted-foreground">
//               Full-stack developer building modern web, AI-powered, and
//               mobile applications end-to-end.
//             </p>
//           </div>

//           <a
//             href="/resume.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/40 hover:bg-card hover:shadow-[0_0_40px_-12px_rgba(52,211,153,0.4)]"
//           >
//             <FileText className="h-4 w-4 text-emerald-400" />
//             View Resume
//           </a>
//         </div>

//         {/* ---------------- Right: orbit visualization ---------------- */}
//         <OrbitFeatures />
//       </div>
//     </main>
//   );
// }

import HeroText from "@/components/home/heroText";
import OrbitFeatures from "@/components/home/orbit";
import { getProfile } from "@/lib/profile";

export default async function Home() {
  const profile = await getProfile();

  return (
    <main className="relative overflow-hidden bg-background">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div className="grid w-full items-center gap-20 lg:grid-cols-2">
          {/* Left */}
          <HeroText profile={profile} />

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <OrbitFeatures />
          </div>
        </div>
      </section>
    </main>
  );
}
