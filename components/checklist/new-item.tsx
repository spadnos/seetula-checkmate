"use client";

import { createRef } from "react";
import { Input } from "../ui/input";
import { CategoryType } from "@/lib/types";
import { addItemToChecklist } from "@/lib/checklist";

type props = {
  checklistId: string;
  categoryId?: string | null;
};

function NewItem({ checklistId, categoryId }: props) {
  const ref = createRef<HTMLFormElement>();

  async function handleNewItem(formData: FormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const name = formData.get("name")?.toString() || "";

    // Add the item to the checklist
    try {
      await addItemToChecklist(checklistId, categoryId || "", name);
    } catch (error) {
      console.log(error);
    }

    // reset the form
    ref.current?.reset();
  }

  return (
    <form action={handleNewItem} ref={ref} className="m-2 w-full">
      <Input type="text" name="name" placeholder="Add item" />
    </form>
  );
}
export default NewItem;
