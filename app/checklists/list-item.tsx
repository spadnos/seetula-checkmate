import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  LuPencil,
  LuTrash2,
  LuMessageSquare,
  LuLock,
  LuUnlock,
} from "react-icons/lu";
import { Id, ItemType } from "./types";

export default function ListItem({
  item,
  toggleCompleted,
  handleDeleteItem,
  handleUpdateItem,
}: {
  item: ItemType;
  toggleCompleted: (id: Id) => void;
  handleDeleteItem: (id: Id) => void;
  handleUpdateItem: (id: Id, data: {}) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: item.id,
      data: {
        type: "Item",
        item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function togglePrivate() {
    handleUpdateItem(item.id, { private: !item.private });
  }

  function handleSubmit(formData: FormData) {
    const formFields = Object.fromEntries(formData);

    handleUpdateItem(item.id, formFields);

    toggleEditMode();
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="mx-2 border-2 my-4 px-2 border-green-600"
      >
        <h2>Edit Item</h2>
        <form action={handleSubmit} className="flex flex-col gap-2">
          <Input type="text" name="title" defaultValue={item.title} autoFocus />
          <Input
            type="number"
            name="quantity"
            defaultValue={item.quantity.toString()}
          />
          <button type="submit" className="mt-4 border-2 p-2">
            Done
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      className="flex group justify-between items-start px-2"
      style={style}
      ref={setNodeRef}
    >
      <div className="flex items-center">
        <button {...attributes} {...listeners} className="">
          ⣿
        </button>
        <div className="mx-2 flex items-center space-x-2">
          <Checkbox
            id="completed"
            defaultChecked={item.completed}
            onClick={() => toggleCompleted(item.id)}
          />
          <label
            htmlFor="completed"
            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex space-x-2"
          >
            {item.title}
            {item.quantity > 1 && <div className="ml-2">({item.quantity})</div>}
          </label>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2 group-hover:visible">
          <LuMessageSquare />
          <LuPencil className="hover:stroke-1" onClick={toggleEditMode} />
          <LuTrash2
            className="hover:stroke-1 hover:stroke-red-500"
            onClick={() => handleDeleteItem(item.id)}
          />
        </div>
        {/* {item.private ? (
          <LuLock onClick={togglePrivate} />
        ) : (
          <LuUnlock onClick={togglePrivate} />
        )} */}
      </div>
    </div>
  );

  function toggleEditMode() {
    setEditMode((prev) => !prev);
  }
}
