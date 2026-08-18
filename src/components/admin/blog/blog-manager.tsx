"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import {
  GripVertical,
  Plus,
  Trash2,
  Loader2,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  createBlog,
  deleteBlog,
  toggleBlogVisibility,
  reorderBlogs,
} from "@/actions/blog";

type BlogRow = {
  id: string;
  slug: string;
  isVisible: boolean;
  sortOrder: number;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface BlogManagerProps {
  initialBlogs: BlogRow[];
}

export default function BlogManager({ initialBlogs }: BlogManagerProps) {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogRow[]>(
    [...initialBlogs].sort((a, b) => a.sortOrder - b.sortOrder)
  );
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [rawSlugInput, setRawSlugInput] = useState("");
  const [isCreating, startCreateTransition] = useTransition();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slugPreview = slugify(rawSlugInput);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleCreateBlog() {
    if (!slugPreview) {
      toast.error("Please enter a valid slug");
      return;
    }

    const isDuplicate = blogs.some((blog) => blog.slug === slugPreview);
    if (isDuplicate) {
      toast.error("A blog with this slug already exists");
      return;
    }

    startCreateTransition(async () => {
      try {
        await createBlog({ slug: slugPreview });
        toast.success("Blog created successfully");
        setIsCreateOpen(false);
        setRawSlugInput("");
        router.refresh();
      } catch (error) {
        toast.error("Failed to create blog");
      }
    });
  }

  function handleDeleteBlog(id: string) {
    startDeleteTransition(async () => {
      try {
        await deleteBlog(id);
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully");
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete blog");
      } finally {
        setPendingDeleteId(null);
      }
    });
  }

  async function handleToggleVisibility(id: string, nextVisible: boolean) {
    const previousBlogs = blogs;
    setTogglingId(id);
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id ? { ...blog, isVisible: nextVisible } : blog
      )
    );

    try {
      await toggleBlogVisibility(id, nextVisible);
      toast.success(
        nextVisible ? "Blog is now visible" : "Blog is now hidden"
      );
      router.refresh();
    } catch (error) {
      setBlogs(previousBlogs);
      toast.error("Failed to update visibility");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blogs.findIndex((blog) => blog.id === active.id);
    const newIndex = blogs.findIndex((blog) => blog.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(blogs, oldIndex, newIndex);
    const previousBlogs = blogs;
    setBlogs(reordered);

    try {
      await reorderBlogs(reordered.map((blog) => blog.id));
      toast.success("Blog order updated");
      router.refresh();
    } catch (error) {
      setBlogs(previousBlogs);
      toast.error("Failed to reorder blogs");
    }
  }

  function handleDialogOpenChange(open: boolean) {
    setIsCreateOpen(open);
    if (!open) {
      setRawSlugInput("");
    }
  }

  if (!mounted) return null;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-3">
          <h1 className="text-2xl font-semibold tracking-tight">Blogs</h1>
          <p className="text-sm text-muted-foreground">
            Create, reorder, and manage the visibility of your blog posts.
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Blog</DialogTitle>
              <DialogDescription>
                Enter a title or slug. It will be automatically formatted
                into a URL-friendly slug.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="blog-slug">Slug</Label>
                <Input
                  id="blog-slug"
                  placeholder="my-first-blog-post"
                  value={rawSlugInput}
                  onChange={(e) => setRawSlugInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCreateBlog();
                    }
                  }}
                  autoFocus
                />
              </div>

              <div className="rounded-md border bg-muted/40 p-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Preview
                </p>
                <p className="mt-1 truncate font-mono text-sm">
                  {slugPreview ? `/blog/${slugPreview}` : "/blog/..."}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => handleDialogOpenChange(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateBlog}
                disabled={isCreating || !slugPreview}
                className="gap-2"
              >
                {isCreating && <Loader2 className="h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">All Blogs</CardTitle>
              <CardDescription className="mt-1">
                Drag the handle to reorder how blogs appear.
              </CardDescription>
            </div>
            {blogs.length > 0 && (
              <Badge variant="outline" className="font-normal">
                {blogs.length} {blogs.length === 1 ? "blog" : "blogs"}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 ? (
            <EmptyState onCreateClick={() => setIsCreateOpen(true)} />
          ) : (
            <DndContext
              id="blog-manager-dnd-context"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blogs.map((blog) => blog.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="flex flex-col gap-2.5">
                  {blogs.map((blog, index) => (
                    <SortableBlogRow
                      key={blog.id}
                      blog={blog}
                      position={index + 1}
                      isToggling={togglingId === blog.id}
                      onToggleVisibility={handleToggleVisibility}
                      onRequestDelete={() => setPendingDeleteId(blog.id)}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this blog?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                if (pendingDeleteId) handleDeleteBlog(pendingDeleteId);
              }}
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface SortableBlogRowProps {
  blog: BlogRow;
  position: number;
  isToggling: boolean;
  onToggleVisibility: (id: string, nextVisible: boolean) => void;
  onRequestDelete: () => void;
}

function SortableBlogRow({
  blog,
  position,
  isToggling,
  onToggleVisibility,
  onRequestDelete,
}: SortableBlogRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: blog.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-lg border bg-card p-3.5 shadow-sm transition-colors hover:border-border/80 ${
        isDragging ? "z-10 border-primary/50 bg-muted/50 shadow-md" : ""
      }`}
    >
      <button
        type="button"
        className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate font-mono text-sm">{blog.slug}</span>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <Badge variant="outline" className="font-mono text-xs font-normal">
          #{position}
        </Badge>

        <Badge
          variant={blog.isVisible ? "default" : "secondary"}
          className="gap-1"
        >
          {blog.isVisible ? (
            <Eye className="h-3 w-3" />
          ) : (
            <EyeOff className="h-3 w-3" />
          )}
          {blog.isVisible ? "Visible" : "Hidden"}
        </Badge>
      </div>

      <div className="flex items-center gap-3 border-l pl-3">
        <Switch
          checked={blog.isVisible}
          disabled={isToggling}
          onCheckedChange={(checked) =>
            onToggleVisibility(blog.id, checked)
          }
          aria-label="Toggle visibility"
        />

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={onRequestDelete}
          aria-label="Delete blog"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-14 text-center">
      <div className="rounded-full bg-muted p-3">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No blogs found</p>
        <p className="text-sm text-muted-foreground">
          Get started by creating your first blog post.
        </p>
      </div>
      <Button onClick={onCreateClick} className="mt-2 gap-2">
        <Plus className="h-4 w-4" />
        Create Blog
      </Button>
    </div>
  );
}