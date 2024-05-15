import { Module } from '@nestjs/common';
import { CompletionsService } from './completions.service';
import { CompletionsController } from './completions.controller';
import { HttpModule } from '@nestjs/axios';
import { ChatuService } from 'src/chatu/chatu.service';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [CompletionsController],
  providers: [CompletionsService, ChatuService]
})
export class CompletionsModule {}
