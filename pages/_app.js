import React from 'react';
import { WindowSizeProvider } from '../components/context/usewindowidth';

const App = ({ Component, pageProps }) => (
  <WindowSizeProvider >
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  </WindowSizeProvider>
);

export default App;
