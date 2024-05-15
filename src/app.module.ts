import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatuModule } from './chatu/chatu.module';
import { ConfigModule } from './config/config.module';
import { CompletionsModule } from './completions/completions.module';

@Module({
  imports: [
    ConfigModule,
    ChatModule,
    ChatuModule,
    CompletionsModule
  ]
})
export class AppModule {}
