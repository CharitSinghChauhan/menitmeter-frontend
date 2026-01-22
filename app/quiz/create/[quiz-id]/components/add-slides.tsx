"use client";

import { Button } from "@/components/ui/button";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { formSchema } from "../page";
import z from "zod";
import { Dispatch, SetStateAction } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelSquareIcon, Add01Icon } from "@hugeicons/core-free-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useHotkeys } from "react-hotkeys-hook";

interface addSlidesProps {
  fields: FieldArrayWithId<z.infer<typeof formSchema>, "questions", "id">[];
  append: UseFieldArrayAppend<z.infer<typeof formSchema>, "questions">;
  remove: UseFieldArrayRemove;
  currentQIndex: number;
  setCurrentQIndex: Dispatch<SetStateAction<number>>;
}

export default function AddSlides({
  fields,
  append,
  remove,
  currentQIndex,
  setCurrentQIndex,
}: addSlidesProps) {
  useHotkeys(
    "meta+t, alt+t",
    (e) => {
      e.preventDefault();
      append({
        question: "",
        options: ["", ""],
        correctAnsIndex: 0,
        timeLimit: 30,
        points: 100,
      });
      setCurrentQIndex(fields.length);
    },
    { enableOnFormTags: true },
    [fields, append],
  );

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <Button
          onClick={() => {
            append({
              question: "",
              options: ["", ""],
              correctAnsIndex: 0,
              timeLimit: 30,
              points: 100,
            });
            setCurrentQIndex(fields.length);
          }}
          title="Add new slide (Command + T)"
          disabled={fields.length > 20}
          className="w-full gap-2"
          size="sm"
        >
          <HugeiconsIcon icon={Add01Icon} size={16} />
          Add Slide
        </Button>
      </div>

      <ScrollArea className="h-full ">
        <div className="flex flex-col gap-3 p-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              onClick={() => setCurrentQIndex(index)}
              className={cn(
                "group relative flex cursor-pointer flex-col gap-2  border p-2 transition-all hover:bg-accent",
                currentQIndex === index
                  ? "border-primary ring-1 ring-primary bg-accent/50"
                  : "border-border bg-card",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-6 w-6 items-center justify-center ll bg-muted text-xs font-medium text-muted-foreground">
                  {index + 1}
                </span>
                <Button
                  disabled={fields.length <= 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                    // Prevent index out of bounds if deleting last item
                    if (currentQIndex >= index && currentQIndex > 0) {
                      setCurrentQIndex((prev) => prev - 1);
                    }
                  }}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                >
                  <HugeiconsIcon icon={CancelSquareIcon} size={16} />
                </Button>
              </div>

              {/* Thumbnail Representation */}
              <div className="aspect-video w-full  bg-muted/50 border border-muted-foreground/10 flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground/50">
                  Slide {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
