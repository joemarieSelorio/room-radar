import { EntitySchema } from 'typeorm';
import { User } from './user.entity';

export const UserSchema = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
      length: 25,
    },
    lastName: {
      type: String,
      length: 25,
    },
    email: {
      type: String,
    },
  },
});
