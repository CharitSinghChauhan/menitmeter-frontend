"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import api from "@/lib/axios";
import { usePostRequest } from "@/lib/api-utils";
import { Text } from "@/components/retroui/Text";
import { Button } from "@/components/retroui/Button";
import { ISocketResponse, useSocket } from "@/providers/socket-provider";

export default function LivePage() {
  const router = useRouter();
  const [allUsers, setAllUser] = useState<string[]>([]);
  const params = useParams();
  const sessionCode = params["id"];
  const [owner, setOwner] = useState(false);
  const { execute, isPending } = usePostRequest();
  const { socket, connected } = useSocket();

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
        // error handling
      }
    };

    verifyOwner();
  }, [sessionCode]);

  useEffect(() => {
    if (!socket) return;

    socket.emit(
      "get-all-quiz-user",
      {
        sessionCode,
      },
      (
        response: ISocketResponse<{
          userNickname: string[];
        }>,
      ) => {
        if (response.success) {
          setAllUser(response.payload.userNickname || []);
        } else {
          // handle error
        }
      },
    );

    const handleUserJoined = (
      response: ISocketResponse<{
        nickname: string;
        userId: string;
      }>,
    ) => {
      setAllUser((prev) => [...prev, response.payload.nickname]);
    };

    socket.on("user-joined-notification", handleUserJoined);

    const handleQuizStarted = (
      response: ISocketResponse<{
        quizId: string;
      }>,
    ) => {
      router.push(`/quiz/start/${response.payload.quizId}`);
    };

    socket.on("quiz-started", handleQuizStarted);

    return () => {
      socket.off("user-joined-notification", handleUserJoined);
      socket.off("quiz-started", handleQuizStarted);
    };
  }, [sessionCode, router, socket]);

  const handleStartQuiz = async () => {
    const quizId = localStorage.getItem("quiz-id");

    await execute(`/quiz/start-quiz/${quizId}`);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <nav className="flex justify-between items-center h-14 px-8 border-b-4 border-border fixed inset-0 z-50 bg-background">
        <div>
          <Text as={"h2"} className="text-red-600 font-bold">
            LIVE
          </Text>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button
            variant={`ghost`}
            className="border-border border-2"
          >{`SessionCode: ${sessionCode}`}</Button>
          <CopyButton content={sessionCode as string} className="" />
        </div>
        <div>
          {owner && (
            <Button variant={"default"} onClick={() => handleStartQuiz()}>
              Start the Quiz
            </Button>
          )}
        </div>
      </nav>
      <div className="relative flex justify-center items-center h-full w-full">
        {/* Central Ball */}
        <div className="z-20 shadow-2xl flex items-center justify-center border-4 border-black bg-white aspect-square text-xl font-bold p-2 rounded-full">
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
              className="absolute z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-lg "
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
