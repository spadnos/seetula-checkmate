"use client";

import { createRef, useState } from "react";

// import { LuPencil, LuTrash } from "react-icons/lu";
import { Pencil1Icon as PencilIcon, TrashIcon } from "@radix-ui/react-icons";
import { createItem, deleteList, updateListItem } from "@/lib/checklist";
import { useRouter } from "next/navigation";
import NewList from "./new-list";
import ListModal from "./list-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Prisma } from "@prisma/client";

export default function ListCard({
  list,
}: {
  list: Prisma.ChecklistCreateInput;
}) {
  const [showListEdit, setShowListEdit] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    await deleteList(list.id);

    router.refresh();
  }

  async function handleListEdit() {
    // consdier doing this with a route param instead
    setShowListEdit(true);
  }

  function closeListModal() {
    setShowListEdit(false);
  }

  // const ref = createRef<HTMLFormElement>();

  return (
    <div>
      {showListEdit && <ListModal list={list} onClose={closeListModal} />}
      <Card className="border-2 px-2">
        <CardHeader className="flex justify-between items-start border-b">
          <div className="flex flex-col">
            <Link href={`/checklists/${list.id}`}>
              <h2 className="font-bold text-l">{list.title}</h2>
            </Link>
          </div>
          <div className="flex">
            <NewList list={list}>
              <PencilIcon />
            </NewList>
            <Button variant="ghost">
              <TrashIcon onClick={handleDelete} />
            </Button>
          </div>
        </CardHeader>
        {/* <Divider /> */}
        <CardContent>
          <p>{list.items?.length} items</p>
          <p>{list.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
