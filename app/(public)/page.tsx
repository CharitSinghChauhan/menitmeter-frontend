"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import JoinSessionBoard from "@/components/layout/join-session-board";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { authClient } from "@/lib/auth";
import SignIn from "@/components/sign-in";
import { Loader } from "@/components/retroui/Loader";
import { Dialog } from "@/components/retroui/Dialog";

export default function PublicPage() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  return (
    <div className="bg-white font-display text-black min-h-screen">
      <header className="border-b-4 border-black bg-white sticky top-0 z-50 mb-5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary border-2 border-black flex items-center justify-center">
              <Text>⚡</Text>
            </div>
            <h2 className="text-2xl font-black tracking-tighter uppercase italic text-black">
              QuizArena
            </h2>
          </div>
          <nav className="hidden md:flex justify-center items-center gap-10">
            <a
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2"
              href="#"
            >
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Join Quiz
            </a>
            <a
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
              href="#"
            >
              Leaderboards
            </a>
            <a
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
              href="#"
            >
              Results
            </a>
          </nav>
          <div className="flex items-center gap-4 lg:ml-24">
            {isPending ? (
              <Loader />
            ) : data ? (
              <Button onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <Dialog>
                <Dialog.Trigger asChild>
                  <Button>Login</Button>
                </Dialog.Trigger>
                <Dialog.Content className="max-w-xs w-full">
                  <SignIn />
                </Dialog.Content>
              </Dialog>
            )}
          </div>
        </div>
      </header>
      <JoinSessionBoard />
      <section className="relative pt-10 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-block border-2 border-black px-4 py-1 mb-8 text-xs font-bold uppercase tracking-widest bg-black text-white">
            Status: Live Sessions Active
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase ">
            Join Live Quizzes: <br />{" "}
            <span className="text-primary italic">Play, Compete, Win.</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-12 text-black font-medium">
            Enter a session code to jump into real-time quizzes. Answer questions instantly, track your score, and see live rankings against other players.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-black font-mono text-sm uppercase">
            <div className="flex items-center gap-2 font-bold">
              <span className=" text-xs text-primary">
                <HugeiconsIcon icon={Tick02Icon} />
              </span>{" "}
              Instant Join
            </div>
            <div className="flex items-center gap-2 font-bold">
              <span className="text-xs text-primary">
                <HugeiconsIcon icon={Tick02Icon} />
              </span>{" "}
              Real-Time Answers
            </div>
            <div className="flex items-center gap-2 font-bold">
              <span className=" text-xs text-primary">
                <HugeiconsIcon icon={Tick02Icon} />
              </span>{" "}
              Live Leaderboards
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-4 border-black bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
          <div className="p-10 flex flex-col gap-2">
            <p className="text-black font-mono text-xs uppercase tracking-widest font-bold">
              Active Sessions
            </p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black">247</span>
              <span className="text-primary font-bold text-sm mb-1">+15</span>
            </div>
            <div className="w-full bg-zinc-200 h-1 mt-2">
              <div className="bg-primary h-full w-4/5"></div>
            </div>
          </div>
          <div className="p-10 flex flex-col gap-2">
            <p className="text-black font-mono text-xs uppercase tracking-widest font-bold">
              Players Online
            </p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black">12,543</span>
              <span className="text-black font-bold text-sm mb-1">+8%</span>
            </div>
            <div className="w-full bg-zinc-200 h-1 mt-2">
              <div className="bg-black h-full w-full"></div>
            </div>
          </div>
          <div className="p-10 flex flex-col gap-2">
            <p className="text-black font-mono text-xs uppercase tracking-widest font-bold">
              Avg Response Time
            </p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black uppercase tracking-tighter">
                1.2s
              </span>
            </div>
            <span className="text-black font-mono text-[10px] mt-2 tracking-tighter uppercase border border-black inline-block px-2 py-0.5 self-start font-bold">
              Real-Time Sync
            </span>
          </div>
          <div className="p-10 flex flex-col gap-2">
            <p className="text-black font-mono text-xs uppercase tracking-widest font-bold">
              Top Score Today
            </p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black">9,850</span>
              <span className="text-primary font-bold text-sm mb-1">pts</span>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="h-4 w-1 bg-primary"></div>
              <div className="h-6 w-1 bg-black"></div>
              <div className="h-4 w-1 bg-primary"></div>
              <div className="h-8 w-1 bg-black"></div>
              <div className="h-5 w-1 bg-primary"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
            Experience the <br />{" "}
            <span className="bg-black text-white px-4 inline-block">
              Thrill.
            </span>
          </h2>
          <p className="text-xl text-black max-w-2xl font-medium">
            Join live quiz sessions, answer questions in real-time, and watch your ranking update instantly as you compete with players worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-4 border-black p-8 bg-white brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none group">
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-primary mb-8 group-hover:rotate-6 transition-transform">
              <span className=" text-white text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">
              Quick Join
            </h3>
            <p className="text-black font-medium leading-relaxed">
              Enter a 6-digit code and jump straight into an active quiz. No sign-up required for participants.
            </p>
          </div>
          <div className="border-4 border-black p-8 bg-white brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none group">
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-black mb-8 group-hover:rotate-6 transition-transform">
              <span className=" text-white text-3xl">🏆</span>
            </div>
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">
              Live Rankings
            </h3>
            <p className="text-black font-medium leading-relaxed">
              See your position update in real-time. Compete for the top spot and track your progress against others.
            </p>
          </div>
          <div className="border-4 border-black p-8 bg-white brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none group">
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-primary mb-8 group-hover:rotate-6 transition-transform">
              <span className=" text-white text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">
              Instant Results
            </h3>
            <p className="text-black font-medium leading-relaxed">
              Get immediate feedback on answers. View detailed results and leaderboards at the end of each quiz.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto border-4 border-black bg-white p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 max-w-2xl leading-[0.9]">
              Ready to test <br />{" "}
              <span className="text-primary">your wits?</span>
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => router.push("/dashboard")}>Create Quiz</Button>
              <Button>Browse Sessions</Button>
            </div>
          </div>
          <div className="absolute right-[-5%] top-[-10%] opacity-10 pointer-events-none rotate-12">
            <span className=" text-[300px] text-black select-none">quiz</span>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-black bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary border border-black flex items-center justify-center">
                <span className=" text-white text-sm">⚡</span>
              </div>
              <h2 className="text-xl font-black tracking-tighter uppercase italic">
                QuizArena
              </h2>
            </div>
            <p className="text-black font-medium mb-8">
              Join live quiz battles, answer in real-time, and climb the global leaderboards in this fast-paced knowledge arena.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
                href="#"
              >
                <span className=" text-sm">🌐</span>
              </a>
              <a
                className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
                href="#"
              >
                <span className=" text-sm">📱</span>
              </a>
              <a
                className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
                href="#"
              >
                <span className=" text-sm">🔗</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h4 className="font-black uppercase text-sm mb-6 tracking-widest text-black">
                Play
              </h4>
              <ul className="flex flex-col gap-4 text-black font-bold text-sm uppercase">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Join Session
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Live Quizzes
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Leaderboards
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Results
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-sm mb-6 tracking-widest text-black">
                Host
              </h4>
              <ul className="flex flex-col gap-4 text-black font-bold text-sm uppercase">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Create Quiz
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Manage Sessions
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Analytics
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-black uppercase text-sm mb-6 tracking-widest text-black">
                Live Stats
              </h4>
              <div className="bg-white p-4 border border-black">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-black font-bold">
                    ACTIVE QUIZZES
                  </span>
                  <span className="text-[10px] font-mono text-primary font-bold">
                    247
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-black font-bold">
                    TOTAL PLAYERS
                  </span>
                  <span className="text-[10px] font-mono text-black font-bold">
                    12,543
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-black flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-black font-mono text-[10px] uppercase tracking-widest font-bold">
            © 2024 QUIZARENA // POWERED BY REAL-TIME TECH
          </p>
          <div className="flex gap-8 text-black font-mono text-[10px] uppercase tracking-widest font-bold">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
