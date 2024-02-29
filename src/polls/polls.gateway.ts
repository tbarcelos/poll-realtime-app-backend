import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Poll } from './entities/poll.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PollsGateway {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  sendVoteUpdate(updatedPoll: Poll) {
    return this.server.emit('voteUpdate', { data: updatedPoll });
    // console.log('Emitting voteUpdate event:', emit);
  }
}
