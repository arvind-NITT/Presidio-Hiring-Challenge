import { Router } from "express";
const router =Router();
import { verifyBuyer } from "../middleware/buyer.auth.js";
import { getProperty, sendMail } from "../controller/buyer.controller.js";

router.route('/get-property').get(verifyBuyer,getProperty);
router.route('/send-mail').post(verifyBuyer,sendMail);
export default router;