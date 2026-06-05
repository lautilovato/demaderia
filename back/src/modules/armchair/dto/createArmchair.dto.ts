import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateArmchairDto {
  
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    basePrice!: number;

    @IsNumber()
    @IsNotEmpty()
    baseWidthCm!: number;

    @IsNumber()
    @IsNotEmpty()
    baseDepthCm!: number;

    @IsNumber()
    @IsNotEmpty()
    baseHeightCm!: number;

    @IsNumber()
    @IsNotEmpty()
    extraWidthCmPrice!: number;

    @IsNumber()
    @IsNotEmpty()
    extraDepthCmPrice!: number;

    @IsNumber()
    @IsNotEmpty()
    extraHeightCmPrice!: number;

}