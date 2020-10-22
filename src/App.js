import React from 'react';

import { ThemeProvider } from './context';
import Providers from './navigation';

const App = () => {
  return (
    <ThemeProvider>
      <Providers />
    </ThemeProvider>
  );
};

export default App;
