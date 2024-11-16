import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CharacterSearch from "@/components/CharacterSearch"

const queryClient = new QueryClient()

export default function TabOneScreen() {
	return (
		<QueryClientProvider client={queryClient}>
			<CharacterSearch />
		</QueryClientProvider>
	)
}
