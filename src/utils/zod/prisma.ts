import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.enum(["ADMIN", "USER"]),
});
