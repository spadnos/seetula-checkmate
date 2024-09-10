import { fetchChecklist } from "@/lib/checklist";
import { title } from "@/components/primitives";
import ListGrid from "./list-grid";

async function ChecklistPage({ params }: { params: { id: string } }) {
  const checklist = await fetchChecklist(params.id);

  if (!checklist) {
    return <div>Checklist not found.</div>;
  }

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex gap-4">
        <h1 className={title() + " capitalize mb-4"}>{checklist.title}</h1>
        <p className="mt-2">{checklist.description}</p>
      </div>
      <ListGrid checklist={checklist} />
    </div>
  );
}
export default ChecklistPage;
