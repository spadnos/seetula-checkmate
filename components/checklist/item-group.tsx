import { ItemType } from "@/lib/types";
import ItemList from "./item-list";
import NewItem from "./new-item";

function ItemGroup({
  checklistId,
  items,
  title,
  hideCompleted,
}: {
  checklistId: string;
  items: ItemType[];
  title?: string;
  hideCompleted: boolean;
}) {
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
      <NewItem checklistId={checklistId} />
      {!hideCompleted && (
        <ItemList heading="Completed" items={completedItems} />
      )}
    </div>
  );
}
export default ItemGroup;
