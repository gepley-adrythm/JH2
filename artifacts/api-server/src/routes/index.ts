import { Router, type IRouter } from "express";
import healthRouter from "./health";
import faqsRouter from "./faqs";
import contactRouter from "./contact";
import mortgageRateRouter from "./mortgageRate";
import estimateRouter from "./estimate";

const router: IRouter = Router();

router.use(healthRouter);
router.use(faqsRouter);
router.use(contactRouter);
router.use(mortgageRateRouter);
router.use(estimateRouter);

export default router;
