import { ChecklistType } from "@/lib/types";
import ItemList from "./item-list";
import NewItem from "./new-item";

function ListView({
  checklist,
  hideCompleted,
}: {
  checklist: ChecklistType;
  hideCompleted: boolean;
}) {
  const completedItems = checklist.items.filter((item) => item.completed);

  const incompleteItems = checklist.items.filter((item) => !item.completed);

  return (
    <div>
      <ItemList heading="Incomplete" items={incompleteItems} />
      <NewItem checklistId={checklist.id} />
      {!hideCompleted && (
        <ItemList heading="Completed" items={completedItems} />
      )}
    </div>
  );
}
export default ListView;
