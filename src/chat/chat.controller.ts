import { Controller, Post, Body, Inject, Headers } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatuService } from 'src/chatu/chatu.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatuService: ChatuService,
    private readonly chatService: ChatService
  ) {}

  @Post("completions")
  async completions(@Body() body: any, @Headers() headers: any) {
    console.log('headers', headers);
    console.log('body', body);
    // gpt-3.5 gpt-4.0 gpt-3.5-16k gpt-4.0-turbo
    // 处理token
    let {authorization } = headers;
    if(!authorization){
        return {
            code: -1,
            message: 'authorization is required'
        }
    }

    // 获取token
    let token = authorization.split(' ')[1];
    if(!token){
        return {
            code: -1,
            message: 'token is required'
        }
    }

    let {prompt, model} = body;

    if(!prompt){
        return {
            code: -1,
            message: 'prompt is required'
        }
    }

    if(!model){
        model = 'gpt-3.5';
    }

    let modelArr = ['gpt-3.5', 'gpt-4.0', 'gpt-3.5-16k', 'gpt-4.0-turbo'];

    if(modelArr.indexOf(model) == -1){
        model = 'gpt-3.5';
    }

    let completion = await this.chatuService.getAsk({
        AccessToken: token,
        prompt: prompt,
        model: model
    });

    console.log('completion', completion);

    if (completion.code !== 0) {
        return completion;
    }

    return {
        id: completion.data.requestId,
        object: 'text_completion',
        // created: completion.data.created,
        model: completion.data.model,
        choices: [
            {
                text: completion.data.answer,
                index: 0,
                logprobs: null,
                finish_reason: 'stop'
            }
        ],
        usage: {
            // prompt_tokens: completion.data.prompt_tokens,
            // completion_tokens: completion.data.completion_tokens,
            total_tokens: completion.data.token
        }
    }
  }
}
