import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/server/utils/prisma";

export const t = initTRPC.create();

export const appRouter = t.router({
	getPokemonById: t.procedure
		.input(z.object({
			id: z.number()
		}))
		.query(async ({ input }) => {
			const pokemon = await prisma.pokemon.findFirst({
				where: {
					id: input.id
				}
			});

			return pokemon;
		}),
	castVote: t.procedure
		.input(z.object({
			votedFor: z.number(),
			votedAgainst: z.number(),
		}))
		.mutation(async ({ input }) => {
			const voteInDb = await prisma.vote.create({
				data: {
					votedAgainst: input.votedAgainst,
					votedFor: input.votedFor,
				}
			});

			return {
				success: true,
				vote: voteInDb
			};
		}),
});

// export type definition of API
export type AppRouter = typeof appRouter;
