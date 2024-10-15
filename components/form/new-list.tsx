"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { checklistSchema, ChecklistSchemaType } from "@/utils/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListAction } from "@/lib/checklist";
import { useToast } from "@/hooks/use-toast";

function NewList() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChecklistSchemaType>({
    resolver: zodResolver(checklistSchema),
  });
  const { toast } = useToast();

  async function onSubmit(data: ChecklistSchemaType) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("private", data.private ? "true" : "false");
    const { errors } = await createListAction(formData);
    if (!errors) {
      toast({
        title: "Created List",
      });
      // reset form
      reset();
    } else {
      // TODO: need to do somethiing better in this case
      console.error(errors);
    }
  }

  return (
    <form
      className="w-full md:w-1/2 flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        <Label htmlFor="name" className="text-right">
          List Name
        </Label>
        <Input {...register("title")} className="w-full" />
        {errors.title && (
          <span className="text-red-500">
            {errors.title?.message?.toString() || ""}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          {...register("description")}
          defaultValue={""}
          className="w-full"
        />
        {errors.description && (
          <span className="text-red-500">
            {errors.description?.message?.toString() || ""}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="private" className="text-right">
          Private
        </Label>

        <input
          type="checkbox"
          {...register("private")}
          defaultChecked={false}
        />
        {errors.private && (
          <span className="text-red-500">
            {errors.private?.message?.toString() || ""}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="template" className="text-right">
          Template
        </Label>
        <select id="template" className="w-full">
          <option value="">Select a template</option>
          <option value="grocery">Grocery</option>
          <option value="travel">Travel</option>
        </select>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
export default NewList;
