import { ChecklistType, ItemGroupType } from "@/lib/types";
import ItemList from "./item-list";
import NewItem from "./new-item";

type props = {
  checklist: ChecklistType;
  group: ItemGroupType;
  title?: string;
  hideCompleted: boolean;
};
function ItemGroup({ checklist, group, title, hideCompleted }: props) {
  const items = group.items;
  if (!items) {
    // console.log("group", group);
    return null;
  }
  const completedItems = items.filter((item) => item.completed);
  const incompleteItems = items.filter((item) => !item.completed);

  return (
    <div className="w-full flex flex-col items-start px-4 py-2 rounded-lg bg-blue-50 dark:bg-gray-700">
      <div
        className="capitalize w-full flex justify-between items-center border-b-2
      border-red-400 py-1 mb-1"
      >
        {title && <h2 className="text-lg font-bold">{title}</h2>}
      </div>
      <ItemList
        heading="Incomplete"
        items={incompleteItems}
        categories={checklist.categories}
      />
      <NewItem checklistId={checklist.id} categoryId={group.categoryId} />
      {!hideCompleted && (
        <ItemList
          heading="Completed"
          items={completedItems}
          categories={checklist.categories}
        />
      )}
    </div>
  );
}
export default ItemGroup;
