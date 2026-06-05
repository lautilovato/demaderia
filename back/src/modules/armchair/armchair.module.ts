import { Global, Module } from '@nestjs/common';
import { ArmchairController } from './armchair.controller';
import { ArmchairRepository } from './armchair.repository';
import { ArmchairService } from './armchair.service';

@Global()
@Module({
  imports: [],
  controllers: [ArmchairController],
  providers: [
    ArmchairRepository,
    ArmchairService,
  ],
  exports: [ArmchairRepository],
})
export class ArmchairModule {}