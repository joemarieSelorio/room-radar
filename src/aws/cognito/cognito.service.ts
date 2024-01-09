import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpResponse,
  ConfirmSignUpCommand,
  ConfirmSignUpResponse,
  ResendConfirmationCodeCommand,
  ResendConfirmationCodeResponse,
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
   * Cognito confirm sign up via verification code service
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

  /**
   * Cognito resend verfication code service
   * @param userName - user's username
   * @return - Promise<ResendConfirmationCodeResponse>
   */
  async resendConfirmationCode(
    userName: string,
  ): Promise<ResendConfirmationCodeResponse> {
    const method = '[resendConfirmationCode]';

    try {
      return this.cognito.send(
        new ResendConfirmationCodeCommand({
          ClientId: this.cognitoConfig.clientId,
          Username: userName,
        }),
      );
    } catch (error) {
      console.log(`${TAG} ${method} - error: ${error}`);
    }
  }
}
