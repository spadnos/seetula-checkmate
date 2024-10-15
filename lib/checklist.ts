"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { z } from "zod";
import { Id } from "@/lib/types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import {
  checklistSchema,
  transformZodErrors,
  validateWithZodSchema,
} from "@/utils/schemas";

export type ChecklistWithRelations = Prisma.ChecklistGetPayload<{
  include: { items: true; categories: true };
}>;

// function authWrapper(f: Function): Function {
//   return async function (...args: any[]) {
//     const session = await auth();

//     if (!session?.user) {
//       return [];
//     }
//     console.log(session);
//     return f(args);
//   };
// }

// export const testLog = authWrapper(() => console.log("hello"));
export async function createUser() {
  const session = await auth();
  if (!session) throw new Error("Please login to create a profile");

  await prisma.user.create({
    data: {
      email: session?.user?.email || "",
      // ...validatedFields,
    },
  });
}

export async function fetchChecklists(
  options: { includeItems?: boolean; includeCategories?: boolean } = {}
) {
  const includeItems = options?.includeItems || true;
  const includeCategories = options?.includeCategories || true;
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return [];
  }
  // console.log(session);

  try {
    const records = await prisma.checklist.findMany({
      where: {
        user: {
          is: {
            email: session.user.email,
          },
        },
      },
      include: { items: includeItems, categories: includeCategories },
    });
    // console.log(records);
    return records;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCategories(listId: string) {
  const session = await auth();

  if (!session?.user) {
    return [];
  }

  try {
    const result = await prisma.checklist.findUnique({
      where: {
        id: listId,
      },
      include: {
        categories: true,
      },
    });
    // console.log(result.map((item) => item.category));
    // console.log(result);
    return result?.categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchChecklist(listId: string) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  try {
    const result = await prisma.checklist.findUnique({
      where: {
        id: listId,
      },
      include: {
        items: { include: { category: true } },
        categories: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getChecklistItems(listId: string) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const items = await prisma.item.findMany({
    where: {
      checklistId: listId,
    },
  });

  return items;
}

export async function createListAction(formData: FormData) {
  const session = await auth();

  if (!session?.user || !session.user?.email) {
    return { errors: ["Please login to create a list"], checklist: null };
  }

  const rawData = Object.fromEntries(formData);
  const data = {
    title: rawData.title,
    description: rawData.description,
    private: rawData.private === "true",
  };
  let validatedFields;
  try {
    validatedFields = validateWithZodSchema(checklistSchema, data);
    // console.log("validatedFields", validatedFields);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { errors: transformZodErrors(error), checklist: null };
    }
    console.log(error);
    return { errors: JSON.stringify(error), checklist: null };
  }

  try {
    const checklist = await prisma.checklist.create({
      data: {
        ...validatedFields,
        user: { connect: { email: session.user?.email } },
      },
    });

    revalidatePath("/checklists");
    // redirect("/checklists");
    return { errors: null, checklist };
  } catch (error) {
    console.log(error);
    return { errors: JSON.stringify(error), error, checklist: null };
  }
}

export async function createChecklist(data: {
  title: string;
  description: string | undefined;
  private?: boolean;
}) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return;
  }

  try {
    const checklist = await prisma.checklist.create({
      data: { ...data, user: { connect: { email: session.user?.email } } },
    });
    return checklist;
  } catch (error) {
    console.log(error);
  }
}

export async function updateChecklist(id: Id, data: object) {
  // console.log("updating checklist", data);
  if (!id) {
    return;
  }
  // const session = await auth();
  const record = prisma.checklist.update({
    where: { id },
    data,
  });

  return record;
}

export async function deleteList(id: string | undefined) {
  // I tried using cascading deletes, but couldn't get it to work. So
  // still doing the old way of using 2 db accesses.
  if (!id) {
    return;
  }

  try {
    await prisma.item.deleteMany({
      where: { checklistId: id },
    });
    await prisma.checklist.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
}

const itemSchema = z.object({
  title: z.string().min(1, "Name must be at least 1 character").max(191),
  quantity: z.coerce.number().optional(),
  private: z.coerce.boolean().optional(),
  completed: z.coerce.boolean().optional(),
});

export async function updateListItem(
  id: Id,
  data: {
    title?: string;
    quantity?: number;
    private?: boolean;
    completed?: boolean;
    category?: string;
  }
) {
  const validatedData = itemSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      data: null,
      message: validatedData.error?.errors[0].message,
    };
  }
  console.log("update item", data);
  console.log(validatedData);
  const newData: {
    title: string;
    quantity?: number;
    private?: boolean;
    completed?: boolean;
    category?: { connect: { id: string } };
  } = { ...validatedData.data };

  if (data.category) {
    // eslint-disable-next-line
    newData.category = { connect: { id: data.category } };
  }
  if (!validatedData.success) {
    console.log("oops", data);
  }

  try {
    const item = await prisma.item.update({
      where: { id },
      data: newData,
    });
    return { success: true, data: item };
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/checklists");
}

export async function toggleItemComplete(id: Id) {
  // console.log("updateListItem", item);
  try {
    const item = await prisma.item.findUnique({ where: { id } });
    if (item) {
      await prisma.item.update({
        where: { id: id },
        data: {
          completed: !item.completed,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  revalidatePath("/checklists");
}

export async function resetList(id: Id) {
  if (!id) {
    return;
  }

  await prisma.item.updateMany({
    where: { checklistId: id },
    data: {
      completed: false,
    },
  });

  revalidatePath("/checklists");
}

// type addItemType = {
//   title: string;
//   checklist: { connect: { id: string } };
//   completed: boolean;
//   private: boolean;
//   category?: { connect: { id: string } };
//   user: { connect: { email: string } };
// };

export async function addItemToChecklist(
  listId: string,
  categoryId: string,
  title: string
) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return;
  }

  // TODO: Add zod for validation
  // console.log(listId, title, category);
  // return;
  const data: Prisma.ItemCreateInput = {
    title: title,
    user: { connect: { email: session.user?.email } },
    checklist: { connect: { id: listId } },
    completed: false,
    private: true,
    category: { connect: undefined },
  };
  if (categoryId) {
    data.category = { connect: { id: categoryId } };
  }
  const record = prisma.item.create({
    data,
  });

  revalidatePath("/checklists");
  return record;
}

export async function deleteItem(id: string) {
  try {
    await prisma.item.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/checklists");
}

export async function fetchItems() {
  const items = await prisma.item.findMany();

  return items;
}

// Categories
export async function createCategory(title: string, checklistId: string) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return await prisma.category.upsert({
    where: { title: title },
    update: {},
    create: {
      title: title,
      checklist: { connect: { id: checklistId } },
    },
  });
}

export async function updateCategory(id: Id | undefined, data: object) {
  if (!id) return;

  try {
    return await prisma.category.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addCategoryToChecklist(
  checklistId: string,
  categoryTitle: string
) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const checklist = await prisma.checklist.update({
    where: { id: checklistId },
    data: {
      categories: {
        connectOrCreate: {
          where: { title: categoryTitle },
          create: { title: categoryTitle },
        },
      },
    },
    include: { categories: true, items: true },
  });
  // console.log(checklist);
  if (!checklist) {
    console.log("error: Category not found");
    return;
  }
  return checklist.categories.find(
    (cat) => cat.title === categoryTitle && cat.checklistId === checklistId
  );
}

export async function removeCategoryFromChecklist(
  checklistId: string,
  categoryId: string
) {
  const result = await prisma.checklist.update({
    where: { id: checklistId },
    data: {
      categories: {
        delete: [{ id: categoryId }],
      },
    },
    include: { categories: true, items: true },
  });

  // console.log(result);
  return result;
}
