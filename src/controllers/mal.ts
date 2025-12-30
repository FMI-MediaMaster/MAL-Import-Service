import { Request, Response } from 'express';
import MalService from '@services/mal';

export default class MalController {
    static async handler(req: Request, res: Response): Promise<void> {
        const mal: MalService = new MalService(req.params.type!);
        res.ok(await mal.handle(req.params.method, req.query) as object);
    };
}