import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 512 512"
      fill={props.color}
      {...props}
    >
      <Path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
    </Svg>
  );
}

export default SvgComponent;
