import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ChatuService } from './chatu.service';
import { ChatuController } from './chatu.controller';

@Module({
  imports: [HttpModule],
  controllers: [ChatuController],
  providers: [ChatuService],
  exports: [ ChatuService ]
})
export class ChatuModule {}
