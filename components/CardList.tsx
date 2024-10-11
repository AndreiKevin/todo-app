import Card from "./Card";

export default function CardList({ pokemonData }) {
	return (
		<div className="flex flex-wrap justify-center gap-4">
			{pokemonData.map((pokemon) => (
				<Card key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
}
