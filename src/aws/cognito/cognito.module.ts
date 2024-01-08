import { Module } from '@nestjs/common';

import { CognitoService } from './cognito.service';
import { CognitoConfig } from './cognito.config';

@Module({
  providers: [CognitoService, CognitoConfig],
})
export class CognitoModule {}
