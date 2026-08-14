"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Save, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { upsertAbout } from "@/actions/about";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

type AboutData = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  intro: string;
  name: string;
  role: string;
  bio: string;
} | null;

export function AboutManager({ about }: { about: AboutData }) {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [form, setForm] = React.useState({
    eyebrow: about?.eyebrow ?? "",
    title: about?.title ?? "",
    description: about?.description ?? "",
    imageAlt: about?.imageAlt ?? "",
    intro: about?.intro ?? "",
    name: about?.name ?? "",
    role: about?.role ?? "",
    bio: about?.bio ?? "",
  });

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    about?.imageSrc ?? null
  );
  const [isSaving, setIsSaving] = React.useState(false);

  const updateField =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size exceeds 10MB limit.");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const requiredFields = Object.entries(form);
    const missing = requiredFields.find(([, value]) => !value.trim());
    if (missing) {
      toast.error("Please fill in all fields before saving.");
      return;
    }

    if (!about?.imageSrc && !imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const result = await upsertAbout(formData);

      if (result?.success) {
        toast.success("About section updated successfully!");
        setImageFile(null);
        router.refresh();
      } else {
        toast.error("Failed to update. Please try again.");
      }
    } catch (error: any) {
      console.error("About update error:", error);
      toast.error(
        error?.message || "An unexpected error occurred while saving."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl w-full">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            About Section
          </CardTitle>
          <CardDescription>
            Update the content shown in the About section of your portfolio.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Section heading fields */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Section Heading
            </h3>

            <div className="grid gap-2">
              <Label htmlFor="eyebrow">Eyebrow</Label>
              <Input
                id="eyebrow"
                value={form.eyebrow}
                onChange={updateField("eyebrow")}
                placeholder="Get To Know Me"
                disabled={isSaving}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={updateField("title")}
                placeholder="About Me"
                disabled={isSaving}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={updateField("description")}
                placeholder="A passionate developer building modern, scalable, and user-focused digital experiences."
                rows={2}
                disabled={isSaving}
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Profile Image
            </h3>

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
                className="relative size-24 shrink-0 rounded-xl border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer overflow-hidden bg-muted/40 flex items-center justify-center transition-colors"
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <UploadCloud className="size-6 text-muted-foreground" />
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
                  Change image
                </Button>
                <p className="text-xs text-muted-foreground">
                  PNG or JPG, up to 10MB
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageAlt">Image alt text</Label>
              <Input
                id="imageAlt"
                value={form.imageAlt}
                onChange={updateField("imageAlt")}
                placeholder="Portrait of..."
                disabled={isSaving}
              />
            </div>
          </div>

          {/* AboutMe content */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Profile Content
            </h3>

            <div className="grid gap-2">
              <Label htmlFor="intro">Intro</Label>
              <Input
                id="intro"
                value={form.intro}
                onChange={updateField("intro")}
                placeholder="Hi, I'm"
                disabled={isSaving}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={updateField("name")}
                  disabled={isSaving}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={form.role}
                  onChange={updateField("role")}
                  placeholder="Full Stack Developer"
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={updateField("bio")}
                rows={5}
                disabled={isSaving}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 border-t">
          <Button
            type="button"
            className="w-full gap-2"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}