import React from "react"
import Animated, {
	useAnimatedStyle,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated"
import { View } from "react-native"

export default function SearchResultsSkeletonItem() {
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: withRepeat(
			withSequence(
				withTiming(0.5, { duration: 1000 }),
				withTiming(1, { duration: 1000 })
			),
			-1,
			true
		),
	}))

	return (
		<Animated.View
			style={[animatedStyle]}
			className="flex-row items-center p-3 border-b border-zinc-800"
		>
			<View className="w-6 h-6 mr-3 rounded-md bg-zinc-800" />
			<View className="w-12 h-12 rounded-lg mr-3 bg-zinc-800" />
			<View className="flex-1">
				<View className="h-5 w-32 rounded bg-zinc-800 mb-2" />
				<View className="h-4 w-20 rounded bg-zinc-800" />
			</View>
		</Animated.View>
	)
}
