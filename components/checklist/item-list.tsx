import { ItemType } from "@/lib/types";
import ListItem from "./list-item";

type props = {
  items: ItemType[];
  heading: string;
};

function ItemList({ items, heading }: props) {
  return (
    <div className="w-full flex flex-col items-start py-2 rounded-lg bg-blue-50 dark:bg-gray-700">
      <div className="mb-2 flex w-full justify-between items-center">
        <h2 className="text-lg font-bold capitalize">{heading}</h2>
        <p className="text-sm font-bold">{items.length} items</p>
      </div>
      <div className="w-full space-y-2">
        {items.map((item) => (
          <div key={item.id}>
            <ListItem key={item.id} item={item} />
            {/* {item.categoryId} */}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ItemList;
