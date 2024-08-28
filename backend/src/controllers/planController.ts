import { Request, Response } from "express";
import { generateWorkoutPlan, generateDietPlan } from "../services/openaiService"; // Import your OpenAI service functions

class PlanController {
  // Generate a workout plan
  async generateWorkout(req: Request, res: Response): Promise<Response> {
    try {
      // Call the service method to generate the workout plan
      const workoutPlan = await generateWorkoutPlan(req.body);
      return res.status(200).json({ plan: workoutPlan });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: "Error generating workout plan", error: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  // Generate a diet plan
  async generateDiet(req: Request, res: Response): Promise<Response> {
    try {
      // Call the service method to generate the diet plan
      const dietPlan = await generateDietPlan(req.body);
      return res.status(200).json({ plan: dietPlan });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: "Error generating diet plan", error: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}

export default new PlanController();
