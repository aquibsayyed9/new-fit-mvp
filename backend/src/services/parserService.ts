export const parseWorkoutPlan = (responseText: string) => {
    // Parse the JSON response
    const planData = JSON.parse(responseText);
  
    const parsedPlan = {
      planName: planData.planName || 'Custom Workout Plan',
      fitnessLevel: planData.fitnessLevel || 'Intermediate',
      goal: planData.goal || 'General Fitness',
      duration: planData.duration || '4 weeks',
      equipment: planData.equipment || [],
      exercises: planData.exercises.map((exercise: any) => ({
        name: exercise.name,
        type: exercise.type,
        workingsets: exercise.workingsets,
        warmupsets: exercise.warmupsets,
        recommendedReps: exercise.recommendedReps,
        restTimeBetweenSets: exercise.restTimeBetweenSets,
        instructions: exercise.instructions,
        primaryMuscleGroup: exercise.primaryMuscleGroup,
        secondaryMuscleGroups: exercise.secondaryMuscleGroups,
        equipmentNeeded: exercise.equipmentNeeded,
        exerciseImageUrl: exercise.exerciseImageUrl,
      })),
    };
  
    return parsedPlan;
  };
  
  export const parseDietPlan = (responseText: string) => {
    // Parse the JSON response
    const planData = JSON.parse(responseText);
  
    const parsedPlan = {
      planName: planData.planName || 'Custom Diet Plan',
      goal: planData.goal || 'Weight Loss',
      timeframe: planData.timeframe || '4 weeks',
      caloricIntake: planData.caloricIntake || 2000,
      macronutrientDistribution: planData.macronutrientDistribution || {
        protein: 100,
        carbohydrates: 250,
        fats: 70,
      },
      hydrationRecommendation: planData.hydrationRecommendation || '8 cups of water per day',
      supplements: planData.supplements || [],
      specialInstructions: planData.specialInstructions || '',
      meals: planData.meals.map((meal: any) => ({
        mealName: meal.mealName,
        time: meal.time,
        totalCalories: meal.totalCalories,
        items: meal.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          calories: item.calories,
          protein: item.protein,
          carbohydrates: item.carbohydrates,
          fats: item.fats,
        })),
      })),
    };
  
    return parsedPlan;
  };
  