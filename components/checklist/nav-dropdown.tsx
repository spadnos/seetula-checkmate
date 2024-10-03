import { ChecklistType } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NavDropdown = ({ checklists }: { checklists: ChecklistType[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  // const checkslists = await fetchChecklists();
  if (!checklists) {
    return null;
  }

  return (
    <div className="relative inline-block text-left">
      <div className="mb-4">
        <label htmlFor="view" className="mb-2 block text-sm font-medium">
          Select Checklist
        </label>
        <div className="relative">
          <select
            id="checklist"
            name="checklistId"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={pathname?.split("/")[2] || ""}
            onChange={(e) => {
              replace(`/checklists/${e.target.value}?${params.toString()}`);
            }}
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
      {/* <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          Select Checklist
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {checklists.map((link, index) => (
              <a
                key={index}
                href={`/checklists/${link.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default NavDropdown;
