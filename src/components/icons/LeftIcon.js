import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
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
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        d="M328 112L184 256l144 144"
      />
    </Svg>
  );
}

export default SvgComponent;
