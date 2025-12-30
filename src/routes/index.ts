import { Router } from 'express';
import malController from '@controllers/mal';

const routes: Router = Router();

routes.use('/:type/:method', malController.handler);

export default routes;