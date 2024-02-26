import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, isNumber } from 'class-validator';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Poll } from './entities/poll.entity';
import { Option } from './entities/option.entity';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollsRepository: Repository<Poll>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    if (isEmpty(createPollDto.title) || isEmpty(createPollDto.options))
      throw new BadRequestException({
        message: 'The title or options are invalid!',
      });

    const poll = new Poll();
    poll.title = createPollDto.title;
    poll.options = [];

    // Save the Poll instance to the database
    const savedPoll = await this.pollsRepository.save(poll);

    // Use Promise.all to wait for all Option instances to be saved
    await Promise.all(
      createPollDto.options.map(async (item) => {
        const option = new Option();
        option.title = item;
        option.poll = savedPoll; // Associate the Option with the saved Poll
        option.votesCount = 0; // Initialize votesCount to 0

        // Save the Option instance to the database
        return this.optionRepository.save(option);
      }),
    );

    return await this.findOne(savedPoll.id);
  }

  findAll() {
    return this.pollsRepository.find({
      relations: {
        options: true,
      },
    });
  }

  findOne(id: number): Promise<Poll> {
    console.log('id', id);
    return this.pollsRepository.findOne({
      where: { id: id },
      relations: {
        options: true,
      },
    });
  }

  async incrementVote(updateOptionDto: UpdateOptionDto): Promise<Poll> {
    if (
      !isNumber(updateOptionDto.pollId) ||
      !isNumber(updateOptionDto.optionId)
    )
      throw new BadRequestException({
        message: 'The pollId or optionId are invalid!',
      });

    if (
      await this.optionRepository.increment(
        { id: updateOptionDto.optionId },
        'votesCount',
        1,
      )
    )
      return await this.findOne(updateOptionDto.pollId);
  }

  remove(id: number) {
    this.pollsRepository.delete(id);
  }
}
