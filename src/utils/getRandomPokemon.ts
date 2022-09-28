
const MAX_DEX_ID = 493;

export const getRandomPokemon = (notThisOne?: number): number => {
	const pokedexNumber  = Math.floor(Math.random() * MAX_DEX_ID) + 1;

	if (pokedexNumber === notThisOne) {
		return getRandomPokemon(notThisOne);
	}

	return pokedexNumber;
};

export const getOptionsForVote = () => {
	const first = getRandomPokemon();
	const second = getRandomPokemon(first);

	return [first, second];
};