import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HttpModule } from '@nestjs/axios';
import { ChatuService } from 'src/chatu/chatu.service';

@Module({
  imports: [HttpModule],
  controllers: [ChatController],
  providers: [ChatService, ChatuService]
})
export class ChatModule {}
