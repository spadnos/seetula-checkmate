import { MainNav } from "@/components/main-nav";
import UserButton from "@/components/user-button";
import DarkMode from "./navbar/dark-mode";

export default function Header() {
  return (
    <nav className="bg-sage-800 dark:bg-sage-800  py-4">
      <div className="container mx-auto flex justify-between items-center">
        <MainNav />
        <div className="flex space-x-4">
          <DarkMode />
          <div className="text-gray-200">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
