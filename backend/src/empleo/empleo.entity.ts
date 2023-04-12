import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'empleo' })
export class EmpleoEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false})
  titulo: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  empresa: string;

  @Column({ type: 'varchar', nullable: false })
  ubicacion: string;

  @Column({ type: 'datetime', default: ()=>'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({ type: 'varchar', length: 150, nullable: false })
  descripcion: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  tipoContrato: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  jornada: string;

  @Column({ type: 'decimal', nullable: false })
  salario: number;

  @Column({ type: 'text',nullable: false})
  logo: string;

  @Column({ type: 'int', nullable: false })
  idEmpresa: number; 
}
