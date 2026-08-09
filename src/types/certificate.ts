// types/certificate.ts

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  credentialId?: string;
  skills: string[];
  verifyUrl?: string;
  certificateUrl?: string;
}
