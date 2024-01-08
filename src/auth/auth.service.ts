import { Injectable } from '@nestjs/common';
import { CognitoService } from 'src/aws/cognito/cognito.service';

@Injectable()
export class AuthService {
  constructor(private readonly cognitoService: CognitoService) {}

  async userSignUp(username: string, email: string, password: string) {
    return this.cognitoService.cognitoSignUp(username, email, password);
  }

  async userConfirmSignUp(username: string, confirmationCode: string) {
    return this.cognitoService.cognitoConfirmSignUp(username, confirmationCode);
  }
}
