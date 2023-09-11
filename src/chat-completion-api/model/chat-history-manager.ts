import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  BaseMessage
} from "langchain/schema";

export class ChatHistoryManager{
  readonly  ChatHistory: BaseMessage[];

  constructor(systemMessage?: string) {
    this.ChatHistory = [];

    if (systemMessage) {
      this.addSystemMessage(systemMessage);
    }
  }

  private addSystemMessage(message: string) {
    this.ChatHistory.push(new SystemMessage(message));
  }

  addAiMessage(message: string) {
    this.ChatHistory.push(new AIMessage(message));
  }

  addHumanMessage(message: string){
    this.ChatHistory.push(new HumanMessage(message));
  }
}