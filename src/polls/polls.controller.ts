import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Poll } from './entities/poll.entity';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto): Promise<Poll> {
    return this.pollsService.create(createPollDto);
  }

  @Get()
  findAll(): Promise<Poll[]> {
    return this.pollsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Poll> {
    return this.pollsService.findOne(id);
  }

  @Patch()
  update(@Body() updateOptionDto: UpdateOptionDto): Promise<Poll> {
    return this.pollsService.incrementVote(updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pollsService.remove(id);
  }
}
