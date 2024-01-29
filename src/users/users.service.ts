import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CognitoService } from 'src/aws/cognito/cognito.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cognitoService: CognitoService,
  ) {}
  private readonly users: IUser[] = [];

  async create(user: IUser) {
    this.users.push(user);
    return await this.cognitoService.cognitoSignUp(
      user.username,
      user.email,
      user.password,
    );
  }

  getAll() {
    return this.userRepository.find();
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
