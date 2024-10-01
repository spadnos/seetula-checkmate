import { fetchChecklist, fetchChecklists } from "@/lib/checklist";
import { title } from "@/components/primitives";
import ListGrid from "./list-grid";
import NavDropdown from "@/components/checklist/nav-dropdown";
import ListView from "@/components/checklist/list-view";
import SideNav from "@/components/sidenav";

async function ChecklistPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { view: string };
}) {
  // TODO: This can be more efficient
  const checklist = await fetchChecklist(params.id);
  const checklists = await fetchChecklists();
  // console.log("searchParams: ", searchParams);
  const { view = "grid" } = searchParams;

  // console.log("checklists: ", JSON.stringify(checklists, null, 2));
  if (!checklist) {
    return (
      <div>
        Checklist not found.
        <NavDropdown checklists={checklists} />
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex gap-4">
        <h1 className={title() + " capitalize mb-4"}>{checklist.title}</h1>

        <p className="mt-2">{checklist.description}</p>
      </div>
      <div className="flex gap-4">
        <SideNav />

        {view === "list" && <ListView checklist={checklist} />}
        {view === "grid" && <ListGrid checklist={checklist} />}
      </div>
    </div>
  );
}
export default ChecklistPage;
