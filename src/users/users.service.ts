import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

// export type roles = 'admin' | 'user' | 'engenieer';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', role: 'admin', age: 12 },
    { id: 2, name: 'Jane Doe1', role: 'user', age: 10 },
    { id: 3, name: 'Jane Doe2', role: 'user', age: 20 },
    { id: 4, name: 'Jane Doe3', role: 'user', age: 30 },
    { id: 5, name: 'Jane Doe4', role: 'user', age: 40 },
  ];

  findAll(role?: string) {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException(`Users with Role ${role} not found`);
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDTO,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDTO: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (!user) throw new NotFoundException('user not found');
      if (user.id === id) {
        return { ...user, ...updateUserDTO };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.users.find((user) => user.id === id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
