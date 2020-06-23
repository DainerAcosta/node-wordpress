import { Router } from 'express';

import { eventController } from '../controllers/eventController';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', eventController.getEvent);
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;