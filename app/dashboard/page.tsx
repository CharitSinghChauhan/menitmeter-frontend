"use client";

import { Button } from "@/components/ui/button";
import { PresentationCard } from "@/app/dashboard/dashboard-components/presentation-card";
import useFetchData from "@/hooks/use-fetch-data";
import { Spinner } from "@/components/ui/spinner";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddSquareFreeIcons } from "@hugeicons/core-free-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateQuizDialog } from "./dashboard-components/create-quiz-dialog";
import { Toaster } from "@/components/ui/sonner";

// Learn :: async React components
interface Quiz {
  title: string;
  id: string;
  status: string;
  _count: {
    questions: number;
  };
}

export default function DashboardPage() {
  const { fetchData, fetchError, fetching } =
    useFetchData<Quiz[]>(`/quiz/all-quizes`);

  return (
    <div>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-12">
        <h1 className="text-5xl font-normal">Welcome!</h1>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger
              render={
                <Button size="lg" className={"flex gap-2"}>
                  <span>Create Quiz </span>
                  <HugeiconsIcon icon={AddSquareFreeIcons} />
                </Button>
              }
            ></DialogTrigger>
            <DialogContent>
              <CreateQuizDialog />
            </DialogContent>
          </Dialog>
          <Button size="lg" variant="outline" disabled>
            Create Quiz with AI (Coming Soon)
          </Button>
          <Button size="lg" variant="outline" disabled>
            Import Presentation (Coming Soon)
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {fetching ? (
          <div className="flex items-center gap-2">
            <Spinner /> <span>Loading</span>
          </div>
        ) : fetchData ? (
          fetchData.map((quiz) => (
            <PresentationCard
              key={quiz.id}
              title={quiz.title}
              status={quiz.status}
              questionCount={quiz._count.questions}
            />
          ))
        ) : (
          <p>{fetchError}</p>
        )}
      </div>
    </div>
  );
}
