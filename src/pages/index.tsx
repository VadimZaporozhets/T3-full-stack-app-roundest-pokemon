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

	const voteMutation = trpc.castVote.useMutation();

	const voteForRoundest = (id: number) => {
		voteMutation.mutate({
			votedFor: id,
			votedAgainst: id === first ? second : first,
		});

		updateIds(getOptionsForVote());
	};

	if (firstPokemon.isLoading || secondPokemon.isLoading) {
		return <div>Loading...</div>;
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
