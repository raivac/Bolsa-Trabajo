import { EntityRepository, Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@EntityRepository(UsuarioRepository)
export class UsuarioRepository extends Repository<UsuarioEntity>{

}