import { MainNav } from "@/components/main-nav";
import UserButton from "@/components/user-button";
import DarkMode from "./navbar/dark-mode";

export default function Header() {
  return (
    <header className="sticky w-full flex justify-center border-b max-w-7xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <MainNav />
        <div className="flex space-x-4">
          <DarkMode />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
