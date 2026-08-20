import { Certificate } from '@/types/certificate';
import { CertificateCard } from './certificate-card';

interface CertificationsSectionProps {
  certificates: readonly Certificate[];
}

export function CertificationsSection({ certificates }: CertificationsSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {certificates.map((certificate) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
}
