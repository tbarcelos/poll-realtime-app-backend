// src/polls/polls.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollsService } from './polls.service';
import { PollNotFoundException } from './exceptions/poll-not-found.exception';
import { Poll } from './entities/poll.entity';
import { UpdateOptionDto } from './dto/update-option.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto): Promise<Poll> {
    return await this.pollsService.create(createPollDto);
  }

  @Get()
  async findAll(): Promise<Poll[]> {
    try {
      return await this.pollsService.findAll();
    } catch (error) {
      throw new PollNotFoundException();
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Poll> {
    const poll = await this.pollsService.findOne(id);
    if (!poll) {
      throw new PollNotFoundException();
    }
    return poll;
  }

  @Patch()
  async update(@Body() updateOptionDto: UpdateOptionDto): Promise<Poll> {
    return await this.pollsService.incrementVote(updateOptionDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.pollsService.remove(id);
  }
}
