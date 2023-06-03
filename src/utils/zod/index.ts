import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  passwordHash: z.string(),
  Role: z.enum(["ADMIN", "USER"]),
});
