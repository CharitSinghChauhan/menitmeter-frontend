import { UseFieldArrayReturn } from "react-hook-form";
import z from "zod";
import { formSchema } from "../page";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Delete02Icon,
  Chart01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/utils/utils";

interface AddSlidesProps {
  fields: UseFieldArrayReturn<
    z.infer<typeof formSchema>,
    "questions"
  >["fields"];
  append: UseFieldArrayReturn<
    z.infer<typeof formSchema>,
    "questions"
  >["append"];
  remove: UseFieldArrayReturn<
    z.infer<typeof formSchema>,
    "questions"
  >["remove"];
  currentQIndex: number;
  setCurrentQIndex: Dispatch<SetStateAction<number>>;
}

export default function AddSlides({
  fields,
  append,
  remove,
  currentQIndex,
  setCurrentQIndex,
}: AddSlidesProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <div className="p-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <Button
          onClick={() =>
            append({
              question: "",
              options: ["", "", ""],
              correctAnsIndex: 0,
              timeLimit: 30,
              points: 100,
            })
          }
          disabled={fields.length >= 20}
          className="bg-gray-950 hover:bg-black text-white rounded-full py-6 px-6 flex justify-start gap-3 w-full shadow-sm transition-all active:scale-95"
        >
          <HugeiconsIcon icon={Add01Icon} size={20} />
          <span className="font-semibold">New slide</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto p-4 custom-scrollbar">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3 group">
            <div className="w-5 flex flex-col items-center gap-1">
              <span
                className={cn(
                  "text-[11px] font-bold transition-colors",
                  currentQIndex === index ? "text-blue-600" : "text-gray-400"
                )}
              >
                {index + 1}
              </span>
              {currentQIndex === index && (
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </div>

            <div
              onClick={() => setCurrentQIndex(index)}
              className={cn(
                "relative flex-1 aspect-[16/10] bg-white border-2 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden",
                currentQIndex === index
                  ? "border-blue-600 ring-4 ring-blue-600/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 shadow-sm"
              )}
            >
              <HugeiconsIcon
                icon={Chart01Icon}
                size={24}
                className={cn(
                  "transition-colors",
                  currentQIndex === index ? "text-gray-900" : "text-gray-400"
                )}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(index);
                  if (currentQIndex === index && index > 0) {
                    setCurrentQIndex(index - 1);
                  } else if (currentQIndex > index) {
                    setCurrentQIndex(currentQIndex - 1);
                  }
                }}
                className={cn(
                  "absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-all shadow-sm z-10",
                  fields.length > 1
                    ? "opacity-0 group-hover:opacity-100"
                    : "hidden"
                )}
              >
                <HugeiconsIcon icon={Delete02Icon} size={14} />
              </button>

              {/* Preview Content Placeholder */}
              <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1.5">
                <div className="h-1 w-2/3 bg-gray-100 rounded-full" />
                <div className="flex gap-1">
                  <div className="h-1 flex-1 bg-gray-100 rounded-full" />
                  <div className="h-1 flex-1 bg-gray-100 rounded-full" />
                  <div className="h-1 flex-1 bg-gray-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
