"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import AddSlides from "./components/add-slides";
import SlideEditor from "./components/slide-editor";
import SlideSettings from "./components/slide-settings";

export const formSchema = z.object({
  questions: z
    .array(
      z
        .object({
          question: z
            .string()
            .min(1, "Question must be at least 1 character")
            .max(200, "Question must not exceed 200 characters"),
          options: z
            .array(
              z
                .string()
                .min(0) // Allow empty while typing
                .max(100, "Option must not exceed 100 characters")
            )
            .min(2, "At least 2 options required")
            .max(6, "Maximum 6 options allowed"),
          correctAnsIndex: z
            .number()
            .nonnegative("correctIndex should be nonnegative"),
          timeLimit: z.number().positive("time limit invalid"),
          points: z.number().positive("points should be positive").optional(),
        })
        .superRefine((data, ctx) => {
          if (
            data.correctAnsIndex < 0 ||
            data.correctAnsIndex >= data.options.length
          ) {
            ctx.addIssue({
              path: ["correctAnsIndex"],
              message: "Answer index must be within the options range",
              code: "custom",
            });
          }
        })
    )
    .min(1, "At least 1 question required")
    .max(20, "Maximum 20 questions allowed"),
});

export default function CreateQuizIdPage() {
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: [
        {
          question: "",
          options: ["", "", ""],
          correctAnsIndex: 0,
          timeLimit: 30,
          points: 100,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 border-r border-gray-100 flex flex-col">
        <AddSlides
          fields={fields}
          append={append}
          remove={remove}
          currentQIndex={currentQIndex}
          setCurrentQIndex={setCurrentQIndex}
        />
      </div>

      {/* Main Content - Editor */}
      <SlideEditor form={form} currentIndex={currentQIndex} />

      {/* Right Sidebar - Settings */}
      <SlideSettings form={form} currentIndex={currentQIndex} />
    </div>
  );
}
