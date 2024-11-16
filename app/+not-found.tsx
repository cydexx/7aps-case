import { Link, Stack } from "expo-router"
import { Text, View } from "react-native"

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
