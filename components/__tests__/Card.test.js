import { render, screen } from "@testing-library/react";
import Card from "../Card";

const mockPokemon = {
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
};

describe("Card Component", () => {
	it("renders the Pokémon card", () => {
		render(<Card pokemon={mockPokemon} />);

		// Check if the name is rendered
		expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();

		// Check if abilities are rendered
		expect(screen.getByText(/overgrow, chlorophyll/i)).toBeInTheDocument();

		// Check if the image is rendered
		const image = screen.getByAltText(/bulbasaur/i);
		expect(image).toHaveAttribute("src", mockPokemon.sprites.front_default);
	});
});
