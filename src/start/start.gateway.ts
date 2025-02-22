import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { StartService } from './start.service';
import { CreateStartDto } from './dto/create-start.dto';
import { UpdateStartDto } from './dto/update-start.dto';
import { Observable } from 'rxjs';

@WebSocketGateway()
export class StartGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly startService: StartService) {}

  afterInit() {
    console.log('start gateway init');
  }

  handleConnection() {
    console.log('start gateway connection');
  }

  handleDisconnect() {
    console.log('start gateway disconnect');
  }

  @SubscribeMessage('createStart')
  create(@MessageBody() createStartDto: CreateStartDto) {
    return this.startService.create(createStartDto);
  }

  @SubscribeMessage('findAllStart')
  findAll() {
    return this.startService.findAll();
  }

  @SubscribeMessage('findOneStart')
  findOne(@MessageBody() id: number) {
    // 异步返回
    return new Observable((observer) => {
      observer.next({
        event: 'dongdong',
        data: `Hello World ${id}`,
      });

      setTimeout(() => {
        observer.next({
          event: 'dongdong',
          data: `Hello World ${id}`,
        });
      }, 1000);
      setTimeout(() => {
        observer.next({
          event: 'dongdong',
          data: `Hello World ${id}`,
        });
      }, 2000);
    });
  }

  @SubscribeMessage('updateStart')
  update(@MessageBody() updateStartDto: UpdateStartDto) {
    return this.startService.update(updateStartDto.id, updateStartDto);
  }

  @SubscribeMessage('removeStart')
  remove(@MessageBody() id: number) {
    return this.startService.remove(id);
  }
}
