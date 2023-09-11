import {Module} from "@nestjs/common";
import {BotService} from "./bots.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { logs_bot } from "../logs_bot/logs_bot.model";
import { RolesService } from "../roles/roles.service";
import { LogsBotService } from "../logs_bot/logs_bot.service";

@Module({
    providers: [BotService],
    imports: [
      SequelizeModule.forFeature([logs_bot])
    ]
})
export class BotsModule {}