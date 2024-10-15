"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { auth } from "@/auth";
import {
  createChecklist,
  updateCategory,
  updateChecklist,
} from "@/lib/checklist";
// import { createPoll } from "@/app/lib/polls";
// import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";
import { profileSchema, validateWithZodSchema } from "./schemas";

export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const session = await auth();
    if (!session) throw new Error("Please login to create a profile");

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await prisma.user.create({
      data: {
        email: session?.user?.email || "",
        name: `${validatedFields.firstName} ${validatedFields.lastName}`,
        // ...validatedFields,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }
  redirect("/");
};

export const fetchProfile = async (forward = true) => {
  const session = await auth();

  const profile = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });
  if (forward && !profile) return redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  const session = await auth();
  if (!session) return redirect("/");
  try {
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await prisma.user.update({
      where: {
        email: session.user?.email || "",
      },
      data: validatedFields,
    });
    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return fromErrorToFormState(error);
  }
};

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

  revalidatePath("/checklists");
  return { success: true };
}

export async function createListAction(formData: FormData) {
  // fake delay for testing
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const formFields = Object.fromEntries(formData);
  // update
  await createChecklist({
    title: formFields.name.toString(),
    description: formFields.description.toString(),
  });
  // console.log(result);

  revalidatePath("/checklists");
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

function fromErrorToFormState(error: unknown) {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      status: "ERROR" as const,
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
    // if another error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      status: "ERROR" as const,
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
    // if not an error instance but something else crashed
    // return generic error message
  } else {
    return {
      status: "ERROR" as const,
      message: "An unknown error occurred",
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
}

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
