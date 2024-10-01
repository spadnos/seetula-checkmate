import { ItemType } from "@/lib/types";
import ListItem from "./list-item";

function ItemList({ items, heading }: { items: ItemType[]; heading: string }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold">{heading}</h2>
      <p className="text-sm font-bold mb-2"># of items: {items.length}</p>
      {items.map((item) => (
        <div key={item.id}>
          <ListItem key={item.id} item={item} />
          {/* {item.categoryId} */}
        </div>
      ))}
    </div>
  );
}
export default ItemList;
