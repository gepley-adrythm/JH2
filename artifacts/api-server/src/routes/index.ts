import { Router, type IRouter } from "express";
import healthRouter from "./health";
import faqsRouter from "./faqs";

const router: IRouter = Router();

router.use(healthRouter);
router.use(faqsRouter);

export default router;
