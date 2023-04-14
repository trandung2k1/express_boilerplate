import { Router } from 'express';
import SiteController from '../controllers/site.controller.js';

const router = Router();
router.get('/', SiteController.getHomePage);
export default router;
