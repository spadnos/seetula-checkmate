"use client";

import { useState } from "react";

// import { LuPencil, LuTrash } from "react-icons/lu";
import { Pencil1Icon as PencilIcon, TrashIcon } from "@radix-ui/react-icons";
import { deleteList } from "@/lib/checklist";
import { useRouter } from "next/navigation";
import NewList from "./new-list";
import ListModal from "./list-modal";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export interface ChecklistType {
  id: string;
  title: string;
  description: string | null;
  user?: object;
  items: object[];
}

export default function ListCard({ list }: { list: ChecklistType }) {
  const [showListEdit, setShowListEdit] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    await deleteList(list.id);

    router.refresh();
  }

  function closeListModal() {
    setShowListEdit(false);
  }

  // const ref = createRef<HTMLFormElement>();

  return (
    <div>
      {showListEdit && <ListModal list={list} onClose={closeListModal} />}
      <div className="flex flex-col items-start px-4 py-2 rounded-lg bg-blue-50 dark:bg-gray-700">
        <div className="w-full flex justify-between items-center border-b-2 border-red-400 py-1 mb-1">
          <Link href={`/checklists/${list.id}`}>
            <h2 className="font-bold text-l hover:text-xl hover:underline">
              {list.title}
            </h2>
          </Link>
          <div className="flex items-center">
            <NewList list={list}>
              <PencilIcon />
            </NewList>
            <Button variant="ghost">
              <TrashIcon onClick={handleDelete} />
            </Button>
          </div>
        </div>
        {/* <Divider /> */}
        <div>
          <p>{list.items?.length} items</p>
          <p>{list.description}</p>
        </div>
      </div>
    </div>
  );
}
