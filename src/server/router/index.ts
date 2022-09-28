import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";
import { prisma } from "@/server/utils/prisma";

export const t = initTRPC.create();

export const appRouter = t.router({
	getPokemonById: t.procedure
		.input(z.object({
			id: z.number()
		}))
		.query(async ({ input }) => {
			const api = new PokemonClient();

			const pokemon = await api.getPokemonById(input.id);

			return {
				name: pokemon.name,
				sprites: pokemon.sprites,
			};
		}),
	castVote: t.procedure
		.input(z.object({
			votedFor: z.number(),
			votedAgainst: z.number(),
		}))
		.mutation(async ({ input }) => {
			const voteInDb = await prisma.vote.create({
				data: {
					...input
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
