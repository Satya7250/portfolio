"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  UploadCloud,
  X,
  Loader2,
  FileUp,
} from "lucide-react";
import { toast } from "sonner";

import { uploadResume } from "@/actions/resume";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ResumeManager() {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const validateAndSetFile = (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Invalid file format. Only PDF files are allowed.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File size exceeds 10MB limit (${formatFileSize(file.size)}).`
      );
      return false;
    }

    setSelectedFile(file);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file first.");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await uploadResume(formData);

      if (result?.success) {
        toast.success("Resume uploaded successfully!");
        clearSelectedFile();
        router.refresh();
      } else {
        toast.error("Failed to upload resume. Please try again.");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(
        error?.message || "An unexpected error occurred while uploading."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl w-full">
      <Card className="flex flex-col justify-between border shadow-sm">
        <div>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <UploadCloud className="size-5 text-primary" />
              Upload Resume
            </CardTitle>
            <CardDescription>
              Select or drop a PDF file to update your portfolio resume. Maximum file size allowed is 10MB.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />

            {!selectedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`group flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40"
                }`}
              >
                <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors mb-3">
                  <FileUp className="size-6" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Click to select or drag and drop PDF file
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF format only (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="rounded-xl border bg-muted/40 p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                      <FileText className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" title={selectedFile.name}>
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-destructive shrink-0 cursor-pointer"
                    onClick={clearSelectedFile}
                    disabled={isUploading}
                    title="Remove selected file"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </div>

        <CardFooter className="pt-2 border-t">
          <Button
            type="button"
            className="w-full gap-2 cursor-pointer"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Uploading Resume...
              </>
            ) : (
              <>
                <UploadCloud className="size-4" />
                Upload PDF
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
