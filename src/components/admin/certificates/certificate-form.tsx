"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  createCertificate,
  deleteCertificateImage,
  updateCertificate,
} from "@/actions/certificate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CertificateImageUpload } from "@/components/admin/certificates/CertificateImageUpload";
import type { Certificate } from "@/types/certificate";

interface CertificateFormProps {
  certificate?: Certificate;
  onSaved?: () => void;
  onCancel?: () => void;
}

export function CertificateForm({
  certificate,
  onSaved,
  onCancel,
}: CertificateFormProps) {
  const router = useRouter();
  const [title, setTitle] = React.useState(certificate?.title ?? "");
  const [issuer, setIssuer] = React.useState(certificate?.issuer ?? "");
  const [issueDate, setIssueDate] = React.useState(certificate?.issueDate ?? "");
  const [certificateImage, setCertificateImage] = React.useState(
    certificate?.certificateImage ?? "",
  );
  const [imagePublicId, setImagePublicId] = React.useState<string | null>(null);
  const [verifyUrl, setVerifyUrl] = React.useState(certificate?.verifyUrl ?? "");
  const [isPublished, setIsPublished] = React.useState(
    certificate?.isPublished ?? true,
  );
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !issuer.trim() || !certificateImage) {
      toast.error("Title, issuer, and certificate image are required.");
      return;
    }

    setIsSaving(true);
    try {
      if (certificate) {
        await updateCertificate({
          id: certificate.id,
          title: title.trim(),
          issuer: issuer.trim(),
          issueDate: issueDate.trim() || undefined,
          certificateImage,
          verifyUrl: verifyUrl.trim() || undefined,
          isPublished,
        });
      } else {
        await createCertificate({
          title: title.trim(),
          issuer: issuer.trim(),
          issueDate: issueDate.trim() || undefined,
          certificateImage,
          verifyUrl: verifyUrl.trim() || undefined,
        });
      }

      toast.success(certificate ? "Certificate updated." : "Certificate created.");
      if (onSaved) {
        onSaved();
      } else {
        router.push("/admin/dashboard/certificates");
        router.refresh();
      }
    } catch (error) {
      if (imagePublicId) {
        await deleteCertificateImage(imagePublicId).catch(() => undefined);
        setImagePublicId(null);
      }
      toast.error(error instanceof Error ? error.message : "Unable to save certificate.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="certificate-title">Title</Label>
              <Input
                id="certificate-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Full Stack Web Development"
                required
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certificate-issuer">Issuer</Label>
              <Input
                id="certificate-issuer"
                value={issuer}
                onChange={(event) => setIssuer(event.target.value)}
                placeholder="ChaiCode"
                required
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificate-issue-date">Issue date</Label>
            <Input
              id="certificate-issue-date"
              value={issueDate}
              onChange={(event) => setIssueDate(event.target.value)}
              placeholder="September 2025"
              disabled={isSaving}
            />
          </div>

          <CertificateImageUpload
            value={certificateImage}
            onChange={(url, publicId) => {
              setCertificateImage(url);
              setImagePublicId(publicId);
            }}
            disabled={isSaving}
          />

          <div className="space-y-2">
            <Label htmlFor="certificate-verify-url">Verification URL</Label>
            <Input
              id="certificate-verify-url"
              type="url"
              value={verifyUrl}
              onChange={(event) => setVerifyUrl(event.target.value)}
              placeholder="https://..."
              disabled={isSaving}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
            <div>
              <Label htmlFor="certificate-published">Published</Label>
              <p className="text-muted-foreground mt-1 text-sm">
                Show this certificate on the public portfolio.
              </p>
            </div>
            <Switch
              id="certificate-published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
              disabled={isSaving}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => {
                if (onCancel) {
                  onCancel();
                } else {
                  router.push("/admin/dashboard/certificates");
                }
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving || !certificateImage}>
              {isSaving && <Loader2 className="animate-spin" />}
              {isSaving ? "Saving..." : certificate ? "Update certificate" : "Create certificate"}
            </Button>
          </div>
        </form>
  );
}
