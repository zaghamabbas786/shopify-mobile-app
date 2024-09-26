import React from 'react';
import {SvgXml} from 'react-native-svg';

const SvgComponent = ({uri, width, height, color,}) => {
  if (uri ) {
    const modifiedSvgData = color
      ? uri.replace(/stroke="[^"]*"/g, `stroke="${color}"`)
      : uri;
    return <SvgXml xml={modifiedSvgData} width={width} height={height} />;
  }
};

export default React.memo(SvgComponent);
