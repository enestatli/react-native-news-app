import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
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
        d="M368 415.86V72a24.07 24.07 0 00-24-24H72a24.07 24.07 0 00-24 24v352a40.12 40.12 0 0040 40h328"
        fill="none"
        stroke={props.color}
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        d="M416 464h0a48 48 0 01-48-48V128h72a24 24 0 0124 24v264a48 48 0 01-48 48z"
        fill="none"
        stroke={props.color}
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M240 128h64M240 192h64M112 256h192M112 320h192M112 384h192"
      />
      <Path d="M176 208h-64a16 16 0 01-16-16v-64a16 16 0 0116-16h64a16 16 0 0116 16v64a16 16 0 01-16 16z" />
    </Svg>
  );
}

export default SvgComponent;
