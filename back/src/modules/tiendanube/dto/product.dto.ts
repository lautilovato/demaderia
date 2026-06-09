import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TiendanubeProductDto {
  
    @IsNumber()
    id!: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;


    @IsNumber()
    price!: number;

    @IsNumber()
    stock!: number | null;

    @IsString()
    sku!: string | null;

    @IsString()
    imageUrl!: string | null;

    @IsString()
    url!: string;
}

