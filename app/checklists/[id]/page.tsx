import { fetchChecklist } from "@/lib/checklist";
import { title } from "@/components/primitives";
import ListGrid from "./list-grid";
import ItemGroup from "@/components/checklist/item-group";
import { ItemType, ItemGroupType, ChecklistType } from "@/lib/types";

function sortItemsByCategory(items: ItemType[]) {
  const groups: { [key: string]: ItemGroupType } = {};
  items.forEach((item) => {
    const category = item.category?.title || "uncategorized";
    if (!groups[category]) {
      groups[category] = {
        title: category,
        checklistId: item.checklistId ?? "",
        categoryId: item.categoryId,
        items: [],
      };
    }
    groups[category].items.push(item);
  });
  // console.log("groups: ", JSON.stringify(groups, null, 2));
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
  const { view = "grid", hideCompleted = false } = searchParams;

  // console.log("checklists: ", JSON.stringify(checklists, null, 2));
  if (!checklist) {
    return (
      <div className="flex flex-col items-center w-96 gap-8">
        Checklist not found.
        {/* <NavDropdown checklists={checklists} /> */}
      </div>
    );
  }

  let groups: { [key: string]: ItemGroupType } = {
    "all items": {
      checklistId: checklist.id,
      items: checklist.items as ItemType[],
      title: "all items",
      categoryId: null,
    },
  };

  if (view === "grid") {
    groups = sortItemsByCategory(checklist.items as ItemType[]);
  }

  // console.log("categories: ", JSON.stringify(checklist.categories, null, 2));

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex gap-4">
        <h1 className={title() + " capitalize mb-4"}>{checklist.title}</h1>

        <p className="mt-2">{checklist.description}</p>
      </div>
      <div className="flex gap-4">
        {/* <SideNav checklists={checklists} /> */}

        <div className="w-full gap-4 grid grid-cols-3">
          {Object.values(groups).map((group) => (
            <ItemGroup
              key={group.title}
              group={group}
              title={group.title}
              hideCompleted={hideCompleted}
              checklist={checklist as ChecklistType}
            />
          ))}
        </div>

        {view === "oldgrid" && <ListGrid checklist={checklist} />}
      </div>
    </div>
  );
}
export default ChecklistPage;
