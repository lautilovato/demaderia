import {Controller, Get, Post, Patch, Delete, Body, Param} from '@nestjs/common';
import { ArmchairService } from './armchair.service';
import { CreateArmchairDto } from './dto/createArmchair.dto';
import { UpdateArmchairDto } from './dto/updateArmchair.dto';
import { Armchair } from '../../infrastructure/database/entities/Armchair';


@Controller('armchair')
export class ArmchairController {
    constructor(private readonly armchairService: ArmchairService) {}

    @Post()
    async createArmchair(@Body() createArmchairDto: CreateArmchairDto) {
        const armchair = await this.armchairService.createArmchair(createArmchairDto);
        return {
            message: 'Armchair created successfully',
            data: armchair,
        }
    }

    @Get(':id')
    async getArmchairById(@Param('id') id: number) {
        const armchair = await this.armchairService.getArmchairById(id);
        return armchair;
    }

    @Patch(':id')
    async updateArmchair(@Param('id') id: number, @Body() updateArmchairDto: UpdateArmchairDto) {
        const armchair = await this.armchairService.updateArmchair(id, updateArmchairDto);
        return {
            message: 'Armchair updated successfully',
            data: armchair,
        }
    }

    @Delete(':id')
    async deleteArmchair(@Param('id') id: number) {
        await this.armchairService.deleteArmchair(id);
        return {
            message: 'Armchair deleted successfully',
        }
    }

}


