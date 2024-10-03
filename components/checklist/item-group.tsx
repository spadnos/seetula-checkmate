import { ItemGroupType, ItemType } from "@/lib/types";
import ItemList from "./item-list";
import NewItem from "./new-item";

function ItemGroup({
  checklistId,
  group,
  title,
  hideCompleted,
}: {
  checklistId: string;
  group: ItemGroupType;
  title?: string;
  hideCompleted: boolean;
}) {
  const items = group.items;
  if (!items) {
    console.log("group", group);
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
      <ItemList heading="Incomplete" items={incompleteItems} />
      <NewItem checklistId={checklistId} categoryId={group.categoryId} />
      {!hideCompleted && (
        <ItemList heading="Completed" items={completedItems} />
      )}
    </div>
  );
}
export default ItemGroup;
