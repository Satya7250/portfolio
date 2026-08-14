import { ResumeManager } from "@/components/admin/resume/resume-manager";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Resume Management | Admin Dashboard",
  description: "Upload your portfolio resume.",
};

export default function ResumePage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <FileText className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Resume Management
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Upload a PDF resume to update your live portfolio.
        </p>
      </div>

      <Separator />

      <div className="flex flex-1 items-center justify-center pt-4 pb-12">
        <ResumeManager />
      </div>
    </div>
  );
}
