import { ChecklistType } from "@/lib/types";
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
export default function SideNav() {
  const checklists: ChecklistType[] = [];

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between md:flex-col">
        {/* <NavDropdown checklists={[]} /> */}
        <div className="mb-4">
          <label htmlFor="view" className="mb-2 block text-sm font-medium">
            Select Checklist
          </label>
          <div className="relative">
            <select
              id="checklist"
              name="checklistId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a checklist
              </option>
              {checklists.map((checklist) => (
                <option key={checklist.id} value={checklist.id}>
                  {checklist.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="view" className="mb-2 block text-sm font-medium">
            Select View
          </label>
          <div className="relative">
            <select
              id="view"
              name="viewId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
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
            />
            <span>Hide completed</span>
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
