import {Module} from "@nestjs/common";
import {BotService} from "./bots.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { logs_bot } from "../logs_bot/logs_bot.model";
import { RolesService } from "../roles/roles.service";
import { LogsBotService } from "../logs_bot/logs_bot.service";

import { ChatCompletionApiModule } from "../chat-completion-api/chat-completion-api.module";

@Module({
    providers: [BotService],
    imports: [
      SequelizeModule.forFeature([logs_bot]),
      ChatCompletionApiModule
    ],
    exports: [ChatCompletionApiModule]
})
export class BotsModule {}