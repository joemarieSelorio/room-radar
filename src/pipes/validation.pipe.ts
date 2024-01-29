import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorResponses = this.buildErrorMessages(errors);
      throw new BadRequestException({
        statusCode: 400,
        message: 'Input data validation failed',
        errors: errorResponses,
      });
    }
    return value;
  }

  private toValidate(metatype: new (...args: any[]) => any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildErrorMessages(errors: ValidationError[]): any[] {
    return errors.map((error) => ({
      field: error.property,
      message: Object.values(error.constraints).join(', '),
    }));
  }
}
