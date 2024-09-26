import React from 'react';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';

const CustomRenderHtml = ({contentWidth, source, tagsStyles}) => {
  source.html = source?.html?.replace(/<p[^>]*>(.*?)<\/p>|<br\s*\/?>/gi, '$1');
  const systemFonts = [
    ...defaultSystemFonts,
    'Courier',
    'Arial',
    'Georgia',
    'Helvetica',
    'Impact',
    'Lucida',
    'Tahoma',
    'Times New Roman',
    'Trebuchet Ms',
    'Verdana',
  ];
  return (
    <RenderHTML
      contentWidth={contentWidth}
      source={source}
      systemFonts={systemFonts}
      tagsStyles={tagsStyles}
    />
  );
};

export default React.memo(CustomRenderHtml);
