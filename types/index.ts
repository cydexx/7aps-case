export interface Character {
	id: number
	name: string
	image: string
	episode: string[]
}

export interface ApiResponse {
	results: Character[]
}

export interface CharacterStore {
	selectedCharacters: Character[]
	addCharacter: (character: Character) => void
	removeCharacter: (characterId: number) => void
	clearCharacters: () => void
}
