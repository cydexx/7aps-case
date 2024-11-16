import { Link, Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex-1 items-center justify-center">
				<Text>This screen doesn't exist.</Text>

				<Link href="/(tabs)" className="mt-15 p-15">
					<Text className="text-blue-500">Go to home screen!</Text>
				</Link>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
})
