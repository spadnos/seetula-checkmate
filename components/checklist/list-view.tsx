import { ChecklistType } from "@/lib/types";
import ItemList from "./item-list";

function ListView({ checklist }: { checklist: ChecklistType }) {
  // console.log("checklist: ", checklist);
  const completedItems = checklist.items.filter((item) => item.completed);
  const incompleteItems = checklist.items.filter((item) => !item.completed);

  return (
    <div>
      <ItemList heading="Incomplete" items={incompleteItems} />
      <ItemList heading="Completed" items={completedItems} />
    </div>
  );
}
export default ListView;
