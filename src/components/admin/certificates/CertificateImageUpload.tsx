'use client';

import * as React from 'react';
import Image from 'next/image';
import { FileText, ImagePlus, Loader2, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { deleteCertificateImage, uploadCertificate } from '@/actions/certificate';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_CERTIFICATE_TYPES = 'image/jpeg,image/png,image/webp,application/pdf';

interface CertificateImageUploadProps {
  value: string;
  onChange: (url: string, publicId: string | null) => void;
  disabled?: boolean;
}

export function CertificateImageUpload({
  value,
  onChange,
  disabled = false,
}: CertificateImageUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [progress, setProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isRemoving, setIsRemoving] = React.useState(false);
  const [uploadedPublicId, setUploadedPublicId] = React.useState<string | null>(null);

  const handleUpload = (file: File) => {
    const isPdf = file.type === 'application/pdf';
    if (!file.type.startsWith('image/') && !isPdf) {
      toast.error('Please choose an image or PDF file.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Image size must be less than 10MB.');
      return;
    }

    const previousPublicId = uploadedPublicId;
    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);
    setProgress(10);

    void uploadCertificate(formData)
      .then((result) => {
        setUploadedPublicId(result.public_id);
        onChange(result.secure_url, result.public_id);
        setProgress(100);

        if (previousPublicId && previousPublicId !== result.public_id) {
          void deleteCertificateImage(previousPublicId).catch(() => undefined);
        }
        toast.success('Certificate uploaded.');
      })
      .catch((error: unknown) => {
        toast.error(error instanceof Error ? error.message : 'Certificate upload failed.');
      })
      .finally(() => setIsUploading(false));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) handleUpload(file);
  };

  const isPdf = value.toLowerCase().split('?')[0].endsWith('.pdf');

  const handleRemove = async () => {
    if (isUploading) {
      return;
    }

    setIsRemoving(true);
    try {
      if (uploadedPublicId) {
        await deleteCertificateImage(uploadedPublicId);
      }
      setUploadedPublicId(null);
      onChange('', null);
      setProgress(0);
    } catch {
      toast.error('Unable to remove the uploaded image.');
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="certificate-image">Certificate image</Label>
      <div className="rounded-xl border border-dashed p-3">
        {value ? (
          <div className="space-y-3">
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg">
              {isPdf ? (
                <object
                  data={value}
                  type="application/pdf"
                  title="Certificate PDF preview"
                  className="size-full"
                >
                  <div className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center">
                    <FileText className="size-8" />
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm underline underline-offset-4"
                    >
                      Open PDF preview
                    </a>
                  </div>
                </object>
              ) : (
                <Image
                  src={value}
                  alt="Certificate preview"
                  fill
                  unoptimized
                  className="object-contain"
                />
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled || isUploading || isRemoving}
                onClick={() => inputRef.current?.click()}
              >
                <Upload />
                Replace file
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={disabled || isRemoving}
                onClick={() => void handleRemove()}
              >
                {isRemoving ? <Loader2 className="animate-spin" /> : <Trash2 />}
                {isUploading ? 'Cancel upload' : 'Remove'}
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring flex min-h-40 w-full flex-col items-center justify-center gap-2 rounded-lg px-4 text-center transition-colors focus-visible:ring-2 focus-visible:outline-none"
            disabled={disabled || isUploading}
            onClick={() => inputRef.current?.click()}
            aria-describedby="certificate-image-help"
          >
            {isUploading ? (
              <Loader2 className="size-7 animate-spin" />
            ) : (
              <ImagePlus className="size-7" />
            )}
            <span className="text-sm font-medium">
              {isUploading ? `Uploading ${progress}%` : 'Choose certificate file'}
            </span>
            <span id="certificate-image-help" className="text-xs">
              JPG, PNG, WebP, or PDF up to 10MB
            </span>
          </button>
        )}
        {isUploading && (
          <div className="mt-3 space-y-1" aria-live="polite">
            <Progress value={progress} aria-label={`Upload progress: ${progress}%`} />
            <p className="text-muted-foreground text-xs">Uploading {progress}%</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        id="certificate-image"
        type="file"
        accept={ACCEPTED_CERTIFICATE_TYPES}
        className="sr-only"
        disabled={disabled || isUploading}
        onChange={handleFileChange}
      />
    </div>
  );
}
