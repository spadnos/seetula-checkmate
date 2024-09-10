import { fetchChecklist, getChecklistItems } from "@/app/lib/checklist";
import { title } from "@/components/primitives";
import ListGrid from "./list-grid";

async function ChecklistPage({ params }: { params: { id: string } }) {
  const checklist = await fetchChecklist(params.id);

  if (!checklist) {
    return <div>Checklist not found.</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex gap-4">
        <h1 className={title() + " capitalize mb-4"}>{checklist.title}</h1>
        <p className="mt-2">{checklist.description}</p>
      </div>
      <ListGrid checklist={checklist} />
    </div>
  );
}
export default ChecklistPage;
