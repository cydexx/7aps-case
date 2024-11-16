import { Text } from "react-native"
import React from "react"

export function highlightText(
	text: string,
	highlight: string
): React.ReactNode {
	if (!highlight.trim()) return text
	const parts = text.split(new RegExp(`(${highlight})`, "gi"))
	return parts.map((part, i) =>
		part.toLowerCase() === highlight.toLowerCase() ? (
			<Text key={i} className="font-extrabold">
				{part}
			</Text>
		) : (
			part
		)
	)
}
