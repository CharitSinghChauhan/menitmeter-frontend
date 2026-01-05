import { Card } from "@/components/ui/card";

interface PresentationCardProps {
  title?: string;
  status?: string;
  questionCount?: number;
}

export function PresentationCard({
  title = "Untitled",
  status = "Created",
  questionCount = 0,
}: PresentationCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-primary w-[300px]">
      {/* Thumbnail Section - mimic the screen look in doodle */}
      <div className="aspect-video w-full bg-muted/40 p-4">
        <div className="h-full w-full rounded-xl border-2 border-muted-foreground/10 bg-background transition-colors group-hover:border-primary/50" />
      </div>

      {/* Content Section */}
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          {/* Name Box */}
          <div className="max-w-[140px] truncate rounded-md border-2 border-border px-3 py-1 text-sm font-medium">
            {title}
          </div>
          {/* Status Box/Badge */}
          <div className="rounded-md border-2 border-border px-3 py-1 text-sm font-medium">
            {status}
          </div>
        </div>

        {/* Question Count Box */}
        <div className="w-fit rounded-md border-2 border-border px-3 py-1 text-sm font-medium text-muted-foreground">
          {questionCount === 0 ? "no question" : `${questionCount} questions`}
        </div>
      </div>
    </Card>
  );
}
