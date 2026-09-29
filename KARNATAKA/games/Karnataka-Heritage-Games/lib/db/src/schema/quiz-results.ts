import { createInsertSchema } from "drizzle-zod";
import {
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const quizResultsTable = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  playerId: text("player_id").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  difficulty: text("difficulty").notNull(),
  score: integer("score").notNull(),
  accuracy: doublePrecision("accuracy").notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  xp: integer("xp").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull(),
});

export const insertQuizResultSchema = createInsertSchema(quizResultsTable).omit({
  id: true,
});

export type QuizResult = typeof quizResultsTable.$inferSelect;
export type InsertQuizResult = typeof quizResultsTable.$inferInsert;