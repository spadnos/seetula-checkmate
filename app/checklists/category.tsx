"use client";
/* eslint-disable */

import { createRef, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Input } from "@/components/ui/input";

import { CategoryType, Id, ItemType } from "@/lib/types";

import ListItem from "../../components/checklist/list-item";
import { Trash } from "lucide-react";
import { updateCategoryAction } from "@/utils/actions";

type props = {
  category?: CategoryType;
  items: ItemType[];
  addNewItem: (itemName: string, categoryId: Id) => void;
  updateCheckStatus: (item: string) => void;
  handleDeleteItem: (id: string) => void;
  handleUpdateItem: (id: Id, data: object) => void;
  handleRemoveCategory: (title: string) => void;
};

export default function Category({
  category,
  items,
  addNewItem,
  handleRemoveCategory,
}: props) {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: category?.id || "",
    data: {
      type: "Category",
      category,
    },
  });
  const [editTitle, setEditTitle] = useState<boolean>(false);
  // const [categoryTitle, setCategoryTitle] = useState(category.title);

  const ref = createRef<HTMLFormElement>();

  async function handleNewItem(formData: FormData) {
    // const formFields = Object.fromEntries(formData);
    addNewItem(formData.get("name")?.toString() || "", category?.id || "");

    // reset the form
    ref.current?.reset();
  }

  async function handleCategoryTitle(formData: FormData) {
    updateCategoryAction(formData);
    setEditTitle(false);
  }

  const completed = items.filter((item) => item.completed) || [];
  const notCompleted = items.filter((item) => !item.completed) || [];

  return (
    <div className="flex flex-col items-start px-4 py-2 rounded-lg bg-blue-50 dark:bg-gray-700">
      <div
        className="w-full flex justify-between items-center border-b-2 border-red-400 px-2 py-1 mb-1"
        {...attributes}
        {...listeners}
      >
        {!editTitle && (
          <h2
            className="capitalize font-bold"
            onClick={() => setEditTitle(true)}
          >
            {category?.title}
          </h2>
        )}
        {editTitle && (
          <form action={handleCategoryTitle}>
            <input hidden name="id" value={category?.id} />
            <input
              defaultValue={category?.title}
              name="title"
              className="px-2"
              autoFocus
              // onBlur={() => setEditTitle(false)}
            />
            <input type="submit" hidden />
          </form>
        )}
        <Trash
          size={20}
          className="hover:stroke-red-400"
          onClick={() => handleRemoveCategory(category?.id || "")}
        />
      </div>

      <div className="flex w-full flex-col mt-2 min-h-16 " ref={setNodeRef}>
        <SortableContext items={notCompleted}>
          {notCompleted.map((item: ItemType) => (
            <ListItem key={item.id} item={item} categories={[]} />
          ))}
        </SortableContext>
      </div>
      {/* </SortableContext> */}
      <form action={handleNewItem} ref={ref} className="m-2 w-full">
        <Input type="text" name="name" placeholder="Add item" />
      </form>

      <div className="mt-4 w-full">
        <div className="flex justify-between text-sm mb-1 mx-2 ">
          <span className="font-bold ">Completed</span>
          <span>
            {completed.length} of {items.length}
          </span>
        </div>
        {completed.map((item: ItemType) => (
          <ListItem key={item.id} item={item} categories={[]} />
        ))}
      </div>
    </div>
  );
}
