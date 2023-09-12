import { Injectable, Logger, OnModuleInit, ValidationPipe } from "@nestjs/common";
import * as process from 'process';
import { InjectModel } from "@nestjs/sequelize";
import { logs_bot } from "../logs_bot/logs_bot.model";
import { ChatCompletionApiService } from "../chat-completion-api/chat-completion-api.service";
import {
  GetChatCompletionAnswerInputDTO,
  GetChatCompletionAnswerOutputDTO
} from "../chat-completion-api/model/chat-completion.answer.dto";

const TelegramBot = require('node-telegram-bot-api');

const bb = require('bot-brother');


const WebAppUrl = 'https://ubiquitous-trifle-97a24d.netlify.app/';

@Injectable()
export class BotService {
  private readonly bot: any;
  private logger = new Logger(BotService.name);
  constructor(@InjectModel(logs_bot) private logs_botRepository: typeof logs_bot,
              private readonly gpt: ChatCompletionApiService) {
      let token = process.env.TOKEN;

      //let bot = new TelegramBot(token, {polling: true});
      let bot_bb = bb({
          key: token,
          sessionManager: bb.sessionManager.memory(),
          polling: {interval: 0, timeout: 1},
      });

      // This callback cathes all commands.
      bot_bb.command(/.*/).use('before', async function (ctx) {
          console.log(ctx.meta, ctx.message);
          const opts = {
              chat_id: ctx.meta.from.id as string,
              message: ctx.message.text as string,
              type: 'message',
              first_name: ctx.meta.from.first_name
          }

          await logs_botRepository.create(opts);
      })

      bot_bb.command('help')
          .invoke(function (ctx) {
              // Setting data, data is used in text message templates.
              ctx.data.user = ctx.meta.user;
              // Invoke callback must return promise.
              return ctx.sendMessage('Боту пока доступна одна функция, по команде /gptchat - общение с искуственным интелектом');
          })
          .answer(function (ctx) {
              ctx.data.answer = ctx.answer;
              // Returns promise.
              return ctx.sendMessage('OK. /start, /gptchat, или /help');
          });

      bot_bb.command('start')
          .invoke(function (ctx) {
              // Setting data, data is used in text message templates.
              ctx.data.user = ctx.meta.user;
              // Invoke callback must return promise.
              return ctx.sendMessage('Привет <%=user.first_name%>. Чтобы ознакомиться с возможностями бота введите команду: /help?');
          })
          .answer(function (ctx) {
              ctx.data.answer = ctx.answer;
              // Returns promise.
              return ctx.sendMessage('OK. /start, /gptchat, или /help');
          });

      bot_bb.command('gptchat')
          .invoke(function (ctx) {
              // Setting data, data is used in text message templates.
              ctx.data.user = ctx.meta.user;
              // Invoke callback must return promise.
              return ctx.sendMessage('Ты можешь задавать вопросы искусственному интелекту.');
          })
          .answer(async function (ctx) {
              ctx.data.answer = ctx.answer;
              //
              new ValidationPipe({transform: true})
              const resp = new GetChatCompletionAnswerInputDTO();
              resp.message = ctx.answer;
              let otvet = new GetChatCompletionAnswerOutputDTO();
              otvet = await gpt.getAiModelAnswer(resp);

              //await bot.editMessageText(otvet.aiMessage, opts);
              return ctx.sendMessage( otvet.aiMessage );
          });
  }
}
