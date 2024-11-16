import { create } from "zustand"
import { Character, CharacterStore } from "../types"

export const useCharacterStore = create<CharacterStore>((set) => ({
	selectedCharacters: [],
	addCharacter: (character: Character) =>
		set((state) => ({
			selectedCharacters: [...state.selectedCharacters, character],
		})),
	removeCharacter: (characterId: number) =>
		set((state) => ({
			selectedCharacters: state.selectedCharacters.filter(
				(c) => c.id !== characterId
			),
		})),
	clearCharacters: () => set({ selectedCharacters: [] }),
}))
