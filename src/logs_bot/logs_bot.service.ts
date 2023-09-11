import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { RolesService } from "../roles/roles.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { logs_bot } from "./logs_bot.model";
import { CreateLogsDto } from "./dto/create-logs.dto";

@Injectable()
export class LogsBotService {
  constructor(@InjectModel(logs_bot) private logsRepository: typeof logs_bot) {

  }
  async createUser(dto: CreateLogsDto){
    const logs = await this.logsRepository.create(dto);
    return logs;
  }

}
