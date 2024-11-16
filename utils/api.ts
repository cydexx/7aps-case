import { ApiResponse } from "../types"
import axios from "axios"

export async function fetchCharacters(query: string): Promise<ApiResponse> {
	if (!query) return { results: [] }
	const { data } = await axios.get<ApiResponse>(
		`https://rickandmortyapi.com/api/character/?name=${query}`
	)
	return data
}
