import { Text, TouchableOpacity } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { Character } from "@/types"

function SelectedCharacter({
	character,
	onRemove,
}: {
	character: Character
	onRemove: (characterId: number) => void
}) {
	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			key={character.id}
			className="bg-black-700 border-black-500 rounded-lg px-3 py-2 flex-row items-center border shadow-sm border-zinc-700"
		>
			<Text className="mr-2 font-medium text-white">
				{character.name}
			</Text>
			<TouchableOpacity
				onPress={() => onRemove(character.id)}
				className="rounded-full p-1 hover:bg-black-600 active:bg-black-500 transition-colors"
			>
				<Text className="text-gray-400">×</Text>
			</TouchableOpacity>
		</Animated.View>
	)
}

export default SelectedCharacter
