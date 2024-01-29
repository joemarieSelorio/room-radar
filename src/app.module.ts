import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CognitoModule } from './aws/cognito/cognito.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    CognitoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
