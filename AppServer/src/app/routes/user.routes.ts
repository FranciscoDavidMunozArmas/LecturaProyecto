import { Router } from 'express';
import { authUser } from '../auth/auth.auth';
import * as Controller from '../controllers/user.controller';

const router = Router();

router.route("/authorize")
.post(authUser, Controller.authorization);

router.route("/")
.delete(authUser, Controller.deleteUsers);


export default router;