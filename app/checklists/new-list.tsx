"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Prisma } from "@prisma/client";
import { ReactNode, useState } from "react";
import { createListAction, updateListAction } from "@/utils/actions";

export default function NewList({
  list,
  children,
}: {
  list?: Prisma.ChecklistCreateInput;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  async function onSubmit(formData: FormData) {
    let result = { success: true, message: "" };
    if (list) {
      result = await updateListAction(list.id, formData);
    } else {
      result = await createListAction(formData);
    }
    if (result.success) {
      setOpen(false);
    }

    return result;
  }

  const variant = list ? "ghost" : "default";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size="sm" onClick={() => setOpen(true)}>
          {children ? children : "New List"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New List</DialogTitle>
          <DialogDescription>
            Create a new list. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" action={onSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              List Name
            </Label>
            <input
              id="name"
              name="name"
              defaultValue={list?.title || "List name"}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              defaultValue={list?.description || ""}
              className="col-span-3"
            />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
// } from "@nextui-org/modal";
// import { Button } from "@nextui-org/button";
// import { Input, Textarea } from "@nextui-org/input";
// import { useFormState, useFormStatus } from "react-dom";
// import { Prisma } from "@prisma/client";
// import { ReactElement } from "react";
// import { createListAction, updateListAction, FormState } from "@/utils/actions";

// export default function NewList({
//   list,
//   children,
//   variant = "solid",
// }: {
//   list?: Prisma.ChecklistCreateInput;
//   children: ReactElement;
//   variant?: "solid" | "ghost" | "light";
// }) {
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//   const { pending } = useFormStatus();
//   // const [data, formAction] = useFormState(
//   //   processForm,
//   //   {} as { success: boolean; message: string }
//   // );
//   const [formState, action] = useFormState(handleSubmit, {
//     success: false,
//     message: "",
//   });

//   return (
//     <>
//       <Button onPress={onOpen} variant={variant}>
//         {children}
//       </Button>
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <ModalContent>
//           <form action={action}>
//             <ModalHeader className="flex flex-col gap-1">
//               {list ? "Edit" : "Create a"} Checklist
//             </ModalHeader>
//             <ModalBody>
//               <input hidden name="listId" value={list?.id} />
//               <Input
//                 autoFocus
//                 label="List Name"
//                 name="name"
//                 placeholder="List name"
//                 defaultValue={list?.title}
//                 variant="bordered"
//               />
//               <Textarea
//                 label="description"
//                 name="description"
//                 placeholder="Short description of the list"
//                 defaultValue={list?.description || ""}
//                 variant="bordered"
//               />
//             </ModalBody>
//             <ModalFooter>
//               <Button variant="flat" onPress={handleClose}>
//                 Cancel
//               </Button>
//               <Button color="primary" type="submit">
//                 {pending ? "Creating..." : "OK"}
//               </Button>
//               <div></div>
//             </ModalFooter>
//             {!formState.success && <div>{formState.message}</div>}
//           </form>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
