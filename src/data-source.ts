import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from '../src/tasks/entities/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nico',             // ← correcto según tu docker-compose
  password: 'postgres',         // ← correcto también
  database: 'my_db',            // ← también correcto
  synchronize: false,
  logging: false,
  entities: [Task],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
