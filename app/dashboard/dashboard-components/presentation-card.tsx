"use client";

import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { usePostRequest } from "@/lib/api-utils";
import { Delete02Icon, Presentation02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

interface PresentationCardProps {
  quizId: string;
  title?: string;
  status?: string;
  questionCount?: number;
  updatedAt?: string | Date;
  onDelete: (quizId: string) => void;
}

export function PresentationCard({
  quizId,
  title = "Untitled",
  status = "CREATED",
  questionCount = 0,
  onDelete,
  updatedAt,
}: PresentationCardProps) {
  const router = useRouter();

  const { isPending, execute } = usePostRequest();

  const handleNavigateQuiz = async () => {
    if (status === "CREATED") router.push(`/quiz/create/${quizId}`);
    else if (status === "LIVE") {
      const sessionCode = localStorage.getItem("sessionCode");
      if (sessionCode) router.push(`/quiz/live/${sessionCode}`);
      else {
        // toast.error("Session Code is missing , Checking again");

        // redirect to backend router for the sessionCode

        const { payload, success } = await execute(
          `/quiz/session-code`,
          {
            quizId,
          },
          {
            errorMessage: "session code is missing",
          },
        );

        if (success && payload.sessionCode) {
          localStorage.setItem("sessionCode", payload.sessionCode);
          router.push(`/quiz/live/${payload.sessionCode}`);
        } else {
          console.log("handle navigate quiz", success, payload);
          // If creation failed or no code, maybe fallback to edit?
          // For now, let's just stay or error.
        }
      }
    }
  };

  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Just now";

  const statusDisplay = () => {
    // TODO : status and add the action
    // LIVE : WAITING , STARTED : live ,
    if (status === "LIVE") return "PRESENT";
    else if (status === "CREATED") return "EDIT";
    else if (status === "OVER") return "RESULT";
    else if (status === "STARTED") return "JOIN";
  };

  return (
    <Card className="col-span-4 flex cursor-pointer flex-col justify-between overflow-hidden border-2 border-border bg-card p-0 transition-all hover:-translate-y-1 ">
      {/* Thumbnail / Header Area */}
      <div className="relative flex h-32 w-full items-center justify-center bg-muted/50 border-b-2 border-border">
        <HugeiconsIcon
          icon={Presentation02Icon}
          className="h-12 w-12 text-muted-foreground/50"
        />
        <div className="absolute right-3 top-3">
          <Badge
            variant={status === "LIVE" ? "surface" : "default"}
            className={`${
              status === "LIVE"
                ? "bg-destructive text-destructive-foreground border-destructive-foreground"
                : "bg-background border-border"
            } border-2 shadow-sm`}
          >
            {status}
          </Badge>
        </div>
      </div>

      {/* Content Area */}
      <Card.Content className="flex flex-1 flex-col gap-2 p-4">
        <Text as="h4" className="line-clamp-1 font-bold">
          {title}
        </Text>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{questionCount} slides</span>
          <span className="text-border">•</span>
          <span>{formattedDate}</span>
        </div>
      </Card.Content>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between border-t-2 border-border bg-muted/20 px-4 py-3">
        <Button
          size="sm"
          variant={"secondary"}
          onClick={(e) => {
            // Let the card click handle navigation, or explicitly here?
            // Card has onClick, so this button is redundant if it does same thing.
            // Maybe "Edit" text for clarity?
            e.stopPropagation();
            handleNavigateQuiz();
          }}
        >
          {statusDisplay()}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(quizId)}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <HugeiconsIcon icon={Delete02Icon} className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}
