import { CategoryType, ItemType } from "@/lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// import { updateListItem } from "@/lib/checklist";
// import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, ItemSchemaType } from "@/utils/schemas";

type props = {
  item: ItemType;
  toggleEditMode: () => void;
  categories: CategoryType[];
};
function ItemEdit({ item, toggleEditMode, categories }: props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemSchemaType>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: item.title,
      quantity: item.quantity,
      isPrivate: item.private,
      categoryId: item.categoryId || undefined,
    },
  });
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(item.categoryId);

  async function onSubmit(data: ItemSchemaType) {
    // checkboxes don't show up in the formData if not checked
    const formData = new FormData();
    formData.append("title", data.title);

    // await updateListItem(formData);
    console.log(formData);
    toggleEditMode();
  }

  return (
    <div className="mx-2 w-full border-2 my-4 px-2 border-green-600">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input type="hidden" name="id" defaultValue={item.id} />
        <Input {...register("title")} defaultValue={item.title} autoFocus />
        {<p className="text-red-500">{errors.title?.message}</p>}

        <Input
          {...register("quantity")}
          defaultValue={item.quantity.toString()}
        />

        <Label htmlFor="private">Private</Label>
        <Checkbox {...register("isPrivate")} defaultChecked={item.private} />

        <select
          {...register("categoryId")}
          defaultValue={item.categoryId ?? ""}
          className="w-full border-2 px-2 py-1 rounded-md"
        >
          <option value="">No Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <div className="flex justify-between">
          <Button className="mt-4 border-2 p-2" onClick={toggleEditMode}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 border-2 p-2"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default ItemEdit;
