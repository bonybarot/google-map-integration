import { Fragment } from 'react';
import { Image } from 'react-native';
import { useAppSelector } from '../../store';
import { themeSelector } from '../../store/reducers/theme.reducer';
import images from '../../assets/images';
import React from 'react';

const UserImage = ({ image, size }: { image?: string; size: number }) => {
  const { current } = useAppSelector(themeSelector);
  return (
    <Fragment>
      {image ? (
        <Image
          source={{ uri: image, cache: 'reload' }}
          style={{ height: size, width: size, borderRadius: size / 2 }}
        />
      ) : (
        <Image
          source={current.value === 'dark' ? images.userDark : images.userLight}
          style={{ height: size, width: size, borderRadius: size / 2 }}
        />
      )}
    </Fragment>
  );
};

export default UserImage;
