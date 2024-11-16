import { useState } from "react"
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Keyboard,
} from "react-native"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useCharacterStore } from "../store/useCharacterStore"
import { Ionicons } from "@expo/vector-icons"
import { useDebounce } from "use-debounce"
import Animated, {
	FadeIn,
	FadeOut,
	SlideInDown,
	SlideOutDown,
} from "react-native-reanimated"

function CharacterSearch() {
	const [query, setQuery] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const { selectedCharacters, addCharacter, removeCharacter } =
		useCharacterStore()

	const [debouncedQuery] = useDebounce(query, 300)
	const { data, isLoading, error } = useQuery({
		queryKey: ["characters", debouncedQuery],
		queryFn: async () => {
			if (!debouncedQuery) return { results: [] }
			const { data } = await axios.get(
				`https://rickandmortyapi.com/api/character/?name=${debouncedQuery}`
			)
			return data
		},
		enabled: debouncedQuery.length > 0,
	})

	const handleCharacterSelect = (character) => {
		const isAlreadySelected = selectedCharacters.some(
			(char) => char.id === character.id
		)
		if (isAlreadySelected) {
			removeCharacter(character.id)
		} else {
			addCharacter(character)
		}
	}

	const handleInputChange = (text) => {
		setQuery(text)
		if (!isOpen && text.length > 0) {
			setIsOpen(true)
		}
	}

	const highlightText = (text, highlight) => {
		if (!highlight.trim()) return text
		const parts = text.split(new RegExp(`(${highlight})`, "gi"))
		return parts.map((part, i) =>
			part.toLowerCase() === highlight.toLowerCase() ? (
				<Text key={i} className="font-bold">
					{part}
				</Text>
			) : (
				part
			)
		)
	}

	// Add click outside handler for mobile
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
					<View
						className="
						flex-row 
						items-center 
						border-2
						border-black-500 bg-black-800 focus-within:border-black-400 
						rounded-xl 
						p-3
						shadow-sm
						transition-colors
						duration-200
						border-zinc-800
					"
					>
						<View className="flex-1 flex-row flex-wrap gap-2 ">
							{selectedCharacters.map((char) => (
								<Animated.View
									entering={FadeIn}
									exiting={FadeOut}
									key={char.id}
									className={`
										bg-black-700 border-black-500 
										rounded-lg 
										px-3 
										py-1.5 
										flex-row 
										items-center 
										border
										shadow-sm
                                    border-zinc-700
									`}
								>
									<Text
										className={`
										mr-2 
										font-medium
										text-white
									`}
									>
										{char.name}
									</Text>
									<TouchableOpacity
										onPress={() => removeCharacter(char.id)}
										className={`
											rounded-full 
											p-1 
											hover:bg-black-600
											active:bg-black-500
											transition-colors
                                            
										`}
									>
										<Text className="text-gray-400">×</Text>
									</TouchableOpacity>
								</Animated.View>
							))}
							<TextInput
								className={`
									flex-1 
									min-w-[100px] 
									text-white
									px-1
                                    
								`}
								placeholder="Search characters..."
								placeholderTextColor="#6B7280"
								value={query}
								onChangeText={handleInputChange}
								onFocus={() => setIsOpen(true)}
							/>
						</View>
						<TouchableOpacity
							onPress={() => setIsOpen(!isOpen)}
							className={`
								p-2 
								rounded-lg
								hover:bg-black-700 active:bg-black-600
								transition-colors
							`}
						>
							<Ionicons
								name={isOpen ? "chevron-up" : "chevron-down"}
								size={24}
								color="#6B7280"
							/>
						</TouchableOpacity>
					</View>

					{isOpen && (
						<Animated.View
							entering={SlideInDown.springify()}
							exiting={SlideOutDown}
							className="absolute top-full left-0 right-0 mt-2 z-50"
							style={{
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 2,
								},
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
										<View className="p-4 flex items-center justify-center">
											<ActivityIndicator
												color="#fff"
												size="large"
											/>
										</View>
									)}
									{error && (
										<View className="p-4 bg-red-500/10 border-l-4 border-red-500">
											<Text className="text-red-500 font-medium">
												Error loading characters
											</Text>
										</View>
									)}
									{data?.results?.map((character) => (
										<TouchableOpacity
											key={character.id}
											className={`
												flex-row 
												items-center 
												p-3
												border-b
												border-zinc-800 hover:bg-black-700 active:bg-black-600
												transition-colors

											`}
											onPress={() =>
												handleCharacterSelect(character)
											}
										>
											<View
												className={`
												w-6 
												h-6 
												mr-3 
												border-2
												border-zinc-500 
												rounded-md
												items-center 
												justify-center
												bg-black-500 border-black-400
											`}
											>
												{selectedCharacters.some(
													(c) => c.id === character.id
												) && (
													<Ionicons
														name="checkmark"
														size={16}
														color="#fff"
													/>
												)}
											</View>
											<Image
												source={{
													uri: character.image,
												}}
												className="w-12 h-12 rounded-lg mr-3 border-2 border-black-500"
											/>
											<View>
												<Text
													className={`
													font-medium
													text-base
													text-white
												`}
												>
													{highlightText(
														character.name,
														query
													)}
												</Text>
												<Text className="text-gray-400 text-sm mt-0.5">
													{character.episode.length}{" "}
													Episodes
												</Text>
											</View>
										</TouchableOpacity>
									))}
								</ScrollView>
							</View>
						</Animated.View>
					)}
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default CharacterSearch
