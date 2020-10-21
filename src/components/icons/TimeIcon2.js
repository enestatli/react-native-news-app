import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      width={props.width}
      height={props.width}
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 232v-80"
      />
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        d="M256 88V72M132 132l-12-12"
      />
      <Circle
        cx={256}
        cy={272}
        r={32}
        fill="none"
        stroke={props.color}
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <Path
        d="M256 96a176 176 0 10176 176A176 176 0 00256 96z"
        fill="none"
        stroke={props.color}
        strokeMiterlimit={10}
        strokeWidth={32}
      />
    </Svg>
  );
}

export default SvgComponent;
