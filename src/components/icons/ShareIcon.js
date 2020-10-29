import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      className="prefix__ionicon"
      viewBox="0 0 512 512"
      width={props.size}
      height={props.size}
      {...props}
    >
      <Circle
        cx={128}
        cy={256}
        r={48}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Circle
        cx={384}
        cy={112}
        r={48}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Circle
        cx={384}
        cy={400}
        r={48}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M169.83 279.53l172.34 96.94m0-240.94l-172.34 96.94"
      />
    </Svg>
  );
}

export default SvgComponent;
