import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 512 512"
      width={props.width}
      height={props.width}
      {...props}
    >
      <Path
        d="M160 164s1.44-33 33.54-59.46C212.6 88.83 235.49 84.28 256 84c18.73-.23 35.47 2.94 45.48 7.82C318.59 100.2 352 120.6 352 164c0 45.67-29.18 66.37-62.35 89.18S248 298.36 248 324"
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={40}
      />
      <Circle cx={248} cy={399.99} r={32} fill={props.color} />
    </Svg>
  );
}

export default SvgComponent;
