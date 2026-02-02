"use client";

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
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

  const { execute, isPending } = usePostRequest();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { payload, success } = await execute<{
      id: string;
    }>("/quiz/create-quiz", values, {
      successMessage: "Quiz created successfully!",
    });

    if (success && payload) {
      // TODO : remove from the localStorage
      localStorage.setItem("quiz-id", payload?.id);
      router.push(`/quiz/create/${payload?.id}`);
    }
  };

  return (
    <Card>
      <Dialog.Header className="flex justify-center items-center py-4 bg-accent text-accent-foreground border-0 h-16 mb-8">
        <Text as={"h4"}>
          Create Title <span className="text-sm">(Unique)</span>
        </Text>
      </Dialog.Header>
      <div className="w-full px-2">
        <form
          id="create-quiz-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1"
        >
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
      <Dialog.Footer className="sm:justify-start w-full px-2 mt-4 border-0">
        <Button
          type="submit"
          form="create-quiz-form"
          disabled={isPending}
          className="w-full flex justify-center items-center"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader />
              <span>Creating...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </Dialog.Footer>
    </Card>
  );
}
