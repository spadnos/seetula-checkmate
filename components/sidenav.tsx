"use client";

import { ChecklistType } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NavDropdown from "./checklist/nav-dropdown";
import Link from "next/link";
import { Button } from "./ui/button";
// import NavDropdown from "./checklist/nav-dropdown";

const VIEWS = [
  {
    id: "grid",
    name: "Grid",
  },
  {
    id: "list",
    name: "List",
  },
];

export default function SideNav({
  checklists,
}: {
  checklists: ChecklistType[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  return (
    <div className="w-64 flex h-full flex-col px-3 py-4 md:px-2">
      <Link href="/checklists/new-list">
        <Button className="mb-4">Create a new list</Button>
      </Link>
      <div className="flex grow flex-row justify-between md:flex-col">
        <NavDropdown checklists={checklists} />

        <div className="mb-4">
          <label htmlFor="view" className="mb-2 block text-sm font-medium">
            Select View
          </label>
          <div className="">
            <select
              id="view"
              name="viewId"
              className="w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={params.get("view") || ""}
              onChange={(e) => {
                params.set("view", e.target.value);
                replace(`${pathname}?${params.toString()}`);
              }}
            >
              <option value="" disabled>
                Select a view
              </option>
              {VIEWS.map((view) => (
                <option key={view.id} value={view.id}>
                  {view.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center space-x-2 text-sm font-medium">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              defaultChecked={searchParams.get("hideCompleted") === "true"}
              onChange={() => {
                if (searchParams.get("hideCompleted") === "true") {
                  params.delete("hideCompleted");
                } else {
                  params.set("hideCompleted", "true");
                }
                replace(`${pathname}?${params.toString()}`);
              }}
            />
            <span>Hide completed items</span>
          </label>
        </div>

        {/* <NavLinks /> */}
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
      </div>
    </div>
  );
}
