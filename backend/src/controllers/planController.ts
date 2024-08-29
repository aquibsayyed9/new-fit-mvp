import { Request, Response } from "express";
import { generateWorkoutPlan, generateDietPlan } from "../services/openaiService"; // Import your OpenAI service functions
import { AppDataSource } from "../data-source";
import { DietPlan } from "../models/dietPlanModel";
import { WorkoutPlan } from "../models/workoutPlanModel";

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

   // Accept a generated plan
   async acceptPlan(req: Request, res: Response) {
    try {
      const { planType, planId } = req.body;

      // You would typically have logic to update the status of the plan in the database.
      // Example:
      if (planType === 'workout') {
        const workoutPlanRepo = AppDataSource.getRepository(WorkoutPlan);
        const workoutPlan = await workoutPlanRepo.findOneBy({ id: planId });

        if (!workoutPlan) {
          return res.status(404).json({ message: 'Workout plan not found' });
        }

        workoutPlan.isAccepted = true; // Assuming you have an `isAccepted` field
        await workoutPlanRepo.save(workoutPlan);
      } else if (planType === 'diet') {
        const dietPlanRepo = AppDataSource.getRepository(DietPlan);
        const dietPlan = await dietPlanRepo.findOneBy({ id: planId });

        if (!dietPlan) {
          return res.status(404).json({ message: 'Diet plan not found' });
        }

        dietPlan.isAccepted = true; // Assuming you have an `isAccepted` field
        await dietPlanRepo.save(dietPlan);
      } else {
        return res.status(400).json({ message: 'Invalid plan type' });
      }

      res.json({ message: `Plan ${planType} with ID ${planId} has been accepted.` });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error accepting plan', error: error.message });
          } else {
            res.status(500).json({ message: 'Unknown error occurred' });
          }
    }
  }
}

export default new PlanController();
