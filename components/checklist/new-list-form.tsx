"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createListAction } from "@/utils/actions";

const newChecklistSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(191),
  description: z.string().optional(),
  private: z.boolean().optional(),
});

type NewChecklistFormData = z.infer<typeof newChecklistSchema>;

export default function NewListForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewChecklistFormData>({
    resolver: zodResolver(newChecklistSchema),
  });

  const onSubmit = async (data: NewChecklistFormData) => {
    // call the server action
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("private", data.private ? "true" : "false");

    //   // call the server action
    await createListAction(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-1/2 flex flex-col space-y-4"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title?.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="private"
            className="block text-sm font-medium text-gray-700"
          >
            Private
          </label>
          <input type="checkbox" {...register("private")} className="mt-1" />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create
      </button>
    </form>
  );
}
