import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TaskType {
  Development = 0,
  Support = 1,
}

export enum TaskStatus {
  Created = 0,
  InProgress = 1,
  Done = 2,
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 64 })
  title: string;

  @Column({ nullable: true, length: 1024 })
  description: string;

  @Column({ nullable: false })
  type: TaskType;

  @Column({ nullable: false, default: TaskStatus.Created })
  status: TaskStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
