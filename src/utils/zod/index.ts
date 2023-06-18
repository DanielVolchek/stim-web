import { ZodRawShape, z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.enum(["ADMIN", "USER"]),
});

const basePass = z.object({
  status: z.literal("success"),
  message: z.string(),
});

const baseFail = z.object({
  status: z.literal("failed"),
  error: z.string(),
});

// a function that takes two schemas, passed and failed, and extends them then returns the merge

export const buildRouteSchema = <T extends ZodRawShape, K extends ZodRawShape>({
  pass,
  fail,
}: {
  pass: z.ZodObject<T>;
  fail: z.ZodObject<K>;
}) => {
  const extendedPass = pass.merge(basePass);
  const extendedFail = fail.merge(baseFail);

  const value = z.discriminatedUnion("status", [extendedPass, extendedFail]);
  return value;
};

const newSchema = buildRouteSchema({
  pass: z.object({ username: z.string() }),
  fail: z.object({ statusCode: z.number() }),
});

const tester = { status: "success", username: "daniel" };

const safe = newSchema.parse(tester);

if (safe.status === "success") {
}
