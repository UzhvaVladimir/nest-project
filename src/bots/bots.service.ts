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

const WebAppUrl = 'https://ubiquitous-trifle-97a24d.netlify.app/';

@Injectable()
export class BotService {
  private readonly bot: any;
  private logger = new Logger(BotService.name);
  constructor(@InjectModel(logs_bot) private logs_botRepository: typeof logs_bot, private readonly gpt: ChatCompletionApiService) {
    let token = process.env.TOKEN;

    let bot = new TelegramBot(token, { polling: true });

    bot.on('message', this.onReceiveMessage);

    bot.on('callback_query', async function onCallbackQuery(e) {
          const action = e.data;
          const msg = e.message;
          console.log(msg, action);

          const opts = {
            chat_id: msg.chat.id,
            message: action,
            message_id: msg.message_id,
            type: 'callback_query',
            first_name: msg.chat.first_name
          };
          let text;
          if (action === 'edit') {
            text = '';
          }

          if (action === 'Привет') {
            text = 'Вы выбрали текст "Привет';
          new ValidationPipe({transform: true})
            const resp = new GetChatCompletionAnswerInputDTO();
            resp.message = action;
            let otvet = new GetChatCompletionAnswerOutputDTO();

            otvet =  await gpt.getAiModelAnswer(resp);
            await bot.editMessageText(otvet.aiMessage, opts);
          }
          await logs_botRepository.create(opts);
          //await bot.editMessageText( text, opts );
        }
    );

    ///
    bot.onText(/\/edit/, function onEditableText(msg){
      const opts = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Edit Text',
                // we shall check for this value when we listen
                // for "callback_query"
                callback_data: 'edit'
              }
            ]
          ]
        }
      };
        bot.sendMessage(msg.from.id, 'Original Text', opts);
    });

    ///
    bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const textMessage = msg.text;

      if (textMessage === '/start') {
        // send a message to the chat acknowledging receipt of their message
        await bot.sendMessage(
          chatId,
          'Заполни форму, которая появится ниже',
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: 'Кнопка', web_app: { url: WebAppUrl } },
                 { text: 'Кнопка №1', callback_data: 'Привет'}],
              ],
            },
          },
        );
      }
    });
  }

  onReceiveMessage = (msg: any) => {
    const opts = {
        chat_id: msg.chat.id as string,
        message: msg.text as string,
        type: 'message',
        first_name: msg.chat.first_name
      }
    this.logger.debug(msg);
    console.log(opts.chat_id, opts.message )
    this.createLogs(opts);
  };

  async createLogs(dto){
    const logs = await this.logs_botRepository.create(dto);
    return logs;
  }
}
