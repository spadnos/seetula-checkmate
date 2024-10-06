"use client";

import { resetList } from "@/lib/checklist";
import { Button } from "../ui/button";

type props = {
  checklistId: string;
};

function ResetListButton({ checklistId }: props) {
  return (
    <div>
      {" "}
      <Button onClick={() => resetList(checklistId)}>Reset</Button>
    </div>
  );
}
export default ResetListButton;
