import { View, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

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
	return (
		<View className="flex-1 flex-row items-center">
			<TextInput
				className="flex-1 min-w-[100px] text-white px-1"
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
				<Ionicons
					name={isOpen ? "chevron-up" : "chevron-down"}
					size={24}
					color="#6B7280"
				/>
			</TouchableOpacity>
		</View>
	)
}

export default SearchInput
