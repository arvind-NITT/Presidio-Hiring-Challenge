import { Router } from "express";
const router =Router();
import { verifySeller } from "../middleware/seller.auth.js";
import { addProperty ,fetchProperty,deleteProperty,updateProperty} from "../controller/seller.controller.js";
router.route('/add-property').post(verifySeller,addProperty);
router.route('/fetch-property').get(verifySeller,fetchProperty);
router.route('/delete-property/:id').delete(verifySeller,deleteProperty);
router.route('/update-property/:id').put(verifySeller,updateProperty)
export default router;