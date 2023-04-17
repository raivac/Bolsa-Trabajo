import { hash } from 'bcryptjs';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { RolEntity } from 'src/rol/rol.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'usuario'})
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false,  unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', nullable: false })
    nombre: string; 

    @Column({ type: 'varchar', nullable: false })
    apellidos: string;

    @Column({ type: 'varchar', nullable: true})
    empresa: string;

    @Column({ type: 'int', nullable: false })
    telefono: number;

    @Column({ type: 'varchar', nullable: false ,unique:true})
    cif: string;

    @Column({ type: 'varchar', nullable: true })
    descripcion: string;

    @ManyToMany(type => RolEntity, rol => rol.usuarios, {eager: true})
    @JoinTable({
        name: 'usuario_rol',
        joinColumn: {name:'usuario_id'},
        inverseJoinColumn: {name:'rol_id'}
    })

    roles: RolEntity[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password) return;
        this.password = await hash(this.password, 10 )
    }

}