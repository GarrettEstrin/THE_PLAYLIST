import React from 'react';
import Header from './Header/Header';
import FooterContainer from './FooterContainer';
import ViewContainer from './ViewContainer/ViewContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <ViewContainer />
      <FooterContainer />
    </div>
  );
}

export default App;
