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

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z.string().min(2, "first name must be at least 2 characters"),
  lastName: z.string().min(2, "last name must be at least 2 characters"),
  username: z.string().min(2, "username must be at least 2 characters"),
});

export const checklistSchema = z.object({
  title: z.string().min(1, "Name must be at least 1 character").max(191),
  description: z.string().optional(),
  private: z.boolean().default(false),
});
export type ChecklistSchema = z.infer<typeof checklistSchema>;
