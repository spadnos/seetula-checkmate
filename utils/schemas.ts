import * as z from "zod";
// import { ZodSchema } from "zod";

export const profileSchema = z.object({
  email: z.string().email("Please provide a valid email"),
});
