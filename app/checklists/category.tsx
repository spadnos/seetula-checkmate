"use client";

import { createRef, useEffect, useState } from "react";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";

import { CategoryType, Id, ItemType } from "./types";

import ListItem from "./list-item";
import { LuTrash2 } from "react-icons/lu";

type props = {
  category: CategoryType;
  items: ItemType[];
  addNewItem: (itemName: string, categoryId: Id) => void;
  updateCheckStatus: (item: string) => void;
  handleDeleteItem: (id: string) => void;
  handleUpdateItem: (id: Id, data: {}) => void;
  handleRemoveCategory: (title: string) => void;
  updateCategoryTitle: (categoryId: string, title: string) => void;
};

export default function Category({
  category,
  items,
  addNewItem,
  updateCheckStatus,
  handleDeleteItem,
  handleUpdateItem,
  handleRemoveCategory,
  updateCategoryTitle,
}: props) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: category.id,
      data: {
        type: "Category",
        category,
      },
    });
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState(category.title);

  const ref = createRef<HTMLFormElement>();

  async function handleNewItem(formData: FormData) {
    const formFields = Object.fromEntries(formData);
    addNewItem(formData.get("name")?.toString() || "", category.id);

    // reset the form
    ref.current?.reset();
  }

  const completed = items.filter((item) => item.completed) || [];
  const notCompleted = items.filter((item) => !item.completed) || [];

  return (
    <div className="border-2 rounded-sm pb-2" ref={setNodeRef}>
      <div
        className="flex justify-between items-center border-b-1 px-2 py-1 mb-1"
        {...attributes}
        {...listeners}
      >
        {!editTitle && (
          <h2
            className="capitalize font-bold"
            onClick={() => setEditTitle(true)}
          >
            {category.title}
          </h2>
        )}
        {editTitle && (
          <form>
            <input
              defaultValue={categoryTitle}
              className="px-2"
              autoFocus
              onBlur={() => setEditTitle(false)}
            />
          </form>
        )}
        <LuTrash2
          className="hover:stroke-red-400"
          onClick={() => handleRemoveCategory(category.id)}
        />
      </div>

      <div className="flex flex-col min-h-16 " ref={setNodeRef}>
        <SortableContext items={notCompleted}>
          {notCompleted.map((item: any) => (
            <ListItem
              key={item.id}
              item={item}
              toggleCompleted={updateCheckStatus}
              handleDeleteItem={handleDeleteItem}
              handleUpdateItem={handleUpdateItem}
            />
          ))}
        </SortableContext>
      </div>
      {/* </SortableContext> */}
      <form action={handleNewItem} ref={ref} className="m-2">
        <Input type="text" name="name" placeholder="Add item" />
      </form>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1 mx-2 ">
          <span className="font-bold ">Completed</span>
          <span>
            {completed.length} of {items.length}
          </span>
        </div>
        {completed.map((item: any, index: number) => (
          // <div key={index}>{item.name}</div>

          <ListItem
            key={item.id}
            item={item}
            toggleCompleted={updateCheckStatus}
            handleDeleteItem={updateCheckStatus}
            handleUpdateItem={handleUpdateItem}
          />
        ))}
      </div>
    </div>
  );
}
