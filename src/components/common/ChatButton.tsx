import { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  authSelector,
  createNewConversation,
} from '../../store/reducers/auth.reducer';
import { useAppDispatch, useAppSelector } from '../../store';
import { SCREENS } from '../../navigation/NavigationKeys';
import { NavigationProp } from '@react-navigation/native';

const ChatButton = ({
  children,
  toUserId,
  navigation,
}: {
  children: ReactElement;
  toUserId: number;
  navigation: NavigationProp<any>;
}) => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(authSelector);
  return (
    <TouchableOpacity
      onPress={async () => {
        const { payload } = await dispatch(createNewConversation(toUserId));
        if (payload) {
          const item = payload.data;
          let image: string | null = null;
          let name: string = '';
          let userId = 0;
          if (item.from !== userData?.id!) {
            image = item.fromUser.profileImage;
            name = item.fromUser.first_name;
            if (item.fromUser.last_name) {
              name = `${name} ${item.fromUser.last_name}`;
            }
            userId = item.fromUser.id;
          } else {
            image = item.toUser.profileImage;
            name = item.toUser.first_name;
            if (item.toUser.last_name) {
              name = `${name} ${item.toUser.last_name}`;
            }
            userId = item.toUser.id;
          }
          navigation.navigate(SCREENS.OpenChat, {
            id: item.id,
            name,
            image,
            userId: userId,
          });
        }
      }}>
      {children}
    </TouchableOpacity>
  );
};
export default ChatButton;
