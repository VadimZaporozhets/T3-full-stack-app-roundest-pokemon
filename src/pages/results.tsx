import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import PokemonCard from "@/components/results/PokemonCard";

const Home: NextPage = () => {
	const roundestPokemons = trpc.getMostRoundestPokemons.useQuery();

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center">
			<div className="text-2xl text-center">Roundest Pokemons by votes</div>
			<div className="p-2"></div>
			<div className="border rounded p-8 justify-between items-center max-w-2xl flex flex-wrap">
				{roundestPokemons.data?.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
			<Link href="/">
				<a className="mx-auto block mt-8 text-center hover:underline">Back to voting</a>
			</Link>
		</div>
	);
};

export default Home;
