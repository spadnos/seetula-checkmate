import { MainNav } from "@/components/main-nav";
import UserButton from "@/components/user-button";

export default function Header() {
  return (
    <header className="sticky w-full flex justify-center border-b max-w-5xl">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
        <MainNav />
        <UserButton />
      </div>
    </header>
  );
}
