"use client";

import { PresentationCard } from "@/app/dashboard/dashboard-components/presentation-card";
import useFetchData from "@/hooks/use-fetch-data";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plus } from "@hugeicons/core-free-icons";
import { CreateQuizDialog } from "./dashboard-components/create-quiz-dialog";
import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { usePostRequest } from "@/lib/api-utils";

// TODO :: async React components
interface Quiz {
  title: string;
  id: string;
  status: string;
  _count: {
    questions: number;
  };
}

export default function DashboardPage() {
  const { fetchData, fetchError, fetching, refetch } =
    useFetchData<Quiz[]>(`/quiz/all-quizes`);

  const { isPending, execute } = usePostRequest();

  const handleDelete = async (quizId: string) => {
    const { success } = await execute(`/quiz/delete/${quizId}`);
    if (success) {
      refetch();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-12">
        <Text className="text-5xl font-normal">Welcome!</Text>
        <div className="flex gap-4">
          <Dialog>
            <Dialog.Trigger asChild>
              <Button className={"flex gap-2"}>
                <Text as={"h6"} className="flex gap-2">
                  Create Quiz
                  <HugeiconsIcon icon={Plus} />
                </Text>
              </Button>
            </Dialog.Trigger>
            <Dialog.Content className="sm:max-w-md">
              <CreateQuizDialog />
            </Dialog.Content>
          </Dialog>
          <Button variant="ghost" disabled>
            Create Quiz with AI (Coming Soon)
          </Button>
          <Button variant="ghost" disabled>
            Import Presentation (Coming Soon)
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12">
        {fetching ? (
          <div className="flex items-center justify-center gap-2 h-full">
            <Loader /> <span>Loading</span>
          </div>
        ) : fetchData ? (
          fetchData.map((quiz, index) => (
            <PresentationCard
              key={index}
              quizId={quiz.id}
              title={quiz.title}
              status={quiz.status}
              questionCount={quiz._count.questions}
              // TODO : Created Time
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Text as={"p"}>{fetchError}</Text>
        )}
      </div>
    </div>
  );
}
