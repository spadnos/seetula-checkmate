import { title } from "@/components/primitives";
import { fetchChecklists } from "@/lib/checklist";
import NewList from "./new-list";
import ListCard from "./list-card";

export default async function ChecklistsPage() {
  const checklists = await fetchChecklists();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className={title() + ""}>My Lists</h1>
          <p>{checklists.length} lists</p>
        </div>
        <NewList></NewList>
      </div>
      {checklists.length < 1 && (
        <div className="my-4">
          <p>Not lists found. Click to create your first.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 w-full gap-4">
        {checklists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
