'use client';

import Image from 'next/image';

import { BadgeCheck, ExternalLink, FileText } from 'lucide-react';
import { motion } from 'motion/react';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Certificate } from '@/types/certificate';

interface CertificateCardProps {
  certificate: Certificate;
}

const CERTIFICATE_THEME = {
  border: 'hover:border-pink-500/30',
  shadow: 'hover:shadow-pink-500/10',
  // title: "group-hover:text-pink-300",
  badge: 'border-pink-500/20 bg-red-500/5 text-white-300',
  icon: 'text-green-400',
  link: 'text-pink-400',
};

export function CertificateCard({ certificate }: CertificateCardProps) {
  const theme = CERTIFICATE_THEME;
  const isPdf = certificate.certificateImage
    .toLowerCase()
    .split('?')[0]
    .endsWith('.pdf');

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <Card
        className={`group border-border/50 h-full overflow-hidden transition-all duration-300 ${theme.border} hover:shadow-xl ${theme.shadow}`}
      >
        <div className="relative aspect-video overflow-hidden bg-muted/40">
          {isPdf ? (
            <object
              data={certificate.certificateImage}
              type="application/pdf"
              title={`${certificate.title} PDF preview`}
              className="size-full"
            >
              <div className="text-muted-foreground flex size-full flex-col items-center justify-center gap-2 text-sm">
                <FileText className="size-8" />
                PDF certificate
              </div>
            </object>
          ) : (
            <Image
              src={certificate.certificateImage}
              alt={`${certificate.title} certificate`}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <CardHeader>
          <div className="flex items-start gap-4">
            {certificate.issuerLogo && (
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border bg-white/5 shadow-sm">
                <Image
                  src={certificate.issuerLogo}
                  alt={`${certificate.issuer} logo`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h3
                className={`line-clamp-2 text-xl leading-snug font-semibold tracking-tight transition-colors`}
              >
                {certificate.title}
              </h3>

              <p className="text-muted-foreground mt-1.5 text-sm font-medium">
                {certificate.issuer}
              </p>

              <p className="text-muted-foreground/70 mt-1 text-xs tracking-wide">
                Issued {certificate.issueDate}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${theme.badge}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {certificate.credentialId && (
            <div className="bg-muted/40 text-muted-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm">
              <BadgeCheck className={`size-4 shrink-0 ${theme.icon}`} />
              <span className="truncate font-mono text-xs">{certificate.credentialId}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <a
              href={certificate.certificateImage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="size-4" />
              Preview certificate
            </a>
          </Button>

          {certificate.verifyUrl && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-pink-500/20 bg-pink-500/10 px-3 py-2 text-sm font-medium text-pink-300 shadow-sm transition-all hover:scale-[1.02] hover:bg-pink-500/20 active:scale-[0.98]"
            >
              <BadgeCheck className="size-4" />
              Verify
            </a>
          )}

          {certificate.certificateUrl && (
            <a
              href={certificate.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink className="size-4" />
              Certificate
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.article>
  );
}
