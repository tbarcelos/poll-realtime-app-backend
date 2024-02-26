import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Poll } from './entities/poll.entity';

@WebSocketGateway()
export class PollsGateway {
  constructor(private readonly pollsService: PollsService) {}

  @SubscribeMessage('createPoll')
  create(@MessageBody() createPollDto: CreatePollDto): Promise<Poll> {
    return this.pollsService.create(createPollDto);
  }

  @SubscribeMessage('findAllPolls')
  findAll() {
    return this.pollsService.findAll();
  }

  @SubscribeMessage('findOnePoll')
  findOne(@MessageBody() id: number) {
    return this.pollsService.findOne(id);
  }

  @SubscribeMessage('updateOptionPoll')
  update(@MessageBody() updateOptionDto: UpdateOptionDto): Promise<Poll> {
    return this.pollsService.incrementVote(updateOptionDto);
  }

  @SubscribeMessage('removePoll')
  remove(@MessageBody() id: number) {
    return this.pollsService.remove(id);
  }
}
