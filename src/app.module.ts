import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.model'
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import {BotsModule} from "./bots/bots.module";
import { LogsBotModule } from './logs_bot/logs_bot.module';
import { ChatCompletionApiModule } from './chat-completion-api/chat-completion-api.module';


@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      ssl: true,
      dialectOptions: {
        ssl: true && {
          require: true,
        },
      },
      models: [ User, Role, UserRoles ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BotsModule,
    LogsBotModule,
    ChatCompletionApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
