import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 512 512" {...props}>
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 112v288M400 256H112"
      />
    </Svg>
  );
}

export default SvgComponent;
