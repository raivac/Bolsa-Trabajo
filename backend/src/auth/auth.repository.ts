import { EntityRepository, Repository } from "typeorm";
import { UsuarioEntity } from "src/modules/usuario/usuario.entity";

@EntityRepository(UsuarioEntity)
export class AuthRepository extends Repository<UsuarioEntity>{

}