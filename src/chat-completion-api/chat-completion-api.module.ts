import { Module } from '@nestjs/common';
import { ChatCompletionApiService } from './chat-completion-api.service';
import { ChatCompletionApiController } from './chat-completion-api.controller';

@Module({
  providers: [ChatCompletionApiService],
  controllers: [],
  exports: [ChatCompletionApiService]
})
export class ChatCompletionApiModule {}
