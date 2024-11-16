import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import CharacterSearch from "@/components/character-search/CharacterSearch"
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 dakika
			gcTime: 1000 * 60 * 30, // 30 dakika
		},
	},
})

export default function TabOneScreen() {
	return (
		<QueryClientProvider client={queryClient}>
			<CharacterSearch />
		</QueryClientProvider>
	)
}
