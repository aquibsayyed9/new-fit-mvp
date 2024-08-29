import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Meal } from './mealModel';

@Entity('meal_items')
export class MealItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meal, (meal) => meal.items, { onDelete: 'CASCADE' })
  meal: Meal;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 50 })
  quantity: string;

  @Column('int')
  calories: number;

  @Column('int')
  protein: number;

  @Column('int')
  carbohydrates: number;

  @Column('int')
  fats: number;
}
