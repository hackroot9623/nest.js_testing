import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

@Controller('users') // it will handle  the route "/users"
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id); //the +id is to convert the string to a number
  }
  @Post()
  create(@Body(ValidationPipe) user: CreateUserDTO) {
    return this.usersService.create(user);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDTO: UpdateUserDTO,
  ) {
    return this.usersService.update(id, updateUserDTO);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
