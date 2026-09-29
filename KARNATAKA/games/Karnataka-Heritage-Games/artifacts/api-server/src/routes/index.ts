import { Router, type IRouter } from "express";
import healthRouter from "./health";
import gameResultsRouter from "./game-results";
import quizResultsRouter from "./quiz-results";

const router: IRouter = Router();

router.use(healthRouter);
router.use(gameResultsRouter);
router.use(quizResultsRouter);

export default router;
