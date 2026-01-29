"use client";

import getSocket, { ISocketResponse } from "@/lib/socket";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/retroui/Button";
import { BarChart } from "@/components/retroui/charts/BarChart";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ICurrenQ {
  id: string | undefined;
  text: string | undefined;
  options: string[] | undefined;
  timeLimit: number | undefined;
  points: number | undefined;
}

type RankingItem = [string, number];

const StartQuizPage = () => {
  const [currentQ, setCurrentQ] = useState<ICurrenQ | null>({
    id: "1",
    text: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    timeLimit: 10,
    points: 100,
  });
  const [ranking, setRanking] = useState<RankingItem[] | null>(null);
  // TODO : revamp the logic correct ans
  const [isCurrentAns, setIsCurrentAns] = useState<boolean | null>(null);
  const [correctOption, setCorrectOption] = useState<number | null>(null);
  const [selectedOption, setSelectOption] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const socket = getSocket();

    const handleQuestion = (response: ISocketResponse) => {
      setRanking(null);
      setIsCurrentAns(null);
      setCorrectOption(null);
      setSelectOption(null);
      console.log("question", response);
      if (response.success) {
        setCurrentQ(response.payload as ICurrenQ);
      } else {
        toast.error(response.message);
      }
    };

    const handleRanking = (response: ISocketResponse) => {
      setCurrentQ(null);
      console.log("ranking", response);
      if (response.success) {
        console.log("ranking", response.payload);
        setRanking((response.payload as { top10UsersWithScore: RankingItem[] }).top10UsersWithScore);
      }
    };

    const handleQuizEnd = (socket: ISocketResponse) => {
      router.replace("/");
    };

    // EVENT
    socket.on("question", handleQuestion);

    // EVENT
    socket.on("top-10-users-with-score-and-name", handleRanking);

    // EVENT
    socket.on("quiz-end", handleQuizEnd);

    return () => {
      socket.off("question", handleQuestion);
      socket.off("top-10-users-with-score-and-name", handleRanking);
      socket.off("quiz-end", handleQuizEnd);
    };
  }, []);

  const handleAnsSubmit = (index: number) => {
    const socket = getSocket();

    const sessionCode = localStorage.getItem("session-code");

    socket.emit(
      "answer-submit",
      {
        sessionCode,
        ansIndex: index,
        qId: currentQ?.id,
      },
      (response: ISocketResponse) => {
        console.log("answer submit", response);
        if (response.success) {
          // Update state based on response
          const payload = response.payload as { correctOptionIndex: number };
          if (payload.correctOptionIndex === index) {
            console.log("inside the correctAns");
            setIsCurrentAns(true);
          } else {
            setIsCurrentAns(false);
          }
          setCorrectOption(payload.correctOptionIndex);
        } else {
          setIsCurrentAns(null);
          toast.error(response.message);
        }
      },
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      {currentQ && (
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="mb-8 text-4xl font-bold text-gray-800 md:text-5xl">
              {currentQ.text}
            </h1>
            <div className="mb-4 flex justify-center gap-4 text-gray-600">
              <span className="rounded-lg bg-blue-100 px-4 py-1 font-semibold text-blue-800 border-2 border-blue-200 shadow-sm">
                {currentQ.timeLimit}s
              </span>
              <span className="rounded-lg bg-green-100 px-4 py-1 font-semibold text-green-800 border-2 border-green-200 shadow-sm">
                {currentQ.points} points
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentQ.options?.map((option, idx) => {
              const colors = [
                "bg-red-500 hover:bg-red-600 text-white border-black",
                "bg-blue-500 hover:bg-blue-600 text-white border-black",
                "bg-yellow-500 hover:bg-yellow-600 text-white border-black",
                "bg-green-500 hover:bg-green-600 text-white border-black",
              ];

              const isResultPhase = correctOption !== null;
              const isThisCorrect = idx === correctOption;
              const isThisSelected = idx === selectedOption;

              let variantClass = colors[idx % colors.length];
              let animationClass = "";

              if (isResultPhase) {
                if (isThisCorrect) {
                  variantClass =
                    "bg-green-500 border-green-800 text-white ring-4 ring-green-300";
                  animationClass = "animate-bounce";
                } else if (isThisSelected && !isThisCorrect) {
                  variantClass = "bg-red-500 border-red-800 text-white";
                  animationClass = "animate-shake";
                } else {
                  variantClass =
                    "bg-gray-300 text-gray-500 border-gray-400 opacity-50";
                }
              }

              return (
                <Button
                  key={idx}
                  variant="default"
                  size="lg"
                  className={cn(
                    "h-32 text-2xl font-bold shadow-lg transition-all",
                    !isResultPhase && variantClass,
                    isResultPhase && variantClass,
                    animationClass,
                  )}
                  onClick={() => {
                    if (isResultPhase) return;
                    handleAnsSubmit(idx);
                    setSelectOption(idx);
                    console.log("Selected:", option);
                  }}
                  disabled={isResultPhase}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {ranking && (
        <div className="w-full max-w-4xl bg-white p-8 shadow-xl border-4 border-black rounded-xl">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 font-head tracking-wider">
            LEADERBOARD
          </h1>
          <div className="w-full">
            <BarChart
              data={ranking.map(([name, score]) => ({ name, score }))}
              index="name"
              categories={["score"]}
              alignment="horizontal"
              className="h-125"
              fillColors={[
                "#3b82f6", // blue
                "#ef4444", // red
                "#22c55e", // green
                "#a855f7", // purple
                "#eab308", // yellow
                "#f97316", // orange
                "#14b8a6", // teal
                "#ec4899", // pink
                "#6366f1", // indigo
                "#8b5cf6", // violet
              ]}
              valueFormatter={(value) => `${value} p`}
            />
          </div>
        </div>
      )}

      {!currentQ && !ranking && (
        <div className="text-xl text-gray-500 animate-pulse">
          Waiting for the next question...
        </div>
      )}
    </div>
  );
};

export default StartQuizPage;
