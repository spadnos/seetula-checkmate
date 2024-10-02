import { fetchChecklist, fetchChecklists } from "@/lib/checklist";
import { title } from "@/components/primitives";
import ListGrid from "./list-grid";
import NavDropdown from "@/components/checklist/nav-dropdown";
import ItemGroup from "@/components/checklist/item-group";
import SideNav from "@/components/sidenav";
import { ItemType } from "@/lib/types";

function sortItemsByCategory(items: ItemType[]) {
  const groups: { [key: string]: ItemType[] } = {};
  items.forEach((item) => {
    const category = item.category?.title || "uncategorized";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
  });
  return groups;
}

async function ChecklistPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { view: string; hideCompleted?: boolean };
}) {
  // TODO: This can be more efficient
  const checklist = await fetchChecklist(params.id);
  const checklists = await fetchChecklists({
    includeCategories: false,
    includeItems: false,
  });
  const { view = "grid", hideCompleted = false } = searchParams;
  const groupItems: string = "category";

  // console.log("checklists: ", JSON.stringify(checklists, null, 2));
  if (!checklist) {
    return (
      <div>
        Checklist not found.
        <NavDropdown checklists={checklists} />
      </div>
    );
  }

  let groups: { [key: string]: ItemType[] } = {
    "all items": checklist.items,
  };
  if (view === "grid") {
    groups = sortItemsByCategory(checklist.items);
  }

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex gap-4">
        <h1 className={title() + " capitalize mb-4"}>{checklist.title}</h1>

        <p className="mt-2">{checklist.description}</p>
      </div>
      <div className="flex gap-4">
        <SideNav checklists={checklists} />

        <div className=" gap-4 grid grid-cols-3">
          {Object.keys(groups).map((group) => (
            <ItemGroup
              key={group}
              items={groups[group]}
              title={group}
              hideCompleted={hideCompleted}
              checklistId={checklist.id}
            />
          ))}
        </div>

        {view === "oldgrid" && <ListGrid checklist={checklist} />}
      </div>
    </div>
  );
}
export default ChecklistPage;
