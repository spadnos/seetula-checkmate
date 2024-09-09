import { MainNav } from "@/components/main-nav";
import UserButton from "@/components/user-button";
import DarkMode from "./navbar/dark-mode";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
      <MainNav />
      <div className="flex space-x-4">
        <DarkMode />
        <UserButton />
      </div>
    </header>
  );
}
