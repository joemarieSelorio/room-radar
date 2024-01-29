import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './user.schema';
import { CognitoService } from 'src/aws/cognito/cognito.service';
import { CognitoConfig } from 'src/aws/cognito/cognito.config';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [UsersService, CognitoService, CognitoConfig],
  exports: [UsersService],
})
export class UsersModule {}
