import { Module } from '@nestjs/common';
import { LogsBotService } from './logs_bot.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { logs_bot } from "./logs_bot.model";

@Module({
  providers: [LogsBotService],
  imports: [SequelizeModule.forFeature([logs_bot])]
})
export class LogsBotModule {}
