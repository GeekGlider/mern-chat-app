import express from 'express';
const router = express.Router();

import {getUsersForSidebar} from '../controllers/user.controllers.js';
import protectRoute from '../middleware/protectRoute.js';


router.get('/',protectRoute,getUsersForSidebar);

export default router;