import runImportTests, { Fields } from '@media-master/import-service-tests';
import { Express } from 'express';
import { describe } from 'vitest';
import app from '../src/app';

const server = app as Express;

describe('Controller', () => {
    describe('Endpoint /anime', () => {
        const endpoint: string = '/anime';
        const validIds: string[] = [
            'SKT_Blackspell13',
            'iRaphahell',
            'Kineta',
        ];
        const invalidIds: string[] = [
            'Not an id',
            'nonExistentId',
        ];
        const fields: Fields = {
            name: { type: 'string' },
        };
        runImportTests(
            server,
            endpoint,
            { validIds, invalidIds, fields }
        );
    });

    describe('Endpoint /manga', () => {
        const endpoint: string = '/manga';
        const validIds: string[] = [
            'SKT_Blackspell13',
            'iRaphahell',
            'Kineta',
        ];
        const invalidIds: string[] = [
            'Not an id',
            'nonExistentId',
        ];
        const fields: Fields = {
            name: { type: 'string' },
        };
        runImportTests(
            server,
            endpoint,
            { validIds, invalidIds, fields }
        );
    });
});