"use client";

import { useFormState } from "react-dom";

// import { LuX } from "react-icons/lu";
import { createListAction, updateListAction } from "@/utils/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChecklistType } from "@/lib/types";

export default function ListModal({
  list,
  onClose,
}: {
  list?: ChecklistType;
  onClose: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_data, formAction] = useFormState(
    processForm,
    {} as { success: boolean; message: string }
  );

  console.log(list);

  return (
    <>
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
        <form action={formAction}>
          <div className="flex justify-between">
            <p>{list ? "Edit" : "Create"} a Checklist</p>x
          </div>
          <input name="listId" hidden value={list?.id} />
          <div>
            <Input
              autoFocus
              name="name"
              placeholder="List name"
              defaultValue={list?.title}
            />
            <Textarea
              name="description"
              placeholder="Description of the list"
              defaultValue={list?.description || ""}
            />
          </div>
          <div>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              OK
            </Button>
          </div>
        </form>
      </dialog>
    </>
  );

  async function processForm(previousState: object, formData: FormData) {
    if (list) {
      // update
      await updateListAction(list.id, formData);
    } else {
      await createListAction(formData);
    }
    onClose();

    return { success: true, message: "List created" };
  }
}
