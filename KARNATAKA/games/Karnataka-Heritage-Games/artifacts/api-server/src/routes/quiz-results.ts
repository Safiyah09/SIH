import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { insertQuizResultSchema, quizResultsTable, type QuizResult } from "@workspace/db/schema";

const router: IRouter = Router();
const categories = ["art", "dance", "monuments", "music", "festivals", "food", "attire", "games"] as const;

function playerIdFromQuery(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("playerId is required");
  }
  return value;
}

function serializeResult(result: QuizResult) {
  return {
    ...result,
    completedAt: result.completedAt.toISOString(),
  };
}

router.get("/quiz-results", async (req, res) => {
  const playerId = playerIdFromQuery(req.query.playerId);
  const results = await db
    .select()
    .from(quizResultsTable)
    .where(eq(quizResultsTable.playerId, playerId))
    .orderBy(desc(quizResultsTable.completedAt))
    .limit(100);
  res.json(results.map(serializeResult));
});

router.post("/quiz-results", async (req, res) => {
  const body = insertQuizResultSchema.parse({
    ...req.body,
    subcategory: req.body.subcategory || null,
    completedAt: new Date(req.body.completedAt),
  });
  const [created] = await db.insert(quizResultsTable).values(body).returning();
  res.status(201).json(serializeResult(created));
});

router.get("/quiz-stats", async (req, res) => {
  const playerId = playerIdFromQuery(req.query.playerId);
  const results = await db
    .select()
    .from(quizResultsTable)
    .where(eq(quizResultsTable.playerId, playerId))
    .orderBy(desc(quizResultsTable.completedAt));

  const bestScore = results.length ? Math.max(...results.map((result) => result.score)) : 0;
  const bestAccuracy = results.length ? Math.max(...results.map((result) => result.accuracy)) : 0;
  const fastestTime = results.length ? Math.min(...results.map((result) => result.durationSeconds)) : 0;
  const categoryProgress = Object.fromEntries(
    categories.map((category) => [category, results.some((result) => result.category === category)]),
  );
  const categoryStats = Object.fromEntries(
    categories.map((category) => {
      const categoryResults = results.filter((result) => result.category === category);
      return [
        category,
        {
          attempts: categoryResults.length,
          bestScore: categoryResults.length ? Math.max(...categoryResults.map((result) => result.score)) : 0,
          bestAccuracy: categoryResults.length ? Math.max(...categoryResults.map((result) => result.accuracy)) : 0,
          fastestTime: categoryResults.length ? Math.min(...categoryResults.map((result) => result.durationSeconds)) : 0,
          totalXp: categoryResults.reduce((total, result) => total + result.xp, 0),
          recentResults: categoryResults.slice(0, 5).map(serializeResult),
        },
      ];
    }),
  );

  res.json({
    totalCategories: categories.length,
    completedCategories: Object.values(categoryProgress).filter(Boolean).length,
    bestScore,
    bestAccuracy,
    fastestTime,
    attempts: results.length,
    totalXp: results.reduce((total, result) => total + result.xp, 0),
    categoryProgress,
    categoryStats,
    recentResults: results.slice(0, 10).map(serializeResult),
  });
});

export default router;