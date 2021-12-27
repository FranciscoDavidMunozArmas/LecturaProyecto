import { Router } from 'express';
import { authAdmin, authUser } from '../auth/auth.auth';
import * as Controller from '../controllers/certificate.controller';

const router = Router();

router.route("/")
.get(authUser, Controller.getCertificates)
.post(authUser, Controller.createCertificate)
.delete(authUser, authAdmin, Controller.deleteCertificates);

router.route("/certificate/:id")
.get(authUser, Controller.getCertificate)
.delete(authUser, authAdmin, Controller.deleteCertificate);

export default router;