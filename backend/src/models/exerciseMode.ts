import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WorkoutPlan } from './workoutPlanModel';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkoutPlan, (workoutPlan) => workoutPlan.exercises, { onDelete: 'CASCADE' })
  workoutPlan: WorkoutPlan;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 50 })
  type: string;

  @Column('int')
  workingsets: number;

  @Column('int')
  warmupsets: number;

  @Column('int')
  recommended_reps: number;

  @Column({ length: 50 })
  rest_time_between_sets: string;

  @Column('text')
  instructions: string;

  @Column({ length: 50 })
  primary_muscle_group: string;

  @Column('jsonb')
  secondary_muscle_groups: string[];

  @Column('jsonb')
  equipment_needed: string[];

  @Column({ nullable: true })
  exercise_image_url: string;
}
