import { create } from "zustand"

export const useCharacterStore = create((set) => ({
	selectedCharacters: [],
	addCharacter: (character) =>
		set((state) => ({
			selectedCharacters: [...state.selectedCharacters, character],
		})),
	removeCharacter: (characterId) =>
		set((state) => ({
			selectedCharacters: state.selectedCharacters.filter(
				(c) => c.id !== characterId
			),
		})),
	clearCharacters: () => set({ selectedCharacters: [] }),
}))
