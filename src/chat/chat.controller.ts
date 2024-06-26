import { Controller, Post, Body, Inject, Headers } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatuService } from 'src/chatu/chatu.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatuService: ChatuService,
    private readonly chatService: ChatService
  ) {}

  /*headers {
  host: '172.18.0.6:3002',
  connection: 'close',
  'content-length': '719',
  'user-agent': 'python-requests/2.31.0',
  'accept-encoding': 'gzip, deflate, br',

  'content-type': 'application/json',
  'accept-charset': 'utf-8',
  authorization: 'Bearer ukZ4AAFg5EAGHIizmojiMth6Ksix2ofYJ7MWB3O5Ak5'
}
body {
  model: 'gpt-3.5',
  stream: true,
  temperature: 0.7,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 512,
  prompt: '你是一个聊天机器人，给用户合理的答案。\n' +
    'Here is the chat histories between human and assistant, inside <histories></histories> XML tags.\n' +
    '\n' +
    '<histories>\n' +
    'Human: 你好\n' +
    'Assistant: 你好！我是小微，有什么问题我可以帮助你解决呢？\n' +
    '</histories>\n' +
    '\n' +
    '\n' +
    '\n' +
    'Human: 天上飞的是什么\n' +
    '\n' +
    'Assistant: ',
  stop: [ '\nHuman:', '</histories>' ],
  user: '6a7c96a6-deb1-440e-9170-6d3617a5ec4e'
}
   */
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
