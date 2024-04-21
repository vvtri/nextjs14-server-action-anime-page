'use server';

import { AnimeProp } from '@/components/AnimeCard';

export const fetchAnime = async (
	page: number,
	limit: number = 8
): Promise<AnimeProp[]> => {
	const response = await fetch(
		`https://shikimori.one/api/animes?page=${page}&limit=${limit}&order=popularity`
	);

	const data = await response.json();
	return data;
};
