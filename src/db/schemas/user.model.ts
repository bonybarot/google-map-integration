import { IUser } from '../../interfaces/conversation';
import { Schema } from '../../interfaces/schema.interface';

export class User extends Realm.Object<IUser> {
  id: number;
  first_name: string;
  last_name: string | null;
  profileImage: string | null;

  public static schema: Schema<IUser> = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'int',
      first_name: 'string',
      last_name: 'string?',
      profileImage: 'string?',
    },
  };
}
