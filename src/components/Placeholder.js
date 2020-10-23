import React from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Placeholder = ({ children, ...props }) => {
  return <ShimmerPlaceHolder {...props}>{children}</ShimmerPlaceHolder>;
};

export default Placeholder;
