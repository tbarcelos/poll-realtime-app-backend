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
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { UserDeletionException } from './exceptions/user-deletion.exception';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new UserAlreadyExistsException();
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new UserNotFoundException();
    }
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
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw new UserDeletionException();
    }
  }
}
