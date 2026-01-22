import { UseFormReturn } from "react-hook-form";
import { formSchema } from "../page";
import z from "zod";
import { cn } from "@/lib/utils";

interface slidesProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  currentQIndex: number;
}

export default function Slides({ form, currentQIndex }: slidesProps) {
  const currentQ = form.watch().questions[currentQIndex];

  if (!currentQ) {
      return <div className="flex h-full w-full items-center justify-center text-muted-foreground">Select a slide to edit</div>
  }

  return (
    <div className="flex h-full w-full flex-col p-8 md:p-12 gap-8">
      {/* Question Title */}
      <div className="w-full text-center">
        <h1 className={cn(
            "text-3xl font-bold break-words",
            !currentQ.question && "text-muted-foreground/40 italic"
        )}>
          {currentQ.question || "Your question here..."}
        </h1>
      </div>

      {/* Options Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center content-center w-full max-w-5xl mx-auto">
        {currentQ.options &&
          currentQ?.options?.map((option, index) => (
            <div
                key={index}
                className={cn(
                    "flex items-center justify-center p-6  text-lg font-medium shadow-sm transition-all min-h-[80px]",
                     // Cycle through chart colors or use a standard card style
                    "bg-secondary/50 border-2 border-transparent",
                    !option && "text-muted-foreground/40 italic"
                )}
            >
              {option || `Option ${index + 1}`}
            </div>
          ))}
      </div>
    </div>
  );
}
