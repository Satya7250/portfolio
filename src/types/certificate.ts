export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string | null;

  issuerLogo?: string;
  credentialId?: string;
  skills?: string[];

  verifyUrl?: string | null;
  certificateUrl?: string;
  certificateImage: string;

  isPublished: boolean;
  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}
