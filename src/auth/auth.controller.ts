import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, VerifySignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.userSignUp(
      signUpDto.username,
      signUpDto.email,
      signUpDto.password,
    );
  }

  @Post('verify')
  async verify(@Body() verifySignUpDto: VerifySignUpDto) {
    return this.authService.userConfirmSignUp(
      verifySignUpDto.username,
      verifySignUpDto.confirmationCode,
    );
  }
}
