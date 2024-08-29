import { AppDataSource } from '../data-source';
import { WorkoutPlan } from '../models/workoutPlanModel';
import { Exercise } from '../models/exerciseModel';
import { DietPlan } from '../models/dietPlanModel';
import { Meal } from '../models/mealModel';
import { MealItem } from '../models/mealItemModel';
import { parseWorkoutPlan, parseDietPlan } from './parserService';

// Function to save workout plan
export const saveWorkoutPlan = async (userId: number, responseText: string) => {
  const workoutPlanData = parseWorkoutPlan(responseText);

  // Create a new workout plan instance
  const workoutPlanRepo = AppDataSource.getRepository(WorkoutPlan);
  const workoutPlan = workoutPlanRepo.create({
    user: { id: userId } as any,
    plan_name: workoutPlanData.planName,
    fitness_level: workoutPlanData.fitnessLevel,
    goal: workoutPlanData.goal,
    duration: workoutPlanData.duration,
    equipment: workoutPlanData.equipment,
  });

  await workoutPlanRepo.save(workoutPlan);

  // Save exercises associated with this workout plan
  const exerciseRepo = AppDataSource.getRepository(Exercise);
  for (const exercise of workoutPlanData.exercises) {
    const newExercise = exerciseRepo.create({
      ...exercise,
      workoutPlan,
    });
    await exerciseRepo.save(newExercise);
  }

  return workoutPlan;
};

// Function to save diet plan
export const saveDietPlan = async (userId: number, responseText: string) => {
  const dietPlanData = parseDietPlan(responseText);

  // Create a new diet plan instance
  const dietPlanRepo = AppDataSource.getRepository(DietPlan);
  const dietPlan = dietPlanRepo.create({
    user: { id: userId } as any,
    plan_name: dietPlanData.planName,
    goal: dietPlanData.goal,
    timeframe: dietPlanData.timeframe,
    caloric_intake: dietPlanData.caloricIntake,
    macronutrient_distribution: dietPlanData.macronutrientDistribution,
    hydration_recommendation: dietPlanData.hydrationRecommendation,
    supplements: dietPlanData.supplements,
    special_instructions: dietPlanData.specialInstructions,
  });

  await dietPlanRepo.save(dietPlan);

  // Save meals associated with this diet plan
  const mealRepo = AppDataSource.getRepository(Meal);
  const mealItemRepo = AppDataSource.getRepository(MealItem);
  for (const meal of dietPlanData.meals) {
    const newMeal = mealRepo.create({
      ...meal,
      dietPlan,
    });
    await mealRepo.save(newMeal);

    // Save meal items for each meal
    for (const item of meal.items) {
      const newItem = mealItemRepo.create({
        ...item,
        meal: newMeal,
      });
      await mealItemRepo.save(newItem);
    }
  }

  return dietPlan;
};
