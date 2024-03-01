// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOneByUserId(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOneByUserId(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  @Get(':username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(id);
  }
}
