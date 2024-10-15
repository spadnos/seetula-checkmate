import * as z from "zod";
import { ZodSchema } from "zod";

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);

    throw new Error(errors.join(", "));
  }
  return result.data;
}

// utility functions
export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z.string().min(2, "first name must be at least 2 characters"),
  lastName: z.string().min(2, "last name must be at least 2 characters"),
  username: z.string().min(2, "username must be at least 2 characters"),
});

// Define zod schemas for each form

// Define the schema for checklists
export const checklistSchema = z.object({
  title: z.string().min(5, { message: "Must be at least 5 characters" }),
  description: z.string().optional(),
  private: z.boolean().default(true),
});
export type ChecklistSchemaType = z.infer<typeof checklistSchema>;

export const itemSchema = z.object({
  title: z.string().min(1, "Name must be at least 1 character").max(191),
  quantity: z.coerce.number().optional().default(1),
  isPrivate: z.coerce.boolean().default(true),
  isComplete: z.coerce.boolean().default(false),
  categoryId: z.string().optional(),
});
export type ItemSchemaType = z.infer<typeof itemSchema>;
