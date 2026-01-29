"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import AddSlides from "./components/add-slides";
import { useEffect, useState } from "react";
import Slides from "./components/slides";
import SlideEditor from "./components/slide-editor";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft } from "@hugeicons/core-free-icons";
import { usePostRequest } from "@/lib/api-utils";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";

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
                .min(1) // Allow empty while typing
                .max(100, "Option must not exceed 100 characters"),
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
        }),
    )
    .min(1, "At least 1 question required")
    .max(20, "Maximum 20 questions allowed"),
});

export default function CreateQuizIdPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params["quiz-id"] as string;
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: [
        {
          question: "",
          options: ["", ""],
          correctAnsIndex: 0,
          timeLimit: 30,
          points: 100,
        },
      ],
    },
  });

  const [currentQIndex, setCurrentQIndex] = useState(0);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  // TODO : isPending is true when one api is called
  const { execute, isPending } = usePostRequest();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await execute(`/quiz/add-question/${quizId}`, data);
    router.replace("/dashboard");
  };

  useEffect(() => {
    (async () => {
      if (searchParams.get("status") === "CREATED") {
        const { payload, success } = await execute("/quiz/get-questions", {
          quizId,
        });

        console.log("success", success);

        if (success) {
          form.setValue("questions", payload.questions);
        } else {
          router.push("/dashboard");
        }
      }
    })();

  }, []);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-screen w-full flex-col overflow-hidden bg-background"
    >
      {/* Header / Toolbar Area */}
      <header className="flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => router.push("/dashboard")}
            disabled={isPending}
          >
            <HugeiconsIcon icon={ArrowLeft} />
            <Text as={"h5"}>Back</Text>
          </Button>
          <Text as={"p"}>Editing Quiz</Text>
        </div>
        <div className="flex gap-2">
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? "Saving..." : "Save Quiz"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              const dummyQuestions = [
                {
                  question: "What is the capital of France?",
                  options: ["London", "Berlin", "Paris", "Madrid"],
                  correctAnsIndex: 0,
                  timeLimit: 30,
                  points: 100,
                },
                {
                  question: "Which planet is known as the Red Planet?",
                  options: ["Venus", "Mars", "Jupiter", "Saturn"],
                  correctAnsIndex: 0,
                  timeLimit: 20,
                  points: 50,
                },
                {
                  question: "What is 2 + 2?",
                  options: ["3", "4", "5", "6"],
                  correctAnsIndex: 0,
                  timeLimit: 10,
                  points: 50,
                },
                {
                  question: "Who wrote Romeo and Juliet?",
                  options: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"],
                  correctAnsIndex: 0,
                  timeLimit: 30,
                  points: 100,
                },
                {
                  question: "What is the largest ocean on Earth?",
                  options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                  correctAnsIndex: 0,
                  timeLimit: 20,
                  points: 75,
                },
              ];
              form.setValue("questions", dummyQuestions);
              setCurrentQIndex(0);
            }}
          >
            Add Dummy Data
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Slide List */}
        <aside className="w-64 shrink-0 border-r bg-muted/10">
          <AddSlides
            fields={fields}
            append={append}
            remove={remove}
            currentQIndex={currentQIndex}
            setCurrentQIndex={setCurrentQIndex}
          />
        </aside>

        {/* Center: Canvas/Preview */}
        <main className="flex-1 overflow-hidden bg-muted/30 p-8 flex items-center justify-center">
          <div className="aspect-video w-full max-w-4xl shadow-2xl ring-1 ring-border/50  bg-card overflow-hidden">
            <Slides form={form} currentQIndex={currentQIndex} />
          </div>
        </main>

        {/* Right Sidebar: Editor */}
        <aside className="w-80 shrink-0 border-l bg-background overflow-y-auto">
          <SlideEditor
            form={form}
            fields={fields}
            currentQIndex={currentQIndex}
          />
        </aside>
      </div>
    </form>
  );
}
