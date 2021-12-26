import { Router } from 'express';
import { authAdmin, authUser } from '../auth/auth.auth';
import * as Controller from '../controllers/user.controller';

const router = Router();

router.route("/authorize")
.post(Controller.authorization);

router.route("/")
.delete(authUser, authAdmin, Controller.deleteUsers);


export default router;