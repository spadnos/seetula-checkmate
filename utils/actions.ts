"use server";

import {
  createChecklist,
  updateCategory,
  updateChecklist,
} from "@/lib/checklist";
// import { createPoll } from "@/app/lib/polls";
// import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { z } from "zod";

const createListSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character").max(191),
  description: z.string().optional(),
});

export async function updateListAction(
  listId: string | undefined,
  formData: FormData
) {
  if (!listId) {
    return { success: false, message: "List is required." };
  }
  const formFields = Object.fromEntries(formData);
  const validatedData = createListSchema.safeParse(formFields);
  if (!validatedData.success) {
    return { success: false, message: validatedData.error?.errors[0].message };
  }

  // update
  await updateChecklist(listId, {
    title: formFields.name.toString(),
    description: formFields.description.toString(),
  });

  revalidatePath("/");
  return { success: true, message: "List updated" };
}

export async function createListAction(formData: FormData) {
  // fake delay for testing
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const formFields = Object.fromEntries(formData);
  // update
  const result = await createChecklist({
    title: formFields.name.toString(),
    description: formFields.description.toString(),
  });
  console.log(result);

  revalidatePath("/");
  return { success: true, message: "List updated" };
}

// TODO: Refactor Polls stuff into it's own file

export type FormState = {
  status: "UNSET" | "SUCCESS" | "ERROR";
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

// const createPollSchema = z.object({
//   title: z.string().min(2).max(191),
//   description: z.string().optional(),
// });

// function fromErrorToFormState(error: unknown) {
//   // if validation error with Zod, return first error message
//   if (error instanceof ZodError) {
//     return {
//       status: "ERROR" as const,
//       message: "",
//       fieldErrors: error.flatten().fieldErrors,
//       timestamp: Date.now(),
//     };
//     // if another error instance, return error message
//     // e.g. database error
//   } else if (error instanceof Error) {
//     return {
//       status: "ERROR" as const,
//       message: error.message,
//       fieldErrors: {},
//       timestamp: Date.now(),
//     };
//     // if not an error instance but something else crashed
//     // return generic error message
//   } else {
//     return {
//       status: "ERROR" as const,
//       message: "An unknown error occurred",
//       fieldErrors: {},
//       timestamp: Date.now(),
//     };
//   }
// }

export async function updateCategoryAction(formData: FormData) {
  await updateCategory(formData.get("id")?.toString(), {
    title: formData.get("title")?.toString(),
  });
}

// function toFormState(status: FormState["status"], message: string): FormState {
//   return {
//     status,
//     message,
//     fieldErrors: {},
//     timestamp: Date.now(),
//   };
// }

// export async function createNewPoll(formState: FormState, formData: FormData) {
//   const formFields = Object.fromEntries(formData);

//   try {
//     const validatedData = createPollSchema.parse(formFields);
//     await createPoll(validatedData.title);
//   } catch (error) {
//     return fromErrorToFormState(error);
//   }

//   // if everything went well send the user back to the polls page.
//   if (true) {
//     revalidatePath("/polls");
//     redirect("/polls");
//   }

//   return toFormState("SUCCESS", "Message created");
// }
