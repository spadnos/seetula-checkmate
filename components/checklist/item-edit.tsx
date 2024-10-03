import { ItemType } from "@/lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { updateListItem } from "@/lib/checklist";
import { useState } from "react";

const categories = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function ItemEdit({
  item,
  toggleEditMode,
}: {
  item: ItemType;
  toggleEditMode: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  async function handleSubmit(formData: FormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formFields = Object.fromEntries(formData);

    await updateListItem(item.id, formFields);
    toggleEditMode();
  }

  return (
    <div className="mx-2 w-full border-2 my-4 px-2 border-green-600">
      <h2>Edit Item</h2>
      <form action={handleSubmit} className="flex flex-col gap-2">
        <Input type="text" name="title" defaultValue={item.title} autoFocus />
        <Input
          type="number"
          name="quantity"
          defaultValue={item.quantity.toString()}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? categories.find((category) => category.value === value)?.label
                : "Select category..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.value}
                      value={category.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === category.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex justify-between">
          <Button className="mt-4 border-2 p-2" onClick={toggleEditMode}>
            Cancel
          </Button>
          <Button type="submit" className="mt-4 border-2 p-2">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
export default ItemEdit;
