'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Loader2,
  Save,
  UploadCloud,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  GripVertical,
  ExternalLink,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'sonner';

import { upsertProject, deleteProject } from '@/actions/projects';
import { PROJECT_THEMES } from '@/lib/project-theme';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const THEME_KEYS = Object.keys(PROJECT_THEMES);

// Shape returned from the DB (mirrors the `projects` table in schema.ts).
export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  repoUrl: string | null;
  demoUrl: string | null;
  colorTheme: string;
  sortOrder: number;
  isPublished: boolean;
};

type FormState = {
  id: string | null;
  slug: string;
  title: string;
  description: string;
  tags: string;
  repoUrl: string;
  demoUrl: string;
  colorTheme: string;
  isPublished: boolean;
};

const EMPTY_FORM: FormState = {
  id: null,
  slug: '',
  title: '',
  description: '',
  tags: '',
  repoUrl: '',
  demoUrl: '',
  colorTheme: THEME_KEYS[0] ?? 'purple',
  isPublished: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ProjectManager({ projects }: { projects: ProjectRow[] }) {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [items, setItems] = React.useState<ProjectRow[]>(
    [...projects].sort((a, b) => a.sortOrder - b.sortOrder),
  );

  React.useEffect(() => {
    setItems([...projects].sort((a, b) => a.sortOrder - b.sortOrder));
  }, [projects]);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<ProjectRow | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [slugTouched, setSlugTouched] = React.useState(false);

  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const isEditing = form.id !== null;

  const openCreateDialog = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setPreviewUrl(null);
    setSlugTouched(false);
    setDialogOpen(true);
  };

  const openEditDialog = (project: ProjectRow) => {
    setForm({
      id: project.id,
      slug: project.slug,
      title: project.title,
      description: project.description,
      tags: project.tags.join(', '),
      repoUrl: project.repoUrl ?? '',
      demoUrl: project.demoUrl ?? '',
      colorTheme: project.colorTheme,
      isPublished: project.isPublished,
    });
    setImageFile(null);
    setPreviewUrl(project.image);
    setSlugTouched(true);
    setDialogOpen(true);
  };

  const updateField =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : slugify(title),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Image size exceeds 10MB limit.');
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.description.trim()) {
      toast.error('Title, slug, and description are required.');
      return;
    }

    if (!previewUrl && !imageFile) {
      toast.error('Please upload a project image.');
      return;
    }

    const duplicateSlug = items.some((p) => p.slug === form.slug.trim() && p.id !== form.id);
    if (duplicateSlug) {
      toast.error('A project with this slug already exists.');
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();

      if (form.id) formData.append('id', form.id);
      formData.append('slug', form.slug.trim());
      formData.append('title', form.title.trim());
      formData.append('description', form.description.trim());
      formData.append(
        'tags',
        JSON.stringify(
          form.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        ),
      );
      formData.append('repoUrl', form.repoUrl.trim());
      formData.append('demoUrl', form.demoUrl.trim());
      formData.append('colorTheme', form.colorTheme);
      formData.append('isPublished', String(form.isPublished));
      formData.append(
        'sortOrder',
        String(
          isEditing
            ? (items.find((p) => p.id === form.id)?.sortOrder ?? items.length)
            : items.length,
        ),
      );

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const result = await upsertProject(formData);

      if (result?.success) {
        toast.success(isEditing ? 'Project updated.' : 'Project created.');
        setDialogOpen(false);
        router.refresh();
      } else {
        toast.error('Failed to save project. Please try again.');
      }
    } catch (error: any) {
      console.error('Project save error:', error);
      toast.error(error?.message || 'An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      const result = await deleteProject(deleteTarget.id);

      if (result?.success) {
        toast.success('Project deleted.');
        setItems((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error('Failed to delete project. Please try again.');
      }
    } catch (error: any) {
      console.error('Project delete error:', error);
      toast.error(error?.message || 'An unexpected error occurred.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async (project: ProjectRow) => {
    const nextValue = !project.isPublished;

    setItems((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, isPublished: nextValue } : p)),
    );

    try {
      const formData = new FormData();
      formData.append('id', project.id);
      formData.append('slug', project.slug);
      formData.append('title', project.title);
      formData.append('description', project.description);
      formData.append('tags', JSON.stringify(project.tags));
      formData.append('repoUrl', project.repoUrl ?? '');
      formData.append('demoUrl', project.demoUrl ?? '');
      formData.append('colorTheme', project.colorTheme);
      formData.append('isPublished', String(nextValue));
      formData.append('sortOrder', String(project.sortOrder));

      const result = await upsertProject(formData);
      if (!result?.success) throw new Error();
      router.refresh();
    } catch {
      // revert on failure
      setItems((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, isPublished: project.isPublished } : p)),
      );
      toast.error('Failed to update visibility.');
    }
  };

  const handleReorder = async (project: ProjectRow, direction: 'up' | 'down') => {
    const index = items.findIndex((p) => p.id === project.id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];
    const withSortOrder = reordered.map((p, i) => ({ ...p, sortOrder: i }));
    setItems(withSortOrder);

    try {
      await Promise.all(
        withSortOrder.map((p) => {
          const formData = new FormData();
          formData.append('id', p.id);
          formData.append('slug', p.slug);
          formData.append('title', p.title);
          formData.append('description', p.description);
          formData.append('tags', JSON.stringify(p.tags));
          formData.append('repoUrl', p.repoUrl ?? '');
          formData.append('demoUrl', p.demoUrl ?? '');
          formData.append('colorTheme', p.colorTheme);
          formData.append('isPublished', String(p.isPublished));
          formData.append('sortOrder', String(p.sortOrder));
          return upsertProject(formData);
        }),
      );
      router.refresh();
    } catch {
      toast.error('Failed to save new order.');
      setItems(items);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-muted-foreground text-sm">
            Manage the projects shown in your portfolio.
          </p>
        </div>
        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="size-4" />
          Add project
        </Button>
      </div>

      {items.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="text-muted-foreground py-12 text-center text-sm">
            No projects yet. Add your first project to show it on your portfolio.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((project, index) => {
            const theme = PROJECT_THEMES[project.colorTheme];
            return (
              <Card key={project.id} className="border shadow-sm">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex shrink-0 flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => handleReorder(project, 'up')}
                      disabled={index === 0}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ArrowUp className="size-3.5" />
                    </button>
                    <GripVertical className="text-muted-foreground/40 mx-auto size-3.5" />
                    <button
                      type="button"
                      onClick={() => handleReorder(project, 'down')}
                      disabled={index === items.length - 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ArrowDown className="size-3.5" />
                    </button>
                  </div>

                  <div className="bg-muted/40 relative size-16 shrink-0 overflow-hidden rounded-lg border">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-medium">{project.title}</h3>
                      {theme && (
                        <span
                          className={`size-2.5 rounded-full border ${theme.border} bg-linear-to-br ${theme.from} ${theme.to}`}
                        />
                      )}
                      {!project.isPublished && (
                        <Badge variant="outline" className="text-xs">
                          Draft
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground truncate text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 4 && (
                        <Badge variant="secondary" className="text-xs font-normal">
                          +{project.tags.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    {project.demoUrl && (
                      <Button asChild variant="ghost" size="icon">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open live demo"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button asChild variant="ghost" size="icon">
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open repository"
                        >
                          <FaGithub className="size-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2 border-l pl-3">
                    <Switch
                      checked={project.isPublished}
                      onCheckedChange={() => handleTogglePublish(project)}
                      aria-label="Toggle published"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(project)}
                      aria-label="Edit project"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(project)}
                      aria-label="Delete project"
                    >
                      <Trash2 className="text-destructive size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit project' : 'Add project'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Update the details for this project.'
                : 'Add a new project to your portfolio.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isSaving}
              />
              <div className="flex items-center gap-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-muted-foreground/25 hover:border-primary/50 bg-muted/40 relative flex h-24 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors"
                >
                  {previewUrl ? (
                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                  ) : (
                    <UploadCloud className="text-muted-foreground size-6" />
                  )}
                </div>
                <div className="space-y-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSaving}
                  >
                    Upload image
                  </Button>
                  <p className="text-muted-foreground text-xs">PNG or JPG, up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="TopDo"
                  disabled={isSaving}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    updateField('slug')(e);
                  }}
                  placeholder="topdo"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={updateField('description')}
                rows={3}
                placeholder="A modern productivity platform for organizing tasks..."
                disabled={isSaving}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={form.tags}
                onChange={updateField('tags')}
                placeholder="Next.js, TypeScript, Tailwind CSS"
                disabled={isSaving}
              />
              <p className="text-muted-foreground text-xs">Comma-separated.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="repoUrl">Repository URL</Label>
                <Input
                  id="repoUrl"
                  value={form.repoUrl}
                  onChange={updateField('repoUrl')}
                  placeholder="https://github.com/you/repo"
                  disabled={isSaving}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="demoUrl">Live demo URL</Label>
                <Input
                  id="demoUrl"
                  value={form.demoUrl}
                  onChange={updateField('demoUrl')}
                  placeholder="https://yourproject.com"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="colorTheme">Color theme</Label>
                <Select
                  value={form.colorTheme}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, colorTheme: value }))}
                  disabled={isSaving}
                >
                  <SelectTrigger id="colorTheme">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {THEME_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2 capitalize">
                          <span
                            className={`size-2.5 rounded-full bg-linear-to-br ${PROJECT_THEMES[key].from} ${PROJECT_THEMES[key].to} border ${PROJECT_THEMES[key].border}`}
                          />
                          {key}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="isPublished">Visibility</Label>
                <div className="flex h-9 items-center gap-2">
                  <Switch
                    id="isPublished"
                    checked={form.isPublished}
                    onCheckedChange={(checked) =>
                      setForm((prev) => ({ ...prev, isPublished: checked }))
                    }
                    disabled={isSaving}
                  />
                  <span className="text-muted-foreground text-sm">
                    {form.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="button" className="gap-2" onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  {isEditing ? 'Save changes' : 'Create project'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `"${deleteTarget.title}" will be permanently removed from your portfolio. This can't be undone.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
