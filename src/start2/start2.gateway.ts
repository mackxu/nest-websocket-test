import { WebSocketGateway } from '@nestjs/websockets';
import { Start2Service } from './start2.service';

@WebSocketGateway()
export class Start2Gateway {
  constructor(private readonly start2Service: Start2Service) {}
}
