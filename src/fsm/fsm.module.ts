import { Module } from '@nestjs/common';
import { FsmService } from './fsm.service';

@Module({
  providers: [FsmService]
})
export class FsmModule {}
