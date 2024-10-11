export default function Card({ pokemon }) {
	const avatarUrl = pokemon.sprites.front_default; // Pokémon avatar image
	const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalize name
	const abilities = pokemon.abilities.map((a) => a.ability.name).join(", "); // Get abilities

	return (
		<div className="bg-white shadow-lg rounded-lg p-4 w-60">
			<img src={avatarUrl} alt={name} className="mx-auto mb-4" />
			<h2 className="text-xl font-semibold text-center mb-2">{name}</h2>
			<p className="text-gray-600 text-center mb-4">Abilities: {abilities}</p>
			<button className="block w-full text-center bg-blue-500 text-white py-2 rounded-md">
				Learn more
			</button>
		</div>
	);
}
