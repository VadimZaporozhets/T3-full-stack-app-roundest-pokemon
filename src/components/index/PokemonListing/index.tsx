import { FC } from "react";
import Image from "next/image";
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";

const buttonClasses = "inline-flex items-center px-2.5 py-1.5 border border-transparent text-center font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

interface PokemonListingProps {
    pokemon: PokemonFromServer;
    voteForRoundest: () => void;
}

type PokemonFromServer = inferQueryResponse<"getPokemonById">;

const PokemonListing: FC<PokemonListingProps> = ({ pokemon, voteForRoundest }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="relative w-64 h-64">
				<Image src={pokemon?.sprites?.front_default || ""} layout="fill" alt="" />
			</div>
			<div className="text-xl text-center capitalize mt-[-2rem]">{pokemon?.name}</div>
			<button className={buttonClasses} onClick={voteForRoundest}>Rounder</button>
		</div>
	);
};

export default PokemonListing;
