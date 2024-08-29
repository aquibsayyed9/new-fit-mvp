import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { DietPlan } from './dietPlanModel';
import { MealItem } from './mealItemModel';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DietPlan, (dietPlan) => dietPlan.meals, { onDelete: 'CASCADE' })
  dietPlan: DietPlan;

  @Column({ length: 100 })
  meal_name: string;

  @Column({ length: 50 })
  time: string;

  @Column('int')
  total_calories: number;

  @OneToMany(() => MealItem, (mealItem) => mealItem.meal)
  items: MealItem[];
}
