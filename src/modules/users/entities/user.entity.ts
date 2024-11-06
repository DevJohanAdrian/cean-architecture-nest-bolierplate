import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Usar {} para dar un nombre de la tabla diferente, si no esta tomara el nombre de la clase
export class User {
  @PrimaryGeneratedColumn('increment') // Increment 1:1 en BD
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  password?: string;
}
