import { auth } from "@/auth";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { ReactNode } from "react";
// import { title } from "@/components/primitives";
import { List, Share2, Zap } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
import { FeatureCard } from "@/components/landing/feature-card";
import { SignIn } from "@/components/auth-components";
import Logo from "@/components/seetula/logo";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className=" mx-auto flex flex-col items-center min-h-screen bg-[#F5F5F0]">
      <section className="w-full py-12 md:py-16 lg:py-16 xl:py-24 bg-[#718474] text-white">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Logo size="xl" />
            <div className="space-y-2 flex flex-col">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl md:text-2xl lg:text-3xl/none">
                The Ultimate Checklist
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Boost your productivity, organize your tasks, keep track of all
                your lists effortlessly.
              </p>
            </div>
            <div className="space-x-4">
              {!session && (
                <SignIn className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F5F5F0]">
        <div className=" px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-600 dark:text-blue-400">
            Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <FeatureCard
              title="Reusable Lists"
              description="Lists can be reset so common tasks can be repeated."
              icon={List}
            />
            <FeatureCard
              title="Collaborative Checklists"
              description="Share and collaborate on checklists with your team or family."
              icon={Share2}
            />
            <FeatureCard
              title="Intuitive Task Management"
              description="Create, organize, and prioritize your tasks with ease."
              icon={Zap}
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600 dark:text-blue-400">
                Ready to Get Organized?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                Join at least one satisfied user and start your journey to a
                more productive life today.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              {/* <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Sign Up
                </Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By signing up, you agree to our{" "}
                <Link
                  className="underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
                  href="#"
                >
                  Terms & Conditions
                </Link> 
              </p>*/}
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {false && (
          <div className="flex flex-col rounded-md bg-gray-100 mt-8 max-w-2xl">
            <div className="rounded-t-md bg-gray-200 p-4 font-bold">
              Current Session
            </div>
            <pre className="whitespace-pre-wrap break-all px-4 py-6">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}
