import { Controller, Get, Post, Inject, Body, Response, Query } from '@nestjs/common';
import { query } from 'express';
import { ChatuService } from './chatu.service';

@Controller('chatu')
export class ChatuController {
  constructor(
    private readonly chatuService: ChatuService
    
    ) {}

  // @Post('ask')
  // getAsk(@Body() body): any {

  //   const data = this.chatuService.getAsk({
  //     AccessToken: this.ChatuConfig.AccessToken,
  //     prompt: body.prompt
  //   });

  //   return data;
  // }

  // @Post('create')
  // getChatStreamCreate(@Body() body): any {
      
  //   const data = this.chatuService.getChatStreamCreate({
  //     AccessToken: this.ChatuConfig.AccessToken,
  //     prompt: body.prompt,
  //     conversionId: body.conversionId,
  //     sceneId: body.sceneId
  //   });

  //   return data;
  // }

  // @Get('stream')
  // getChatStream(@Query() query, @Response() res): any {
  //   res.set('Content-Type', 'text/event-stream');
  //   res.set('Cache-Control', 'no-cache');
  //   res.set('Connection', 'keep-alive');

  //   const response = this.chatuService.getChatStream(query.streamId);

  //   response.then(resp => {
  //     console.log(resp);
  //       // resp.data.on('error', data => {
  //       //     //res.write(data.toString())
  //       //     console.log(data.toString());
  //       // });

  //       resp.data.on('data', data => {
  //           res.write(data.toString())
  //           // console.log(data.toString());
  //       })

  //       resp.data.on('close', data => {
  //           //res.write(data.toString())
  //           console.log(data.toString());
  //           res.end();
  //       })
  //   })

  // }
}
