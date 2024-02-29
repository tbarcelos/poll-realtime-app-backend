import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsGateway } from './polls.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Option } from './entities/option.entity';
import { PollsController } from './polls.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Option])],
  providers: [PollsService, PollsGateway],
  controllers: [PollsController],
})
export class PollsModule {}
