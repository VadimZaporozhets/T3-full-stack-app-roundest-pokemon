import { useState } from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import PokemonListing from "@/components/index/PokemonListing";

const Home: NextPage = () => {
	const [ids, updateIds] = useState(() => getOptionsForVote());

	const [first, second] = ids;

	const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
	const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

	if (firstPokemon.isLoading || secondPokemon.isLoading) {
		return <div>Loading...</div>;
	}

	const voteForRoundest = (id: number) => {
		updateIds(getOptionsForVote());
	};

	if (firstPokemon.isError || secondPokemon.isError) {
		return <div>Error</div>;
	}

	if (!firstPokemon.data || !secondPokemon.data) {
		return <div>Missing data</div>;
	}

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center">
			<div className="text-2xl text-center">Which Pokemon is Rounder?</div>
			<div className="p-2"></div>
			<div className="border rounded p-8 justify-between items-center max-w-2xl flex">
				{!firstPokemon.isLoading && firstPokemon.data && !secondPokemon.isLoading && secondPokemon.data && (
					<>
						<PokemonListing pokemon={firstPokemon.data} voteForRoundest={() => { voteForRoundest(first); }} /> 
						<div className="p-8">VS</div>
						<PokemonListing pokemon={secondPokemon.data} voteForRoundest={() => { voteForRoundest(second); }} /> 
					</>
				)}
				<div className="p-2"></div>
			</div>
		</div>
	);
};

export default Home;
