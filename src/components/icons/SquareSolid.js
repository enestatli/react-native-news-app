import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="currentColor"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path d="M416 464H96a48.05 48.05 0 01-48-48V96a48.05 48.05 0 0148-48h320a48.05 48.05 0 0148 48v320a48.05 48.05 0 01-48 48z" />
    </Svg>
  );
}

export default SvgComponent;
