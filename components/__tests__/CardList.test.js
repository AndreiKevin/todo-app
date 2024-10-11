import { render, screen } from "@testing-library/react";
import CardList from "../CardList";

const mockPokemonData = [
	{
		id: 1,
		name: "bulbasaur",
		abilities: [
			{ ability: { name: "overgrow" } },
			{ ability: { name: "chlorophyll" } },
		],
		sprites: {
			front_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
		},
	},
	{
		id: 2,
		name: "ivysaur",
		abilities: [
			{ ability: { name: "overgrow" } },
			{ ability: { name: "chlorophyll" } },
		],
		sprites: {
			front_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
		},
	},
];

describe("CardList Component", () => {
	it("renders a list of Pokémon cards", () => {
		render(<CardList pokemonData={mockPokemonData} />);

		// Check if Pokémon names are in the document
		expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
		expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();

		// Check if abilities are listed. 2 of these should show up because both Pokémon have the same abilities
		expect(screen.getAllByText(/overgrow, chlorophyll/i)).toHaveLength(2);
	});
});
