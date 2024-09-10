"use client";

import { useState, createRef } from "react";

import {
  ChecklistWithRelations,
  toggleItemComplete,
  updateListItem,
  createItem,
  deleteItem,
  addCategoryToChecklist,
  removeCategoryFromChecklist,
  resetList,
  // removeCategoryFromChecklist,
} from "@/lib/checklist";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import Category from "../category";
import { Input } from "@/components/ui/input";
import { CategoryType, Id, ItemType } from "../types";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

function sortItems(items: ItemType[], order: string): ItemType[] {
  // console.log("order = ", order.split(","));
  if (!order) {
    return items;
  }
  const sortedItems = order
    .split(",")
    .map((id) => items.find((item) => item.id === id) as ItemType);
  return sortedItems;
}

function ListGrid({ checklist }: { checklist: ChecklistWithRelations }) {
  const [items, setItems] = useState<ItemType[]>(
    sortItems(checklist.items, checklist.itemOrder)
  );
  const [categories, setCategories] = useState<CategoryType[]>(
    checklist.categories
  );

  const ref = createRef<HTMLFormElement>();
  // const [activeCategory, setActiveCategory] = useState<CategoryType | null>(
  //   null
  // );
  // const [activeItem, setActiveItem] = useState<ItemType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  async function handelNewCategory(formData: FormData) {
    const categoryName = formData.get("name")?.toString() || "default";

    // Make sure the category doesn't already exist on this list
    const existingCategory = categories.find((c) => c.title === categoryName);
    if (existingCategory) {
      // TODO: Toast that the category already exists
      ref.current?.reset();
      return;
    }

    // Add the category to the checklist
    const category = await addCategoryToChecklist(checklist.id, categoryName);

    if (category) {
      setCategories([...categories, category]);
    }

    // For some reason updating the state is not causing a refresh

    ref.current?.reset();
  }

  async function handleRemoveCategory(categoryId: string) {
    // console.log("handleRemoveCategory ");

    // TODO: Handle items in category. Need to add message or toast or
    // some other user feedback.
    const categoryItems = items.filter(
      (item) => item.categoryId === categoryId
    );
    if (categoryItems.length > 0) {
      console.log("Cannot remove non-empty category");
      toast({
        title: "Error!",
        description: "Cannot remove non-empty category",
      });
      return;
    }
    await removeCategoryFromChecklist(checklist.id, categoryId);
    setCategories(categories.filter((category) => category.id !== categoryId));
  }

  async function handleNewItem(itemName: string, categoryId: Id) {
    // console.log("adding new item", categoryId, itemName);

    if (!categoryId) return;
    const newItem = await createItem(checklist.id, categoryId, itemName);

    if (!newItem) {
      return;
    }

    setItems([...items, newItem]);
  }

  async function handleDeleteItem(itemId: string) {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);

    await deleteItem(itemId);
  }

  async function handleUpdateItem(id: Id, data: object) {
    await updateListItem(id, data);
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, ...data };
      }
      return item;
    });

    setItems(newItems);
  }

  async function updateCheckStatus(itemId: string) {
    console.log("updateCheckStatus");
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    const item = newItems.find((i) => i.id === itemId);

    // update the db
    // const result = await updateChecklist(list.id, newItems);
    if (item) {
      await toggleItemComplete(item.id);
    }

    // update the component state
    setItems(newItems);
  }

  // sets completed = false for all items in list
  function resetAllItems() {
    const newItems = items.map((item) => {
      return {
        ...item,
        completed: false,
      };
    });
    setItems(newItems);
    resetList(checklist.id);
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Button onClick={resetAllItems}>Reset All</Button>
        <form action={handelNewCategory} ref={ref}>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            {/* <Label htmlFor="name">Category Name</Label> */}
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Add category"
            />
          </div>
        </form>
      </div>

      <div className="mt-4">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <SortableContext items={categories.map((c) => c.id)}>
              {categories.map((category) => (
                <Category
                  key={category.id}
                  category={category}
                  items={items.filter(
                    (item) => item.categoryId === category.id
                  )}
                  addNewItem={handleNewItem}
                  updateCheckStatus={updateCheckStatus}
                  handleDeleteItem={handleDeleteItem}
                  handleUpdateItem={handleUpdateItem}
                  handleRemoveCategory={handleRemoveCategory}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    // console.log("Drag Start: ", event);
    // if (event.active.data.current?.type === "Category") {
    //   setActiveCategory(event.active.data.current.category);
    // }
    // if (event.active.data.current?.type === "Item") {
    //   setActiveItem(event.active.data.current.item);
    // }
  }

  function onDragEnd(event: DragEndEvent) {
    // setActiveCategory(null);
    // setActiveItem(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (active.data.current?.type === "Category") {
      setCategories((categories) => {
        const activeColumnIndex = categories.findIndex(
          (col) => col.id === activeId
        );
        const overColumnIndex = categories.findIndex(
          (col) => col.id === overId
        );

        const newCategories = arrayMove(
          categories,
          activeColumnIndex,
          overColumnIndex
        );
        return newCategories;
      });
    }
  }

  async function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const isActiveTask = active.data.current?.type === "Item";
    const isOverTask = over.data.current?.type === "Item";

    if (!isActiveTask) return;

    // Dragging over annother item
    let overCatId: string | number | null = null;
    if (isActiveTask && isOverTask) {
      const activeIndex = items.findIndex((item) => item.id === activeId);
      const overIndex = items.findIndex((item) => item.id === overId);
      overCatId = items[overIndex].categoryId;
      setItems((items) => {
        items[activeIndex].categoryId = items[overIndex].categoryId;

        return arrayMove(items, activeIndex, overIndex);
      });
    }

    // Dragging over a category
    const isOverCategory = over.data.current?.type === "Category";

    if (isActiveTask && isOverCategory) {
      overCatId = overId;
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.id === activeId);

        items[activeIndex].categoryId = overId.toString();

        return arrayMove(items, activeIndex, activeIndex);
      });
    }
    // const newCategory = categories.find((cat) => cat.id === overCatId)?.title;
    await updateListItem(activeId.toString(), {
      category: { connect: { id: overCatId?.toString() } },
    });
  }
}

export default ListGrid;
