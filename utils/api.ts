import { ApiResponse } from "../types"
import axios from "axios"
import { API_CONFIG } from "./constants"

export async function fetchCharacters(query: string) {
	try {
		if (!query) return { results: [] }
		const { data } = await axios.get<ApiResponse>(
			`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}/?name=${query}`
		)
		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				throw new Error("No characters found")
			}
		}
		throw new Error("Failed to fetch characters")
	}
}
