import { Module, Global } from "@nestjs/common";

export const config = {
    provide: 'Config',
    useValue: {
        code: "200ssssd",
    }
}

@Global()
@Module({
    providers: [
        config
    ],
    exports: [
        config
    ]
})

export class ConfigModule {}