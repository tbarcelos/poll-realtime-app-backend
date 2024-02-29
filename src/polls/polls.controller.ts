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
import { PollAlreadyExistsException } from './exceptions/poll-already-exists.exception';
import { PollDeletionException } from './exceptions/poll-deletion.exception';
import { Poll } from './entities/poll.entity';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InvalidPollInputException } from './exceptions/invalid-poll-input.exception';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto): Promise<Poll> {
    try {
      return await this.pollsService.create(createPollDto);
    } catch (error) {
      throw new PollAlreadyExistsException();
    }
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
    try {
      return await this.pollsService.incrementVote(updateOptionDto);
    } catch (error) {
      throw new InvalidPollInputException();
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      return await this.pollsService.remove(id);
    } catch (error) {
      throw new PollDeletionException();
    }
  }
}
