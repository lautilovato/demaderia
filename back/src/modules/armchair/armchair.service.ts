import { Injectable, NotFoundException, BadRequestException,} from '@nestjs/common';
import { TransactionalMikroOrmClass } from '../../shared/decorators/transactional-mikro-orm.decorator';
import {wrap} from '@mikro-orm/core';
import {ArmchairRepository} from "./armchair.repository";
import {CreateArmchairDto} from "./dto/createArmchair.dto";
import {UpdateArmchairDto} from "./dto/updateArmchair.dto";
import {Armchair} from "../../infrastructure/database/entities/Armchair";

@Injectable()
@TransactionalMikroOrmClass()
export class ArmchairService {
  constructor(
    private readonly armchairRepository: ArmchairRepository,
  ) {}

  async getArmchairById(id: number){
    return this.armchairRepository.findOne({id});
  }

  async createArmchair(createArmchairDto: CreateArmchairDto): Promise<Armchair> {
    const armchair = this.armchairRepository.create(createArmchairDto);
    await this.armchairRepository.save(armchair);
    return armchair;
  }

  async updateArmchair(id: number, updateArmchairDto: UpdateArmchairDto): Promise<Armchair> {
    const armchair = await this.armchairRepository.findOne({id});
    if (!armchair) {
      throw new NotFoundException('Armchair not found');
    }
    wrap(armchair).assign(updateArmchairDto);
    await this.armchairRepository.save(armchair);
    return armchair;
  }

  async deleteArmchair(id: number){
    const armchair = await this.armchairRepository.findOne({id});
    if (!armchair) {
      throw new NotFoundException('Armchair not found');
    }
    await this.armchairRepository.remove(armchair);
  }

}