'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Loader2,
  Pencil,
  Plus,
  Trash2,
  GripVertical,
  Check,
  ChevronsUpDown,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  createTechStackItem,
  updateTechStackItem,
  deleteTechStackItem,
} from '@/actions/tech-stack';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import TechIcon from '@/components/home/stack/techIcon';

type TechStackItem = {
  id: string;
  name: string;
  icon: string;
  category: string;
  brandColor: string | null;
  sortOrder: number;
};

// Every slug TechIcon actually recognizes, grouped the way your live
// tech stack section is organized. Picking one here guarantees the icon
// renders correctly — no typo-guessing possible.
const ICON_GROUPS: { category: string; icons: { slug: string; label: string }[] }[] = [
  {
    category: 'Languages',
    icons: [
      { slug: 'javascript', label: 'JavaScript' },
      { slug: 'typescript', label: 'TypeScript' },
      { slug: 'java', label: 'Java' },
      { slug: 'cpp', label: 'C++' },
      { slug: 'c', label: 'C' },
      { slug: 'csharp', label: 'C#' },
      { slug: 'python', label: 'Python' },
      { slug: 'rust', label: 'Rust' },
      { slug: 'go', label: 'Go' },
      { slug: 'kotlin', label: 'Kotlin' },
      { slug: 'swift', label: 'Swift' },
    ],
  },
  {
    category: 'Frontend',
    icons: [
      { slug: 'html', label: 'HTML5' },
      { slug: 'css', label: 'CSS3' },
      { slug: 'nextjs', label: 'Next.js' },
      { slug: 'react', label: 'React' },
      { slug: 'tailwind', label: 'Tailwind CSS' },
      { slug: 'framer', label: 'Motion (Framer)' },
      { slug: 'shadcn', label: 'shadcn/ui' },
      { slug: 'tanstack', label: 'TanStack Query' },
      { slug: 'zustand', label: 'Zustand' },
      { slug: 'vue', label: 'Vue' },
      { slug: 'angular', label: 'Angular' },
      { slug: 'svelte', label: 'Svelte' },
      { slug: 'flutter', label: 'Flutter' },
    ],
  },
  {
    category: 'Backend',
    icons: [
      { slug: 'nodejs', label: 'Node.js' },
      { slug: 'express', label: 'Express' },
      { slug: 'springboot', label: 'Spring Boot' },
      { slug: 'trpc', label: 'tRPC' },
      { slug: 'graphql', label: 'GraphQL' },
      { slug: 'prisma', label: 'Prisma' },
      { slug: 'fastapi', label: 'FastAPI' },
    ],
  },
  {
    category: 'Database',
    icons: [
      { slug: 'postgresql', label: 'PostgreSQL' },
      { slug: 'mysql', label: 'MySQL' },
      { slug: 'mongodb', label: 'MongoDB' },
      { slug: 'redis', label: 'Redis' },
      { slug: 'supabase', label: 'Supabase' },
      { slug: 'firebase', label: 'Firebase' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icons: [
      { slug: 'git', label: 'Git' },
      { slug: 'github', label: 'GitHub' },
      { slug: 'githubactions', label: 'GitHub Actions' },
      { slug: 'docker', label: 'Docker' },
      { slug: 'kubernetes', label: 'Kubernetes' },
      { slug: 'vercel', label: 'Vercel' },
      { slug: 'netlify', label: 'Netlify' },
      { slug: 'turborepo', label: 'Turborepo' },
      { slug: 'aws', label: 'AWS' },
      { slug: 'gcp', label: 'Google Cloud' },
      { slug: 'linux', label: 'Linux' },
      { slug: 'nginx', label: 'Nginx' },
      { slug: 'figma', label: 'Figma' },
      { slug: 'postman', label: 'Postman' },
      { slug: 'vscode', label: 'VS Code' },
    ],
  },
  {
    category: 'AI & ML',
    icons: [
      { slug: 'openai', label: 'OpenAI' },
      { slug: 'langchain', label: 'LangChain' },
      { slug: 'vercelai', label: 'Vercel AI SDK' },
      { slug: 'pinecone', label: 'Pinecone' },
      { slug: 'tensorflow', label: 'TensorFlow' },
      { slug: 'pytorch', label: 'PyTorch' },
    ],
  },
  {
    category: 'Data Structures & Algorithms',
    icons: [
      { slug: 'arraysstrings', label: 'Arrays & Strings' },
      { slug: 'treesgraphs', label: 'Trees & Graphs' },
      { slug: 'dynamicprogramming', label: 'Dynamic Programming' },
    ],
  },
];

// Doubles as the datalist suggestions AND the canonical sort order for
// category cards, so cards always render in the same order your public
// tech-stack-data.ts uses them in — regardless of DB row order.
const KNOWN_CATEGORIES = ICON_GROUPS.map((g) => g.category);

export function TechStackManager({ items }: { items: TechStackItem[] }) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const grouped = React.useMemo(() => {
    const map = new Map<string, TechStackItem[]>();
    for (const item of items) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    // Keep items within a category ordered by their persisted sortOrder.
    for (const list of map.values()) {
      list.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    // Known categories first (in the order they appear on the public site),
    // any custom/unrecognized category names appended alphabetically after.
    const entries = Array.from(map.entries());
    entries.sort(([a], [b]) => {
      const ai = KNOWN_CATEGORIES.indexOf(a);
      const bi = KNOWN_CATEGORIES.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
    return entries;
  }, [items]);

  const filteredGrouped = React.useMemo(() => {
    if (!query.trim()) return grouped;
    const q = query.trim().toLowerCase();
    return grouped
      .map(
        ([category, categoryItems]) =>
          [category, categoryItems.filter((i) => i.name.toLowerCase().includes(q))] as [
            string,
            TechStackItem[],
          ],
      )
      .filter(([, categoryItems]) => categoryItems.length > 0);
  }, [grouped, query]);

  const handleReorder = async (orderedItems: TechStackItem[]) => {
    // Only persist rows whose position actually changed.
    const updates = orderedItems
      .map((item, index) => ({ item, order: index }))
      .filter(({ item, order }) => item.sortOrder !== order);

    if (updates.length === 0) return;

    try {
      await Promise.all(
        updates.map(({ item, order }) => {
          const formData = new FormData();
          formData.append('name', item.name);
          formData.append('icon', item.icon);
          formData.append('category', item.category);
          formData.append('brandColor', item.brandColor ?? '');
          formData.append('sortOrder', String(order));
          return updateTechStackItem(item.id, formData);
        }),
      );
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save order.');
      router.refresh();
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <p className="text-muted-foreground text-sm">
            Manage the technologies shown in your portfolio's tech stack section.
          </p>
        </div>
        <ItemFormDialog
          mode="create"
          onSuccess={() => router.refresh()}
          trigger={
            <Button className="gap-2">
              <Plus className="size-4" />
              Add Technology
            </Button>
          }
        />
      </div>

      <div className="relative w-full sm:max-w-xs">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search technologies..."
          className="pl-8"
        />
      </div>

      {filteredGrouped.length === 0 && (
        <Card>
          <CardContent className="text-muted-foreground py-10 text-center text-sm">
            {query
              ? 'No technologies match your search.'
              : 'No technologies added yet. Click "Add Technology" to get started.'}
          </CardContent>
        </Card>
      )}

      {filteredGrouped.map(([category, categoryItems]) => (
        <Card key={category}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{category}</CardTitle>
            <CardDescription>
              {categoryItems.length} item{categoryItems.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SortableCategoryList
              items={categoryItems}
              disabled={query.length > 0}
              onReorder={handleReorder}
              onRefresh={() => router.refresh()}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Drag-to-reorder list (per category)
// ─────────────────────────────────────────────────────────────
function SortableCategoryList({
  items,
  disabled,
  onReorder,
  onRefresh,
}: {
  items: TechStackItem[];
  disabled?: boolean;
  onReorder: (orderedItems: TechStackItem[]) => void;
  onRefresh: () => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...items];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);

    onReorder(reordered);
  }

  if (!mounted) {
    return null;
  }

  if (disabled) {
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} onRefresh={onRefresh} />
        ))}
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableRow key={item.id} id={item.id}>
              {(dragHandle) => (
                <ItemRow item={item} dragHandle={dragHandle} onRefresh={onRefresh} />
              )}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  id,
  children,
}: {
  id: string;
  children: (dragHandle: React.ReactNode) => React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandle = (
    <button
      type="button"
      className="text-muted-foreground cursor-grab touch-none active:cursor-grabbing"
      aria-label="Drag to reorder"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="size-4" />
    </button>
  );

  return (
    <div ref={setNodeRef} style={style} className={cn(isDragging && 'z-10 opacity-60')}>
      {children(dragHandle)}
    </div>
  );
}

function ItemRow({
  item,
  dragHandle,
  onRefresh,
}: {
  item: TechStackItem;
  dragHandle?: React.ReactNode;
  onRefresh: () => void;
}) {
  return (
    <div className="bg-muted/30 flex items-center justify-between gap-3 rounded-lg border px-3 py-2">
      <div className="flex min-w-0 items-center gap-3">
        {dragHandle ?? <GripVertical className="text-muted-foreground/40 size-4 shrink-0" />}
        <TechIcon
          name={item.name}
          icon={item.icon}
          brandColor={item.brandColor ?? undefined}
          className="h-6 w-6 shrink-0"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{item.name}</p>
          <p className="text-muted-foreground truncate text-xs">
            icon: {item.icon} · order: {item.sortOrder}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <ItemFormDialog
          mode="edit"
          item={item}
          onSuccess={onRefresh}
          trigger={
            <Button size="icon" variant="ghost" className="size-8">
              <Pencil className="size-4" />
            </Button>
          }
        />
        <DeleteConfirm
          itemName={item.name}
          onConfirm={async () => {
            try {
              await deleteTechStackItem(item.id);
              toast.success(`Removed ${item.name}`);
              onRefresh();
            } catch (error: any) {
              toast.error(error?.message || 'Failed to delete.');
            }
          }}
        />
      </div>
    </div>
  );
}

function DeleteConfirm({
  itemName,
  onConfirm,
}: {
  itemName: string;
  onConfirm: () => void | Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-destructive size-8"
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove {itemName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove it from your tech stack section.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={async (e) => {
              e.preventDefault();
              setIsDeleting(true);
              await onConfirm();
              setIsDeleting(false);
            }}
          >
            {isDeleting ? <Loader2 className="size-4 animate-spin" /> : 'Remove'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function IconPicker({
  value,
  onSelect,
  disabled,
}: {
  value: string;
  onSelect: (slug: string, label: string, category: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  const selected = React.useMemo(() => {
    for (const group of ICON_GROUPS) {
      const found = group.icons.find((i) => i.slug === value);
      if (found) return found;
    }
    return null;
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between font-normal"
        >
          {selected ? (
            <span className="flex items-center gap-2">
              <TechIcon name={selected.label} icon={selected.slug} className="h-5 w-5" />
              {selected.label}
            </span>
          ) : (
            <span className="text-muted-foreground">Select an icon…</span>
          )}
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search icons..." />
          <CommandList className="max-h-80">
            <CommandEmpty>No icon found.</CommandEmpty>
            {ICON_GROUPS.map((group) => (
              <CommandGroup key={group.category} heading={group.category}>
                {group.icons.map((iconOpt) => (
                  <CommandItem
                    key={iconOpt.slug}
                    value={`${group.category} ${iconOpt.label} ${iconOpt.slug}`}
                    onSelect={() => {
                      onSelect(iconOpt.slug, iconOpt.label, group.category);
                      setOpen(false);
                    }}
                    className="gap-2"
                  >
                    <TechIcon
                      name={iconOpt.label}
                      icon={iconOpt.slug}
                      className="h-5 w-5 shrink-0"
                    />
                    <span className="flex-1">{iconOpt.label}</span>
                    <Check
                      className={cn('size-4', value === iconOpt.slug ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ItemFormDialog({
  mode,
  item,
  trigger,
  onSuccess,
}: {
  mode: 'create' | 'edit';
  item?: TechStackItem;
  trigger: React.ReactNode;
  onSuccess: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const [name, setName] = React.useState(item?.name ?? '');
  const [icon, setIcon] = React.useState(item?.icon ?? '');
  const [category, setCategory] = React.useState(item?.category ?? '');
  const [brandColor, setBrandColor] = React.useState(item?.brandColor ?? '');
  const [sortOrder, setSortOrder] = React.useState(String(item?.sortOrder ?? 0));

  const resetForm = () => {
    setName(item?.name ?? '');
    setIcon(item?.icon ?? '');
    setCategory(item?.category ?? '');
    setBrandColor(item?.brandColor ?? '');
    setSortOrder(String(item?.sortOrder ?? 0));
  };

  const handleIconSelect = (slug: string, label: string, groupCategory: string) => {
    setIcon(slug);
    if (!name.trim()) setName(label);
    if (!category.trim()) setCategory(groupCategory);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !icon.trim() || !category.trim()) {
      toast.error('Name, icon, and category are required.');
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('icon', icon.trim());
      formData.append('category', category.trim());
      formData.append('brandColor', brandColor.trim());
      formData.append('sortOrder', sortOrder);

      if (mode === 'create') {
        await createTechStackItem(formData);
        toast.success('Technology added.');
      } else if (item) {
        await updateTechStackItem(item.id, formData);
        toast.success('Technology updated.');
      }

      setOpen(false);
      // Programmatic close (as opposed to the user clicking the overlay or
      // hitting Escape) doesn't fire Radix's onOpenChange, so resetForm()
      // there never runs on a successful save — reset explicitly here.
      resetForm();
      onSuccess();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetForm();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add Technology' : 'Edit Technology'}</DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Pick an icon, then confirm the details.'
              : "Update this technology's details."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Icon</Label>
            <IconPicker value={icon} onSelect={handleIconSelect} disabled={isSaving} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="React"
              disabled={isSaving}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              list="category-suggestions"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Frontend"
              disabled={isSaving}
            />
            <datalist id="category-suggestions">
              {KNOWN_CATEGORIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="brandColor">Brand color override</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="brandColor"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  placeholder="Auto"
                  disabled={isSaving}
                />
                {brandColor && (
                  <span
                    className="size-8 shrink-0 rounded-md border"
                    style={{ backgroundColor: brandColor }}
                  />
                )}
              </div>
              <p className="text-muted-foreground text-xs">
                Optional — the icon already has a default brand color.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sortOrder">Sort order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : mode === 'create' ? (
              'Add'
            ) : (
              'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
