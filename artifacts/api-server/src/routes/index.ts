import { Router, type IRouter } from "express";
import healthRouter from "./health";
import faqsRouter from "./faqs";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(faqsRouter);
router.use(contactRouter);

export default router;
