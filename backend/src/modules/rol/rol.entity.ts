import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolNombre } from './rol.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity({name: 'rol'})
export class RolEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false,  unique: true })
    rolNombre: RolNombre;

    @ManyToMany(type => UsuarioEntity, usuario => usuario.roles)
    usuarios: UsuarioEntity[];
}