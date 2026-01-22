"use client";

import { Button } from "@/components/ui/button";
import getSocket, { ISocketResponse } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import api from "@/lib/axios";
import { usePostRequest } from "@/lib/api-utils";
import { toast } from "sonner";

export default function LivePage() {
  const router = useRouter();
  const [allUsers, setAllUser] = useState<string[]>([]);
  const params = useParams();
  const sessionCode = params["id"];
  const [owner, setOwner] = useState(false);
  const { execute, isPending } = usePostRequest();

  useEffect(() => {
    const verifyOwner = async () => {
      if (!sessionCode) return;
      try {
        const { success } = (await api.get(`/quiz/verify-owner/${sessionCode}`))
          .data;
        if (success) {
          setOwner(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyOwner();
  }, [sessionCode]);

  useEffect(() => {
    const socket = getSocket();

    socket.emit(
      "get-all-quiz-user",
      {
        sessionCode,
      },
      (response: ISocketResponse) => {
        if (response.success) {
          setAllUser(response.payload.userNickname || []);
        } else {
          console.log("error", response);
        }
      },
    );

    const handleUserJoined = (response: ISocketResponse) => {
      setAllUser((prev) => [...prev, response.payload.nickname]);
    };

    socket.on("user-joined-notification", handleUserJoined);

    const handleQuizStarted = (response: ISocketResponse) => {
      router.push(`/quiz/start/${response.payload.quizId}`);
    };

    socket.on("quiz-started", handleQuizStarted);

    return () => {
      socket.off("user-joined-notification", handleUserJoined);
      socket.off("quiz-started", handleQuizStarted);
    };
  }, [sessionCode]);

  const handleStartQuiz = async () => {
    // TODO : add to params
    const quizId = localStorage.getItem("quiz-id");
    console.log("handleStartquiz quizId:", quizId);

    await execute(`/quiz/start-quiz/${quizId}`);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <nav className="flex justify-between items-center h-14 px-8 border-b-4 border-border fixed inset-0 z-50 bg-background">
        <div>
          <h1 className="text-2xl text-red-500 font-semibold">Live</h1>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button variant={`outline`}>{`SessionCode: ${sessionCode}`}</Button>
          <CopyButton content={sessionCode as string} className="" />
        </div>
        <div>
          {owner && (
            <Button onClick={() => handleStartQuiz()}>Start the Quiz</Button>
          )}
        </div>
      </nav>
      <div className="relative flex justify-center items-center h-full w-full">
        {/* Central Ball */}
        <div className="z-20 flex items-center justify-center  border-4 border-black bg-white aspect-square w-48 text-xl font-bold shadow-2xl">
          Quiz name
        </div>

        {/* Animated User Balls */}
        {allUsers.map((user, index) => {
          // Calculate positions
          const angle = index * 137.5 * (Math.PI / 180);
          const distance = 160 + index * 12;
          const targetX = Math.cos(angle) * distance;
          const targetY = Math.sin(angle) * distance;

          // Start from corner
          const cornerIndex = index % 4;
          const startX = cornerIndex % 2 === 0 ? -1000 : 1000;
          const startY = cornerIndex < 2 ? -1000 : 1000;

          return (
            <motion.div
              key={`${user}-${index}`}
              initial={{ x: startX, y: startY, opacity: 0, scale: 0.5 }}
              animate={{ x: targetX, y: targetY, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 60,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.2, zIndex: 30 }}
              drag
              dragConstraints={{
                top: -500,
                left: -500,
                right: 500,
                bottom: 500,
              }}
              className="absolute z-10 flex h-16 w-16 cursor-grab flex-col items-center justify-center  border-2 border-white bg-primary text-primary-foreground shadow-lg active:cursor-grabbing"
            >
              <span className="text-xs font-bold truncate max-w-[90%] px-1">
                {user}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
