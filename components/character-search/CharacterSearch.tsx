import { useState } from "react"
import { View, TouchableOpacity, Keyboard } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { useCharacterStore } from "../../utils/useCharacterStore"
import SearchInput from "./SearchInput"
import SelectedCharacter from "./SelectedCharacter"
import SearchResults from "./SearchResults"
import { highlightText as highlightTextUtil } from "../../utils/text"
import { fetchCharacters } from "../../utils/api"
import { Character } from "@/types"

function CharacterSearch() {
	const [query, setQuery] = useState<string>("")
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { selectedCharacters, addCharacter, removeCharacter } =
		useCharacterStore() as {
			selectedCharacters: Character[]
			addCharacter: (character: Character) => void
			removeCharacter: (characterId: number) => void
		}
	const [debouncedQuery] = useDebounce(query, 300)

	const { data, isLoading, error } = useQuery({
		queryKey: ["characters", debouncedQuery],
		queryFn: () => fetchCharacters(debouncedQuery),
		enabled: debouncedQuery.length > 0,
	})

	const handleCharacterSelect = (character: Character) => {
		const isAlreadySelected = selectedCharacters.some(
			(char: Character) => char.id === character.id
		)
		if (isAlreadySelected) {
			removeCharacter(character.id)
		} else {
			addCharacter(character)
		}
	}

	const handleInputChange = (text: string) => {
		setQuery(text)
		if (!isOpen && text.length > 0) {
			setIsOpen(true)
		}
	}

	const handlePressOutside = () => {
		if (isOpen) {
			setIsOpen(false)
			setQuery("")
			Keyboard.dismiss()
		}
	}

	return (
		<View className="flex-1 p-4 bg-black-700">
			<TouchableOpacity
				activeOpacity={1}
				onPress={handlePressOutside}
				className="flex-1"
			>
				<View className="relative">
					<View className="flex-row items-center border-2 border-black-500 bg-black-800 focus-within:border-black-400 rounded-xl p-3 shadow-sm transition-colors duration-200 border-zinc-800">
						<View className="flex-1 flex-row flex-wrap gap-2">
							{selectedCharacters.map((char: Character) => (
								<SelectedCharacter
									key={char.id}
									character={char}
									onRemove={removeCharacter}
								/>
							))}
							<SearchInput
								query={query}
								onChangeText={handleInputChange}
								isOpen={isOpen}
								onToggleOpen={() => setIsOpen(!isOpen)}
								onFocus={() => setIsOpen(true)}
							/>
						</View>
					</View>

					{isOpen && (
						<SearchResults
							isLoading={isLoading}
							error={error}
							data={data}
							selectedCharacters={selectedCharacters}
							onSelect={handleCharacterSelect}
							query={query}
							highlightText={highlightTextUtil}
						/>
					)}
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default CharacterSearch
