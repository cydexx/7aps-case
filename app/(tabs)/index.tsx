import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CharacterSearch from "@/components/character-search/CharacterSearch"
import { QUERY_CONFIG } from "@/utils/constants"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: QUERY_CONFIG.STALE_TIME,
			gcTime: QUERY_CONFIG.GC_TIME,
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
