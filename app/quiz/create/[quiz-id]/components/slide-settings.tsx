"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import z from "zod";
import { formSchema } from "../page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  Cancel01Icon,
  Chart01Icon,
  CircleIcon,
  Image01Icon,
  Delete02Icon,
  Add01Icon,
  HelpCircleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/utils/utils";

interface SlideSettingsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  currentIndex: number;
}

export default function SlideSettings({
  form,
  currentIndex,
}: SlideSettingsProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${currentIndex}.options` as any,
  });

  const colors = [
    "bg-[#4f66f1]", // Blue
    "bg-[#ff7067]", // Red
    "bg-[#3d4785]", // Dark Blue
    "bg-[#fbbf24]", // Yellow
    "bg-[#10b981]", // Green
    "bg-[#8b5cf6]", // Purple
  ];

  return (
    <div className="w-[360px] bg-white border-l border-gray-200 h-full flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
          </Button>
          <h2 className="font-semibold text-gray-800">Multiple Choice</h2>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <HugeiconsIcon icon={Cancel01Icon} size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
        {/* Visualization Type */}
        <div className="flex flex-col gap-4">
          <Label className="text-gray-900 font-bold">Visualization type</Label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Chart01Icon, id: "bar", active: true },
              { icon: Chart01Icon, id: "donut" },
              { icon: Chart01Icon, id: "pie" },
              { icon: CircleIcon, id: "dots" },
            ].map((type) => (
              <button
                key={type.id}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-xl border-2 transition-all",
                  type.active
                    ? "border-blue-600 bg-blue-50/50 text-blue-600"
                    : "border-gray-100 hover:border-gray-200 text-gray-400"
                )}
              >
                <HugeiconsIcon icon={type.icon} size={24} />
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500 font-medium">
              Show responses as percentage
            </span>
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={HelpCircleIcon}
                size={16}
                className="text-gray-300"
              />
              <Switch />
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Options */}
        <div className="flex flex-col gap-4">
          <Label className="text-gray-900 font-bold">Options</Label>
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3 group">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full shrink-0",
                    colors[index % colors.length]
                  )}
                />
                <div className="flex-1 relative">
                  <Input
                    {...form.register(
                      `questions.${currentIndex}.options.${index}`
                    )}
                    placeholder={`Option ${index + 1}`}
                    className="bg-gray-50 border-none rounded-xl h-11 pr-20 focus-visible:ring-1 focus-visible:ring-blue-100"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-gray-400 hover:text-gray-600"
                    >
                      <HugeiconsIcon icon={Image01Icon} size={14} />
                    </Button>
                    {fields.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-red-500"
                        onClick={() => remove(index)}
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => append("")}
            disabled={fields.length >= 6}
            className="w-full mt-2 rounded-2xl border-gray-100 bg-gray-50 hover:bg-gray-100 border-none h-11 text-gray-700 font-semibold gap-2"
          >
            <HugeiconsIcon icon={Add01Icon} size={18} />
            Add option
          </Button>
        </div>
      </div>
    </div>
  );
}
