import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [];

  create(user: IUser) {
    this.users.push(user);
  }

  getAll() {
    return this.users;
  }

  getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updatedUserDetails: IUser) {
    const user = this.getById(id);
    if (user) {
      const index = this.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        this.users[index] = updatedUserDetails;
        return this.users[index];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
