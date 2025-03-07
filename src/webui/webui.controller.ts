import {
  BadRequestException,
  Controller,
  Get,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { WebuiService } from './webui.service';
import { Readable } from 'node:stream';

function webStreamToNodeStream(webStream: ReadableStream) {
  const nodeStream = new Readable({
    read() {},
  });
  const reader = webStream.getReader();
  const pushData = () => {
    reader
      .read()
      .then(({ done, value }) => {
        if (done) {
          nodeStream.push(null);
          return;
        }
        if (!nodeStream.push(value)) {
          // 如果 push 返回 false，说明消费者速度太慢，需要暂停读取
          nodeStream.once('drain', pushData);
        } else {
          pushData();
        }
      })
      .catch((err) => {
        // 如果读取过程中出错, 关闭流
        nodeStream.destroy(err);
      });
  };
  pushData();
  return nodeStream;
}

@Controller('webui')
export class WebuiController {
  constructor(private readonly webuiService: WebuiService) {}
  @Get()
  @Header('Content-Type', 'text/html')
  async Index2(): Promise<StreamableFile> {
    // 代理页面 http://127.0.0.1:7860/
    const resp = await fetch('http://127.0.0.1:7860/');
    if (!resp.ok) {
      throw new BadRequestException();
    }
    return new StreamableFile(webStreamToNodeStream(resp.body));
  }

  async Index(): Promise<StreamableFile> {
    // 代理页面 http://127.0.0.1:7860/
    const resp = await fetch('http://127.0.0.1:7860/');
    if (!resp.ok) {
      throw new BadRequestException();
    }
    return new StreamableFile(Readable.fromWeb(resp.body));
  }
}
