import { fetchChecklists } from "@/lib/checklist";
import NewList from "./new-list";
import ListCard from "./list-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ChecklistsPage() {
  const checklists = await fetchChecklists();

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-600 dark:text-blue-400">
            My Lists
          </h1>
          <p>{checklists.length} lists</p>
        </div>
        {/* <NewList></NewList> */}
        <Link href="/checklists/new-list">
          <Button>
            <Plus />
            New List
          </Button>
        </Link>
      </div>
      {checklists.length < 1 && (
        <div className="my-4">
          <p>Not lists found. Click to create your first.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 w-full gap-4">
        {checklists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
