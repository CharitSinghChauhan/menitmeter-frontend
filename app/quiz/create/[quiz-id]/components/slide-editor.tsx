"use client";

import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { formSchema } from "../page";
import { HugeiconsIcon } from "@hugeicons/react";
import { ThumbsUpIcon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";

interface SlideEditorProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  currentIndex: number;
}

export default function SlideEditor({ form, currentIndex }: SlideEditorProps) {
  const question = form.watch(`questions.${currentIndex}`);

  if (!question) return null;

  return (
    <div className="flex-1 bg-[#f8f9fb] p-8 flex flex-col gap-6 overflow-y-auto">
      {/* Top Banner */}
      <div className="flex justify-center">
        <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
          <span className="text-gray-600 text-sm">
            Join at <span className="font-bold">menti.com</span> | use code
          </span>
          <span className="font-bold text-gray-900">5160 1032</span>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col p-12 relative overflow-hidden min-h-[500px]">
        {/* Logo Placeholder */}
        <div className="absolute top-6 right-8 flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-600 rounded-sm italic flex items-center justify-center text-white text-[10px] b">
            M
          </div>
          <span className="text-sm font-semibold text-gray-800">
            Mentimeter
          </span>
        </div>

        {/* Question Input */}
        <div className="mt-8">
          <Input
            {...form.register(`questions.${currentIndex}.question`)}
            placeholder="Ask your question here..."
            className="text-4xl font-semibold border-none focus-visible:ring-0 px-0 h-auto placeholder:text-gray-300 text-gray-800"
          />
        </div>

        {/* Visualization Preview */}
        <div className="flex-1 flex items-end justify-center gap-8 px-12 py-16">
          {question.options.map((option, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-4">
              <div className="w-full flex flex-col items-center justify-end h-64">
                {/* Bar */}
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: "4px", // Standard height when no votes
                    backgroundColor:
                      idx === 0 ? "#4f66f1" : idx === 1 ? "#ff7067" : "#3d4785",
                    opacity: 0.8,
                  }}
                />
              </div>
              <div className="w-full pt-4 border-t-2 border-gray-100">
                <p className="text-center font-medium text-gray-600 truncate">
                  {option || `Option ${idx + 1}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-6 right-8 flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
            <HugeiconsIcon icon={ThumbsUpIcon} size={16} />
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
            <HugeiconsIcon icon={UserGroupIcon} size={16} />
            <span className="text-xs font-bold">0</span>
          </div>
          <div className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            0/1
          </div>
        </div>
      </div>
    </div>
  );
}
