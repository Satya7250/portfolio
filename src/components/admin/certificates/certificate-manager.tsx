'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  FileBadge,
  GripVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

import { deleteCertificate, togglePublish, updateCertificateOrder } from '@/actions/certificate';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CertificateForm } from '@/components/admin/certificates/certificate-form';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string | null;
  certificateImage: string;
  verifyUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CertificationManagerProps {
  initialCertifications: Certification[];
}

export function CertificationManager({ initialCertifications }: CertificationManagerProps) {
  const [certifications, setCertifications] = React.useState(() =>
    [...initialCertifications].sort((a, b) => a.sortOrder - b.sortOrder),
  );
  const [search, setSearch] = React.useState('');
  const [deleteTarget, setDeleteTarget] = React.useState<Certification | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState<string | null>(null);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingCertificate, setEditingCertificate] = React.useState<Certification | null>(null);

  const filteredCertifications = certifications.filter((certificate) => {
    const query = search.trim().toLowerCase();
    return (
      !query ||
      certificate.title.toLowerCase().includes(query) ||
      certificate.issuer.toLowerCase().includes(query)
    );
  });

  const handleTogglePublish = async (certificate: Certification) => {
    const isPublished = !certificate.isPublished;
    setIsUpdating(certificate.id);
    setCertifications((current) =>
      current.map((item) => (item.id === certificate.id ? { ...item, isPublished } : item)),
    );

    try {
      await togglePublish(certificate.id, isPublished);
      toast.success(isPublished ? 'Certificate published.' : 'Certificate unpublished.');
    } catch {
      setCertifications((current) =>
        current.map((item) =>
          item.id === certificate.id ? { ...item, isPublished: certificate.isPublished } : item,
        ),
      );
      toast.error('Unable to update certificate visibility.');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleReorder = async (certificate: Certification, direction: 'up' | 'down') => {
    const index = certifications.findIndex((item) => item.id === certificate.id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= certifications.length) return;

    const reordered = [...certifications];
    [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];
    const withSortOrder = reordered.map((item, itemIndex) => ({
      ...item,
      sortOrder: itemIndex,
    }));
    setCertifications(withSortOrder);

    try {
      await updateCertificateOrder(withSortOrder.map(({ id, sortOrder }) => ({ id, sortOrder })));
    } catch {
      setCertifications(certifications);
      toast.error('Unable to save certificate order.');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const removed = deleteTarget;
    setIsDeleting(true);
    setCertifications((current) => current.filter(({ id }) => id !== removed.id));
    setDeleteTarget(null);

    try {
      await deleteCertificate(removed.id);
      toast.success('Certificate deleted.');
    } catch {
      setCertifications((current) =>
        [...current, removed].sort((a, b) => a.sortOrder - b.sortOrder),
      );
      toast.error('Unable to delete certificate.');
    } finally {
      setIsDeleting(false);
    }
  };

  const openCreateForm = () => {
    setEditingCertificate(null);
    setFormOpen(true);
  };

  const openEditForm = (certificate: Certification) => {
    setEditingCertificate(certificate);
    setFormOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Certificates</h2>
          <p className="text-muted-foreground text-sm">
            Manage the certificates shown in your portfolio.
          </p>
        </div>
        <Button className="gap-2 self-start" onClick={openCreateForm}>
          <Plus className="size-4" />
          Add certificate
        </Button>
      </div>

      {certifications.length > 0 && (
        <div className="relative max-w-md">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search certificates..."
            aria-label="Search certificates"
            className="pl-9"
          />
        </div>
      )}

      {certifications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <FileBadge className="text-muted-foreground mb-4 size-10" />
            <p className="font-medium">No certificates yet.</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Add your first certificate to show it on your portfolio.
            </p>
          </CardContent>
        </Card>
      ) : filteredCertifications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="text-muted-foreground py-12 text-center text-sm">
            No certificates match your search.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredCertifications.map((certificate) => {
            const index = certifications.findIndex((item) => item.id === certificate.id);
            return (
              <Card key={certificate.id} className="border shadow-sm">
                <CardContent className="flex flex-wrap items-center gap-4 py-4">
                  <div className="flex shrink-0 flex-col gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => void handleReorder(certificate, 'up')}
                      disabled={index === 0}
                      aria-label={`Move ${certificate.title} up`}
                    >
                      <ArrowUp />
                    </Button>
                    <GripVertical className="text-muted-foreground/40 mx-auto size-3.5" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => void handleReorder(certificate, 'down')}
                      disabled={index === certifications.length - 1}
                      aria-label={`Move ${certificate.title} down`}
                    >
                      <ArrowDown />
                    </Button>
                  </div>

                  <div className="bg-muted/40 relative size-16 shrink-0 overflow-hidden rounded-lg border">
                    <Image
                      src={certificate.certificateImage}
                      alt={certificate.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-medium">{certificate.title}</h3>
                      <Badge variant={certificate.isPublished ? 'default' : 'outline'}>
                        {certificate.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground truncate text-sm">
                      {certificate.issuer}
                      {certificate.issueDate ? ` · ${certificate.issueDate}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {certificate.verifyUrl && (
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        aria-label="Open verification link"
                      >
                        <a href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink />
                        </a>
                      </Button>
                    )}
                    <Switch
                      checked={certificate.isPublished}
                      onCheckedChange={() => void handleTogglePublish(certificate)}
                      disabled={isUpdating === certificate.id}
                      aria-label={`Toggle ${certificate.title} published status`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Edit ${certificate.title}`}
                      onClick={() => openEditForm(certificate)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(certificate)}
                      aria-label={`Delete ${certificate.title}`}
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete certificate?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes {deleteTarget?.title ?? 'this certificate'}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                void handleDelete();
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingCertificate(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCertificate ? 'Edit certificate' : 'Add certificate'}</DialogTitle>
            <DialogDescription>
              {editingCertificate
                ? 'Update the details for this certificate.'
                : 'Add a certificate to your portfolio.'}
            </DialogDescription>
          </DialogHeader>
          <CertificateForm
            certificate={editingCertificate ?? undefined}
            onSaved={() => {
              setFormOpen(false);
              setEditingCertificate(null);
              window.location.reload();
            }}
            onCancel={() => {
              setFormOpen(false);
              setEditingCertificate(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CertificationManager;
