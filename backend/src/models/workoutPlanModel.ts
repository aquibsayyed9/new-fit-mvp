import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import User from './userModel';
import { Exercise } from './exerciseMode';

@Entity('workout_plans')
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.workoutPlans, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 255 })
  plan_name: string;

  @Column({ length: 50 })
  fitness_level: string;

  @Column({ length: 100 })
  goal: string;

  @Column({ length: 50 })
  duration: string;

  @Column('jsonb')
  equipment: string[];

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.workoutPlan)
  exercises: Exercise[];
}
