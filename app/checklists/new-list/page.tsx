"use client";

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChecklistType } from "@/lib/types";
import { checklistSchema } from "@/utils/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

function NewListPage({ list }: { list?: ChecklistType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(checklistSchema) });

  async function onSubmit1(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // "use server";
    console.log("Creating new list", e.target);
    // revalidatePath("/checklists");
    // redirect("/checklists");
  }

  async function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="flex flex-col w-full items-center">
      <PageTitle title="New List" />
      <form
        className="w-full md:w-1/2 flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <Label htmlFor="name" className="text-right">
            List Name
          </Label>
          <Input id="name" {...register("title")} className="w-full" />
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
            id="description"
            name="description"
            defaultValue={list?.description || ""}
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

          <Checkbox id="private" />
        </div>
        <div className="">
          <Label htmlFor="template" className="text-right">
            Template
          </Label>
          <select id="template" className="w-full" {...register("template")}>
            <option value="">Select a template</option>
            <option value="grocery">Grocery</option>
            <option value="travel">Travel</option>
          </select>
          {errors.template && (
            <span className="text-red-500">
              {errors.template?.message?.toString() || ""}
            </span>
          )}
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}
export default NewListPage;
