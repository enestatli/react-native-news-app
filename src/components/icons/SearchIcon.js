import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 512 512" {...props}>
      <Path
        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
        fill="none"
        stroke={props.color}
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M338.29 338.29L448 448"
      />
    </Svg>
  );
}

export default SvgComponent;
