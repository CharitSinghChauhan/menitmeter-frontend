"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  sessionCode: z.string().refine((val) => val.length === 6, {
    message: "6 digits",
  }),

  nickname: z
    .string()
    .min(1, {
      message: "Nickname is required",
    })
    .max(10, {
      message: "Nickname must be at most 10 characters",
    }),
});

export default function JoinSessionBoard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      sessionCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    
    
  }

  return (
    <div className="w-full p-4 flex justify-center">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <div className="bg-background/60 backdrop-blur-md border border-border shadow-sm rounded-3xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full">
          {/* Label Text */}
          <div className="px-3 py-2 text-foreground font-medium text-center md:text-left whitespace-nowrap">
            Enter the quiz code
          </div>

          <div className="flex flex-1 flex-col md:flex-row gap-3 w-full md:w-auto items-center">
            {/* Session Code Input */}
            <Controller
              name="sessionCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="relative w-full md:flex-1">
                  <Input
                    {...field}
                    className="rounded-xl h-12 bg-muted/50 border-transparent hover:bg-muted/80 focus:bg-background transition-all text-center md:text-left"
                    type="text"
                    inputMode="numeric"
                    placeholder="Quiz code"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <span className="absolute -bottom-5 left-2 text-xs text-destructive font-medium">
                      {fieldState.error?.message}
                    </span>
                  )}
                </div>
              )}
            />

            {/* Nickname Input */}
            <Controller
              name="nickname"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="relative w-full md:flex-1">
                  <Input
                    {...field}
                    className="rounded-xl h-12 bg-muted/50 border-transparent hover:bg-muted/80 focus:bg-background transition-all text-center md:text-left"
                    placeholder="Nickname"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <span className="absolute -bottom-5 left-2 text-xs text-destructive font-medium">
                      {fieldState.error?.message}
                    </span>
                  )}
                </div>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="rounded-xl h-12 w-full md:w-auto px-8 font-semibold"
            >
              Join
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
