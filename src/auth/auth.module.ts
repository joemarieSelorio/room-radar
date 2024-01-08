import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({})
export class AuthModule {
  providers: [AuthService];
  controllers: [AuthController];
}
