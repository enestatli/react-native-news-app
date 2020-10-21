import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 512 512"
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zm56.56-56.56l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z"
      />
    </Svg>
  );
}

export default SvgComponent;
