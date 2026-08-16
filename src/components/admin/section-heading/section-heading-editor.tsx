"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { upsertSectionHeading } from "@/actions/section-heading";
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

type HeadingData = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeadingEditor({
  section,
  heading,
  label = "Section Heading",
}: {
  section: string;
  heading: HeadingData;
  label?: string;
}) {
  const router = useRouter();
  const [form, setForm] = React.useState(heading);
  const [isSaving, setIsSaving] = React.useState(false);

  const updateField =
    (key: keyof HeadingData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async () => {
    if (!form.eyebrow.trim() || !form.title.trim() || !form.description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("section", section);
      formData.append("eyebrow", form.eyebrow.trim());
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());

      await upsertSectionHeading(formData);
      toast.success("Heading updated.");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{label}</CardTitle>
        <CardDescription>
          Edit the eyebrow, title, and description shown above this section.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor={`${section}-eyebrow`}>Eyebrow</Label>
          <Input
            id={`${section}-eyebrow`}
            value={form.eyebrow}
            onChange={updateField("eyebrow")}
            disabled={isSaving}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${section}-title`}>Title</Label>
          <Input
            id={`${section}-title`}
            value={form.title}
            onChange={updateField("title")}
            disabled={isSaving}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${section}-description`}>Description</Label>
          <Textarea
            id={`${section}-description`}
            value={form.description}
            onChange={updateField("description")}
            rows={2}
            disabled={isSaving}
          />
        </div>
      </CardContent>

      <CardFooter className="pt-2 border-t">
        <Button type="button" className="gap-2" onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Heading
        </Button>
      </CardFooter>
    </Card>
  );
}