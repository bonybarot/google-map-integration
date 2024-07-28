import { Image, View } from 'react-native';
import { IReview } from '../../interfaces/review';
import images from '../../assets/images';
import { useEffect, useState } from 'react';
import { getRating } from '../../utils/helpers';
import EText from './EText';
import React from 'react';

const RatingList = ({
  reviews,
  size,
  gap,
}: {
  reviews: IReview[];
  size?: number;
  gap?: number;
}) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(getRating(reviews));
  }, [reviews]);

  const iconSize = size ? size : 12;

  const ratingView = Array.from({ length: 5 }, (_, index) => {
    if (index + 1 <= rating)
      return (
        <Image
          source={images.StarFill}
          style={{ height: iconSize, width: iconSize }}
        />
      );
    else {
      return (
        <Image
          source={images.StarBlank}
          style={{ height: iconSize, width: iconSize }}
        />
      );
    }
  });

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: gap ?? 0,
        alignItems: 'center',
        marginTop: 5,
      }}>
      {ratingView}
      <EText type={`r${iconSize - 2}`} style={{ marginLeft: 5 }}>
        {rating.toFixed(1)}
      </EText>
    </View>
  );
};

export default RatingList;
