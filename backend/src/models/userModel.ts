import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WorkoutPlan } from "./workoutPlanModel";
import { DietPlan } from "./dietPlanModel";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  country: string;

  @OneToMany(() => WorkoutPlan, (workoutPlan) => workoutPlan.user)
  workoutPlans: WorkoutPlan[];

  @OneToMany(() => DietPlan, (dietPlan) => dietPlan.user)
  dietPlans: DietPlan[];
}

export default User;
