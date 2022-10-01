import { FC } from "react";
import Image from "next/image";
import { inferQueryResponse } from "@/pages/api/trpc/[trpc]";

const buttonClasses = "inline-flex items-center px-2.5 py-1.5 border border-transparent text-center font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

interface PokemonListingProps {
    pokemon: PokemonFromServer;
}

type PokemonFromServer = inferQueryResponse<"getPokemonById">;

const PokemonCard: FC<PokemonListingProps> = ({ pokemon }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="relative w-64 h-64">
				<Image src={pokemon?.spriteUrl || ""} layout="fill" alt="" />
			</div>
			<div className="text-xl text-center capitalize mt-[-2rem]">{pokemon?.name}</div>
			<div>{pokemon?.votesCount}</div>
		</div>
	);
};

export default PokemonCard;
