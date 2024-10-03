"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { MessageCircle as Message } from "lucide-react";
import { ItemType } from "@/lib/types";
import { DragHandleDots2Icon as DragIcon } from "@radix-ui/react-icons";
import {
  deleteItem,
  toggleItemComplete,
  updateListItem,
} from "@/lib/checklist";
import { Button } from "../ui/button";
import ItemEdit from "./item-edit";

export default function ListItem({ item }: { item: ItemType }) {
  const [editMode, setEditMode] = useState(false);
  const [itemTitle, setItemTitle] = useState(item.title);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
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

  // function togglePrivate() {
  //   handleUpdateItem(item.id, { private: !item.private });
  // }

  function toggleEditMode() {
    setEditMode((prev) => !prev);
  }

  function handleSubmit(formData: FormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formFields = Object.fromEntries(formData);

    setItemTitle(formData.get("title")?.toString() || "");
    setItemQuantity(Number(formData.get("quantity")?.toString() || "1"));
    updateListItem(item.id, formFields);

    toggleEditMode();
  }

  async function handleDelete() {
    await deleteItem(item.id);
  }

  async function updateCheckStatus() {
    // console.log("updateCheckStatus");
    // update the db
    await toggleItemComplete(item.id);
  }

  if (editMode) {
    return <ItemEdit item={item} toggleEditMode={toggleEditMode} />;
  }

  return (
    <div
      className="w-full flex justify-between group"
      style={style}
      ref={setNodeRef}
    >
      <div className="flex items-start">
        <button {...attributes} {...listeners} className="">
          <DragIcon />
        </button>
        <div className="mx-2 flex items-start space-x-2 mb-1">
          <Checkbox
            id="completed"
            defaultChecked={item.completed}
            onClick={updateCheckStatus}
          />
          <label
            htmlFor="completed"
            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex space-x-2"
          >
            <div className="">
              <div className="capitalize">
                <span>{item.title}</span>
                {itemQuantity > 1 && (
                  <span className=""> ({itemQuantity})</span>
                )}
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2 group-hover:visible">
          <Message size={16} />
          <Pencil
            size={16}
            className="hover:stroke-1 hover:cursor-pointer"
            onClick={toggleEditMode}
          />
          <Trash
            size={16}
            className="hover:stroke-1 hover:stroke-red-500 hover:cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        {/* {item.private ? (
          <LuLock onClick={togglePrivate} />
        ) : (
          <LuUnlock onClick={togglePrivate} />
        )} */}
      </div>
      {/* <div className="ml-8">
        {item.category && (
          <details className="text-sm">
          <summary className="font-medium">Details</summary>
          <div className="px-2">
          <p>{item.category.title}</p>
          <pre>{JSON.stringify(item.category, null, 2)}</pre>
          </div>
          </details>
          )}
          </div> */}
    </div>
  );
}
