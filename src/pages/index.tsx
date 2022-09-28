import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";

const Home: NextPage = () => {
	const [ids, updateIds] = useState(() => getOptionsForVote());

	const [first, second] = ids;

	const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
	const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

	if (firstPokemon.isLoading || secondPokemon.isLoading) {
		return <div>Loading...</div>;
	}

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
				<div className="flex flex-col">
					<div className="relative w-64 h-64">
						<Image src={firstPokemon?.data?.sprites?.front_default || ""} layout="fill" alt="" />
					</div>
					<div className="text-xl text-center capitalize mt-[-2rem]">{firstPokemon?.data?.name}</div>
				</div>
				<div className="p-8">VS</div>
				<div className="flex flex-col">
					<div className="relative w-64 h-64">
						<Image src={secondPokemon?.data?.sprites?.front_default || ""} layout="fill" alt="" />
					</div>
					<div className="text-xl text-center capitalize mt-[-2rem]">{secondPokemon?.data?.name}</div>
				</div>
				<div className="p-2"></div>
			</div>
		</div>
	);
};

export default Home;
