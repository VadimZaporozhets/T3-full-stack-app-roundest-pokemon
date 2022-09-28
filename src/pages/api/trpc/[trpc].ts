import { AppRouter, appRouter } from "@/server/router";
import { inferProcedureOutput } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => ({}),
});

export type inferQueryResponse<
    TRouterKey extends keyof AppRouter
> = inferProcedureOutput<AppRouter[TRouterKey]>;