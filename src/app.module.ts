import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatuModule } from './chatu/chatu.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    ChatModule,
    ChatuModule
  ]
})
export class AppModule {}
