import {View, Text, useWindowDimensions} from 'react-native';

const useScreenDimensions = () => {
  const {width, height} = useWindowDimensions();
  return {
    width,
    height,
    isPortrait: width < height,
  };
};

export {useScreenDimensions};
