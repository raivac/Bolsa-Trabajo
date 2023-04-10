import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'empleo' })
export class EmpleoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  titulo: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  empresa: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 50, nullable: false })
  descripcion: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  tipoContrato: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  jornada: string;

  @Column({ type: 'number', nullable: false })
  salario: number;

  @Column({ type: 'varchar', nullable: false })
  logo: string;
}
