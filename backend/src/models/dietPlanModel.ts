import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import User from './userModel';
import { Meal } from './mealModel';

@Entity('diet_plans')
export class DietPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dietPlans, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 255 })
  plan_name: string;

  @Column({ length: 100 })
  goal: string;

  @Column({ length: 50 })
  timeframe: string;

  @Column('int')
  caloric_intake: number;

  @Column('jsonb')
  macronutrient_distribution: {
    protein: number;
    carbohydrates: number;
    fats: number;
  };

  @Column('text', { nullable: true })
  hydration_recommendation: string;

  @Column('jsonb', { nullable: true })
  supplements: string[];

  @Column('text', { nullable: true })
  special_instructions: string;

  @Column({ default: false })
  isAccepted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Meal, (meal) => meal.dietPlan)
  meals: Meal[];
}
