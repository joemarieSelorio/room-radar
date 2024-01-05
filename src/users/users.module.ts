import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({})
export class UsersModule {
  controllers: [UsersController];
  providers: [UsersService];
}
