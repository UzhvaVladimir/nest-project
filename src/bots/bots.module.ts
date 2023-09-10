import {Module} from "@nestjs/common";
import {BotService} from "./bots.service";

@Module({
    providers: [BotService]
})
export class BotsModule {}