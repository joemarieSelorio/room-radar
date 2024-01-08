import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CognitoService } from './aws/cognito/cognito.service';
import { CognitoModule } from './aws/cognito/cognito.module';
import { CognitoConfig } from './aws/cognito/cognito.config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CognitoModule, AuthModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    AppService,
    AuthService,
    CognitoService,
    CognitoConfig,
    UsersService,
  ],
})
export class AppModule {}
