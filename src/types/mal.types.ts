export interface Query {
    id?: string;
}

export type MalMediaType = 'anime' | 'manga';

export interface MalWatchlistItem {
    anime_title?: string;
    anime_title_eng?: string;
    manga_title?: string;
    manga_english?: string;
}

export interface MediaResult {
    name: string;
}