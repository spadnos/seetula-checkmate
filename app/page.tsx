import { auth } from "@/auth";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { ReactNode } from "react";
// import { title } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { List, Share2, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { siteConfig } from "@/config/site";

// function FeatureCard({
//   title,
//   description,
// }: {
//   title: ReactNode;
//   description: string;
// }) {
//   return (
//     <Card>
//       <CardHeader>{title}</CardHeader>
//       <CardContent>
//         <p>{description}</p>
//       </CardContent>
//     </Card>
//   );
// }

// const FEATURES = [
//   {
//     title: "typescript",
//     description: "",
//   },
//   {
//     title: "prisma",
//     description: `Managing the DB directly was not scaling well. Prisma seems to
//                   be the most common ORM so I gave it a try.`,
//   },
//   {
//     title: "zod",
//     description: `Data entry (and editing) is one of the keep features of many
//             apps. Validating the data from the forms is key.`,
//   },
//   {
//     title: "NextUI",
//     description: `There are a lot of component libraries each with pros and cons.
//       Here I am trying NextUI to see how I like it.`,
//   },
//   {
//     title: "Forms",
//     description: `Data input through forms is important is most of the apps I do.
//       I wanted to come up with a good template that I could use.`,
//   },
//   {
//     title: "Drag and Drop (DnD)",
//     description: `DnD can really enhance the user experience. Figuring out how to
//       use it well is imporant.`,
//   },
// ];

export default async function LandingPage() {
  const session = await auth();

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-600 dark:text-blue-400">
                Simplify Your Life with {siteConfig.name}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
                The ultimate checklist app to boost your productivity and
                organize your tasks effortlessly.
              </p>
            </div>
            <div className="space-x-4">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className=" px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-600 dark:text-blue-400">
            Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-blue-50 dark:bg-gray-700">
              <List className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Intuitive Task Management
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Create, organize, and prioritize your tasks with ease.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-blue-50 dark:bg-gray-700">
              <Share2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Collaborative Checklists
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Share and collaborate on checklists with your team or family.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-blue-50 dark:bg-gray-700">
              <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Smart Reminders
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Never miss a task with our intelligent reminder system.
              </p>
            </div>
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
                Join thousands of satisfied users and start your journey to a
                more productive life today.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
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
              </p>
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
    </>
  );
}
