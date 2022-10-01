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

			await prisma.pokemon.update({
				where: {
					id: input.votedFor
				},
				data: {
					votesCount: {
						increment: 1
					}
				}
			});

			return {
				success: true,
				vote: voteInDb
			};
		}),
	getMostRoundestPokemons: t.procedure
		.query(async () => {
			const pokemons = await prisma.pokemon.findMany({
				take: 5,
				orderBy: {
					votesCount: "desc"
				}
			});

			return pokemons;
		})
});

// export type definition of API
export type AppRouter = typeof appRouter;
