import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { Character } from "@/types"
import SearchResultsSkeletonItem from "./Skeleton"

interface SearchResultsProps {
	isLoading: boolean
	error: Error | null
	data: { results: Character[] } | undefined
	selectedCharacters: Character[]
	onSelect: (character: Character) => void
	query: string
	highlightText: (text: string, highlight: string) => React.ReactNode
}

interface CharacterItemProps {
	character: Character
	isSelected: boolean
	onSelect: (character: Character) => void
	query: string
	highlightText: (text: string, highlight: string) => React.ReactNode
}

function SearchResults({
	isLoading,
	error,
	data,
	selectedCharacters,
	onSelect,
	query,
	highlightText,
}: SearchResultsProps) {
	return (
		<Animated.View
			entering={FadeIn.duration(200)
				.springify()
				.withInitialValues({
					transform: [{ translateY: 20 }],
				})}
			exiting={FadeOut.duration(150).withInitialValues({
				transform: [{ translateY: 0 }],
			})}
			className="absolute top-full left-0 right-0 mt-2 z-50"
			style={{
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
			}}
		>
			<View className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
				<ScrollView
					className="max-h-80"
					keyboardShouldPersistTaps="handled"
				>
					{isLoading && (
						<>
							<SearchResultsSkeletonItem />
							<SearchResultsSkeletonItem />
							<SearchResultsSkeletonItem />
						</>
					)}
					{error && (
						<View className="p-4 bg-red-500/10 border-l-4 border-red-500">
							<Text className="text-red-500 font-medium">
								Character cannot be found.
							</Text>
						</View>
					)}
					{data?.results?.map((character) => (
						<CharacterItem
							key={character.id}
							character={character}
							isSelected={selectedCharacters.some(
								(c: Character) => c.id === character.id
							)}
							onSelect={onSelect}
							query={query}
							highlightText={highlightText}
						/>
					))}
				</ScrollView>
			</View>
		</Animated.View>
	)
}

function CharacterItem({
	character,
	isSelected,
	onSelect,
	query,
	highlightText,
}: CharacterItemProps) {
	return (
		<TouchableOpacity
			className="flex-row items-center p-3 border-b border-zinc-800 hover:bg-black-700 active:bg-black-600 transition-colors"
			onPress={() => onSelect(character)}
		>
			<View className="w-6 h-6 mr-3 border-2 border-zinc-500 rounded-md items-center justify-center bg-black-500 border-black-400">
				{isSelected && (
					<Ionicons name="checkmark" size={16} color="#fff" />
				)}
			</View>
			<Image
				source={{ uri: character.image }}
				className="w-12 h-12 rounded-lg mr-3 border-2 border-black-500"
			/>
			<View>
				<Text className="font-medium text-base text-white">
					{highlightText(character.name, query)}
				</Text>
				<Text className="text-gray-400 text-sm mt-0.5">
					{character.episode.length} Episodes
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default SearchResults
