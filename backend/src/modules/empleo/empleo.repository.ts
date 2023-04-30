import { EntityRepository, Repository } from "typeorm";
import { EmpleoEntity } from "./empleo.entity";

@EntityRepository(EmpleoEntity)
export class EmpleoRepository extends Repository<EmpleoEntity>{
    
}