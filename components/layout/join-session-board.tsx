"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";
import { Text } from "../retroui/Text";
import { Input } from "../retroui/Input";
import { Button } from "../retroui/Button";
import { ISocketResponse, useSocket } from "@/providers/socket-provider";

const formSchema = z.object({
  sessionCode: z
    .string()
    .refine((val) => val.length === 6, {
      message: "6 digits",
    })
    .trim(),

  nickname: z
    .string()
    .min(1, {
      message: "Nickname is required",
    })
    .max(10, {
      message: "Nickname must be at most 10 characters",
    })
    .trim(),
});

export default function JoinSessionBoard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      sessionCode: "",
    },
  });

  const router = useRouter();
  const { socket, connected } = useSocket();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!socket) return;

    socket.emit(
      "user-join-quiz",
      {
        sessionCode: values.sessionCode,
        nickname: values.nickname,
      },
      (response: ISocketResponse<null>) => {
        if (response.success) {
          localStorage.setItem("session-code", values.sessionCode);
          router.push(`/quiz/live/${values.sessionCode}`);
        } else {
          toast.error(response.message);
        }
      },
    );
  }

  return (
    <div className="flex w-full justify-center p-4 ">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-3xl">
        <div className="flex w-full flex-col gap-4 border-2 border-border bg-card p-4 md:flex-row md:items-start">
          <Controller
            name="sessionCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1">
                <Input
                  {...field}
                  placeholder="Code"
                  maxLength={6}
                  className="border-2 border-border bg-background font-bold placeholder:text-muted-foreground "
                  aria-invalid={fieldState.invalid}
                />
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs font-bold text-destructive"
                />
              </Field>
            )}
          />

          <Controller
            name="nickname"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1">
                <Input
                  {...field}
                  placeholder="Nickname"
                  maxLength={10}
                  className="border-2 border-border bg-background font-bold placeholder:text-muted-foreground focus:ring-0"
                  aria-invalid={fieldState.invalid}
                />
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs font-bold text-destructive"
                />
              </Field>
            )}
          />

          <div className="w-full md:w-auto">
            <Button type="submit" className="w-full md:w-auto">
              <Text
                as={"h6"}
                className="w-full flex justify-center items-center"
              >
                Join
              </Text>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
