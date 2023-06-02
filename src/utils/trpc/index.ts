import {
  router,
  publicProcedure,
  userProcedure,
  adminProcedure,
} from "./router";

const publicRouter = router({});
const userRouter = router({});
const adminRouter = router({});

const appRouter = router({
  public: publicRouter,
  user: userRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
