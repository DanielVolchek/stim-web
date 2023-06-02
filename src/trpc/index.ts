import { router } from "./router";

import publicRouter from "./public";
import userRouter from "./user";
import adminRouter from "./admin";

const appRouter = router({
  public: publicRouter,
  user: userRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
