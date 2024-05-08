import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { SrvRecord } from 'dns';

interface checkImageSize {
    with: number;
    height: number;
    model: string;
}


@Injectable()
export class ChatuService {

    constructor(
        private httpService: HttpService
        
        ) {}

    private readonly Host: string = 'https://api.chatuapi.com';

    private readonly AskPath: string = '/chat/ask'; // ask url path

    private readonly ChatStreamCreatePath: string = '/chat/stream/create'; // create chat stream url path

    private readonly ChatStreamPath: string = '/chat/stream'; // chat stream url path

    private readonly ChatSyncPath: string = '/chat/stream/sync'; // chat stream sync url path

    private readonly CreateImagePath: string = '/draw/createImage'; // create image 

    private readonly ImageResultPath: string = '/draw/checkResult'; // create image by base64

    private readonly imagesSize: any = {
        //1024x512, 896x512, 768x512, 683x512, 640x152, 512x512, 512x1024, 512x896, 512x768,  512x683,  512x640,
        "xl08": {
            w1024: [512],
            w896: [896],
            w768: [512],
            w683: [512],
            w640: [152],
            w512: [512, 1024, 896, 768, 683, 640]
        },
        //"1024x1024"，"1152x896"，"1216x832"，"1344x768"，"1536x640"，"640x1536"，"768x1344"，"832x1216"，"896x1152"
        "xl09": {
            w1024: [1024],
            w1152: [896],
            w1216: [832],
            w1344: [768],
            w1536: [640],
            w640: [1536],
            w768: [1344],
            w832: [1216],
            w896: [1152]
        },
        //"1024x1024"，"1152x896"，"1216x832"，"1344x768"，"1536x640"，"640x1536"，"768x1344"，"832x1216"，"896x1152"
        "xl10": {
            w1024: [1024],
            w1152: [896],
            w1216: [832],
            w1344: [768],
            w1536: [640],
            w640: [1536],
            w768: [1344],
            w832: [1216],
            w896: [1152]
        }
    };

    /**
     * 获取ask数据
     * @param data 参数
     * @returns 数据
     */
    async getAsk(data): Promise<any> {
        const response = await firstValueFrom(this.httpService.post(this.Host + this.AskPath, data));
        return response.data;
    }

    /**
     * 创建聊天流
     * @param data 参数
     * @returns 数据
     */
    async getChatStreamCreate(data): Promise<any> {
        const response = await firstValueFrom(this.httpService.post(this.Host + this.ChatStreamCreatePath, data));
        return response.data;
    }

    /**
     * 获取聊天流
     * @param data 参数
     * @returns 数据
     * @returns 数据
     * */
    async getChatStream(streamId): Promise<any> {
        return await firstValueFrom(this.httpService.get(this.Host + this.ChatStreamPath + "?streamId=" + streamId, {
            responseType: 'stream'
        }));
    }

    /**
     * 获取聊天流同步数据
     * @param data 参数
     * @returns 数据
     * @returns 数据
     * */
    async getChatSync(data): Promise<any> {
        const response = await firstValueFrom(this.httpService.post(this.Host + this.ChatSyncPath, data));
        return response.data;
    }

    /**
     * 创建图片
     * @param data 参数
     * @returns 数据
     * @returns 数据
     * */
    async getCreateImage(data): Promise<any> {
        const response = await firstValueFrom(this.httpService.post(this.Host + this.CreateImagePath, data));
        return response.data;
    }
    
    /**
     * 获取图片结果
     * @param data 参数
     * @returns 数据
     * @returns 数据
     * */
    async getImageResult(data): Promise<any> {
        const response = await firstValueFrom(this.httpService.post(this.Host + this.ImageResultPath, data));
        return response.data;
    }

    /**
     * 检查图片的尺寸
     * @param sizeObj 检查图片的尺寸
     * @returns boolean
     */
    checkImageSize(sizeObj: checkImageSize): boolean {
        // 检查模型
        if(this.imagesSize[sizeObj.model] == null) {
            return false;
        }

        // 检查宽度
        if(this.imagesSize[sizeObj.model]["w" + sizeObj.with] == null) {
            return false;
        }

        // 检查高度
        if(this.imagesSize[sizeObj.model]["w" + sizeObj.with].indexOf(sizeObj.height) == -1) {
            return false;
        }

        return true;
    }

}
