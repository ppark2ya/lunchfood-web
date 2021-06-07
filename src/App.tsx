import React from 'react';
import { isMobile } from 'react-device-detect';
import Browser from 'routes/Browser';
import Mobile from 'routes/Mobile';

function App() {
  return isMobile ? <Mobile /> : <Browser />;
}

export default App;
