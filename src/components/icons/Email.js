import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__ionicon"
      viewBox="0 0 512 512"
      width={props.size}
      height={props.size}
      {...props}
    >
      <Rect
        x={48}
        y={96}
        width={416}
        height={320}
        rx={40}
        ry={40}
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M112 160l144 112 144-112"
      />
    </Svg>
  );
}

export default SvgComponent;
