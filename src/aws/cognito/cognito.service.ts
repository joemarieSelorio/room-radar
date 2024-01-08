import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpResponse,
  ConfirmSignUpCommand,
  ConfirmSignUpResponse,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoConfig } from './cognito.config';

const TAG = '[CognitoService]';

@Injectable()
export class CognitoService {
  private readonly cognito: CognitoIdentityProviderClient;
  constructor(private readonly cognitoConfig: CognitoConfig) {
    this.cognito = new CognitoIdentityProviderClient(cognitoConfig);
  }

  /**
   * Cognito sign up service
   * @param username - user's username
   * @param email - user's email
   * @param password user's password
   * @returns - Promise<SignUpResponse>
   */
  async cognitoSignUp(
    username: string,
    email: string,
    password: string,
  ): Promise<SignUpResponse> {
    const method = '[cognitoSignUp]';
    try {
      return this.cognito.send(
        new SignUpCommand({
          ClientId: this.cognitoConfig.clientId,
          Username: username,
          Password: password,
          UserAttributes: [
            {
              Name: 'email',
              Value: email,
            },
          ],
        }),
      );
    } catch (error) {
      console.log(`${TAG} ${method} - error: ${error}`);
    }
  }

  /**
   * Cognito sign up service
   * @param username - user's username
   * @param confirmationCode - confirmation code sent to user's email
   * @returns - Promise<ConfirmSignUpResponse>
   */
  async cognitoConfirmSignUp(
    userName: string,
    confirmationCode: string,
  ): Promise<ConfirmSignUpResponse> {
    const method = '[cognitoConfirmSignUp]';
    try {
      return this.cognito.send(
        new ConfirmSignUpCommand({
          ClientId: this.cognitoConfig.clientId,
          Username: userName,
          ConfirmationCode: confirmationCode,
        }),
      );
    } catch (error) {
      console.log(`${TAG} ${method} - error: ${error}`);
    }
  }
}
