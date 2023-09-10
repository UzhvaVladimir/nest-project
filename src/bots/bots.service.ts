import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as process from 'process';

const TelegramBot = require('node-telegram-bot-api');

const WebAppUrl = 'https://ubiquitous-trifle-97a24d.netlify.app/';

@Injectable()
export class BotService {
  private readonly bot: any;
  private logger = new Logger(BotService.name);
  constructor() {
    let token = process.env.TOKEN;

    let bot = new TelegramBot(token, { polling: true });

    bot.on('message', this.onReceiveMessage);

    bot.on('callback_query', function onCallbackQuery(e) {
          const action = e.data;
          const msg = e.message;
          console.log(msg, action);

          const opts = {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
          };
          let text;
          if (action === 'edit') {
            text = 'Edited Text';
          }

          if (action === 'Привет') {
            text = 'Вы выбрали текст "Привет';
          }
          console.log(opts.chat_id, opts.message_id, text);
          bot.editMessageText( text, opts );
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
    this.logger.debug(msg);
  };
  onReceiveMess = (msg:any) => {
      this.logger.debug(msg);
  };
}
