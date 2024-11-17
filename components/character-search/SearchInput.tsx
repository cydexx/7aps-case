import { View, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated"

interface SearchInputProps {
	query: string
	onChangeText: (text: string) => void
	isOpen: boolean
	onToggleOpen: () => void
	onFocus: () => void
}

function SearchInput({
	query,
	onChangeText,
	isOpen,
	onToggleOpen,
	onFocus,
}: SearchInputProps) {
	const iconStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotate: withSpring(isOpen ? "180deg" : "0deg", {
						damping: 50,
						stiffness: 300,
					}),
				},
			],
		}
	})

	return (
		<View className="flex-1 min-w-[120px] flex-row items-center">
			<TextInput
				className="flex-1 text-white px-1"
				placeholder="Search characters..."
				placeholderTextColor="#6B7280"
				value={query}
				onChangeText={onChangeText}
				onFocus={onFocus}
			/>
			<TouchableOpacity
				onPress={onToggleOpen}
				className="p-2 rounded-lg hover:bg-black-700 active:bg-black-600 transition-colors"
			>
				<Animated.View style={iconStyle}>
					<Ionicons name="chevron-down" size={24} color="#6B7280" />
				</Animated.View>
			</TouchableOpacity>
		</View>
	)
}

export default SearchInput
