"use client";

import { createRef } from "react";
import { Input } from "../ui/input";

function NewItem() {
  const ref = createRef<HTMLFormElement>();

  async function handleNewItem(formData: FormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formFields = Object.fromEntries(formData);

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
