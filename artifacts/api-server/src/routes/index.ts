import { Router, type IRouter } from "express";
import healthRouter from "./health";
import faqsRouter from "./faqs";
import contactRouter from "./contact";
import mortgageRateRouter from "./mortgageRate";

const router: IRouter = Router();

router.use(healthRouter);
router.use(faqsRouter);
router.use(contactRouter);
router.use(mortgageRateRouter);

export default router;
