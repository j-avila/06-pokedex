import ImageColors from 'react-native-image-colors';

export const getColorFromIamge = async (image: string) => {
  const fallBackColor = 'grey';

  const color = await ImageColors.getColors(image, {
    fallback: fallBackColor,
    cache: true,
    key: image,
  });

  switch (color.platform) {
    case 'android':
      return color.dominant || fallBackColor;
    case 'ios':
      return color.background || fallBackColor;
    default:
      return fallBackColor;
  }
};
