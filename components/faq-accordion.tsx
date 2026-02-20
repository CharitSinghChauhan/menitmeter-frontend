"use client";

import { useState } from "react";
import { Text } from "@/components/retroui/Text";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border-2 border-black bg-white">
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <Text className="font-bold text-black pr-4">{item.question}</Text>
            <div
              className={`w-10 h-10 flex-shrink-0 border-2 border-black flex items-center justify-center transition-transform duration-200 ${
                openIndex === index ? "rotate-45 bg-black" : "bg-white"
              }`}
            >
              <span
                className={`text-xl font-bold ${
                  openIndex === index ? "text-white" : "text-black"
                }`}
              >
                +
              </span>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 py-4 border-t-2 border-black bg-gray-50">
              <Text className="text-black font-medium leading-relaxed">
                {item.answer}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
