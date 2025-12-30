import fetch from 'node-fetch';
import errors from '@media-master/http-errors';

import {
    Query,
    MalMediaType,
    MalWatchlistItem,
    MediaResult,
} from '@types';

export default class MalService {
    private readonly mediaType: MalMediaType;

    constructor(mediaType: string) {
        if (!['anime', 'manga'].includes(mediaType)) {
            throw errors.notFound(
                'Invalid endpoint! Use /[anime|manga]/[import]'
            );
        }

        this.mediaType = mediaType as MalMediaType;
    }

    private request = async <T>(username: string): Promise<T | undefined> => {
        const url = new URL(`https://myanimelist.net/${this.mediaType}list/${username}/load.json?status=1`)

        const response = await fetch(url);
        if (!response.ok) return undefined;

        return (await response.json()) as T;
    };

    private getImport = async (username: string): Promise<MediaResult[]> => {
        const data = await this.request<MalWatchlistItem[]>(username);

        if (!Array.isArray(data)) return [];

        const titleKey = this.mediaType === 'manga' ? 'manga_title' : 'anime_title';
        const englishKey = this.mediaType === 'manga' ? 'manga_english' : 'anime_title_eng';

        return data.map((media) => ({
            name: media[englishKey] && media[englishKey]!.length > 0
                    ? media[englishKey]!
                    : media[titleKey] ?? '',
        }));
    };

    
    public handle = async (method: string, query: Query): Promise<unknown> => {
        const methodMap: Record<string, (param: string) => Promise<unknown>> = {
            import: this.getImport,
        };

        if (!(method in methodMap)) {
            throw errors.notFound(
                'Invalid endpoint! Use /[anime|manga]/[import]'
            );
        }

        const param = query['id'];
        if (param === undefined) throw errors.badRequest(`Missing parameter for the ${method} endpoint`);

        return await methodMap[method](param);
    };
}
