import { createRealmContext } from '@realm/react';
import Realm from 'realm';
import { User } from './schemas/user.model';

console.log(
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n',
  'Realm db location :\n',
  Realm.defaultPath,
  '\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n',
);

export const realmConfig: Realm.Configuration = {
  schema: [User],
  schemaVersion: 1,
};

export const realmContext = createRealmContext(realmConfig);
