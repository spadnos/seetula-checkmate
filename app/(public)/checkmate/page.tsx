import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { List, Share2, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center bg-white dark:bg-gray-800 shadow-sm">
        <Link className="flex items-center justify-center" href="#">
          <CheckCircle className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-blue-600 dark:text-blue-400">
            CheckMate
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header> */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-600 dark:text-blue-400">
                  Simplify Your Life with CheckMate
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
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 CheckMate. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:text-blue-600 dark:hover:text-blue-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:text-blue-600 dark:hover:text-blue-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
