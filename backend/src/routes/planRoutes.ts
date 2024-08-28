import { Router } from "express";
import PlanController from "../controllers/planController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: Endpoints for generating workout and diet plans
 */

/**
 * @swagger
 * /api/plans/generate-workout:
 *   post:
 *     summary: Generate a workout plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fitnessLevel:
 *                 type: string
 *                 example: beginner
 *               goal:
 *                 type: string
 *                 example: lose weight
 *               equipment:
 *                 type: string
 *                 example: dumbbells, yoga mat
 *               focus:
 *                 type: string
 *                 example: full body
 *     responses:
 *       200:
 *         description: A generated workout plan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plan:
 *                   type: string
 *                   example: "Monday: Full-body workout..."
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Error generating workout plan
 */
router.post("/generate-workout", authMiddleware, PlanController.generateWorkout);

/**
 * @swagger
 * /api/plans/generate-diet:
 *   post:
 *     summary: Generate a diet plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dietaryPreferences:
 *                 type: string
 *                 example: vegetarian
 *               goal:
 *                 type: string
 *                 example: muscle gain
 *               timeframe:
 *                 type: string
 *                 example: 12 weeks
 *               availableFoods:
 *                 type: string
 *                 example: quinoa, tofu, spinach
 *     responses:
 *       200:
 *         description: A generated diet plan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plan:
 *                   type: string
 *                   example: "Breakfast: Quinoa with spinach and tofu..."
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Error generating diet plan
 */
router.post("/generate-diet", authMiddleware, PlanController.generateDiet);

export default router;
