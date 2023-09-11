import { Injectable } from '@nestjs/common';
import { ChatHistoryManager } from "./model/chat-history-manager";
import { ChatOpenAI } from "langchain/chat_models/openai";
import * as process from "process";
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from "./model/chat-completion.answer.dto";

const DAFAULT_TEMPERATURE = 1
const DEFAULT_MODEL= "gpt-3.5-turbo"
@Injectable()
export class ChatCompletionApiService {
  private readonly chatHistory: ChatHistoryManager
  private readonly chat: ChatOpenAI

  constructor() {
    this.chatHistory = new ChatHistoryManager()
    this.chat = new ChatOpenAI({

      temperature: DAFAULT_TEMPERATURE,
      openAIApiKey: process.env.OPEN_API_KEY,
      modelName: DEFAULT_MODEL
    });
  }
  async getAiModelAnswer(data:GetChatCompletionAnswerInputDTO){
    this.chatHistory.addHumanMessage(data.message);
    const result = await this.chat.predictMessages(
      this.chatHistory.ChatHistory,
    );
    const aiMessage = result.content;
    this.chatHistory.addAiMessage(aiMessage);

    return GetChatCompletionAnswerOutputDTO.getInstance(aiMessage);
  }

}
