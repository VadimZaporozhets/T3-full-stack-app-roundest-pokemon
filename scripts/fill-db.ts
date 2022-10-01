import { error } from "console";
import { PokemonClient } from "pokenode-ts";
import { prisma } from "../src/server/utils/prisma";

const doBackfill = async () => {
	try {
		const pokemonApi = new PokemonClient();

		const allPokemon = await pokemonApi.listPokemons(0, 493);

		const formattedPokemon = allPokemon.results.map((pokemon, index) => ({
			id: index + 1,
			name: pokemon.name,
			spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
			votesCount: 0,
		}));

		await prisma.pokemon.createMany({
			data: formattedPokemon
		});
	} catch (error: any) {
		console.table(error);
	}
};

doBackfill();