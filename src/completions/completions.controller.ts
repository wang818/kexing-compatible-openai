import { Controller, Post, Body, Headers } from '@nestjs/common';
import { CompletionsService } from './completions.service';
import { ChatuService } from 'src/chatu/chatu.service';
import { max } from 'rxjs';

@Controller('completions')
export class CompletionsController {
  constructor(
    private readonly completionsService: CompletionsService,
    private readonly chatuService: ChatuService
  ) {}

  @Post()
  async completions(@Body() body: any, @Headers() headers: any) {
    console.log('-----------');
    console.log("/completions")
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

    let {prompt, model, max_tokens, temperature} = body;

    max_tokens = max_tokens || 1024;

    temperature = temperature || 0.7;

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
        model: model,
        maxTokens: max_tokens,
        temperature: temperature
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
