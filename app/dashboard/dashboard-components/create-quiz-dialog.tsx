"use client";

import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { usePostRequest } from "@/lib/api-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must not exceed 50 characters"),
});

export function CreateQuizDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { execute, isPending } = usePostRequest<{ id: string }>();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = await execute("/quiz/create-quiz", values, {
      successMessage: "Quiz created successfully!",
    });

    if (payload?.id) {
      router.push(`/quiz/create/${payload.id}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>
          Create Title <span className="text-sm">(Unique)</span>
        </DialogTitle>
      </DialogHeader>
      <div className="w-full">
        <form id="create-quiz-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the Title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
      <DialogFooter className="sm:justify-start">
        <Button
          type="submit"
          form="create-quiz-form"
          disabled={isPending}
          className="min-w-[100px]"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner className="h-4 w-4" />
              <span>Creating...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </DialogFooter>
    </div>
  );
}
