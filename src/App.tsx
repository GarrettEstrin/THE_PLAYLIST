import React, { useEffect } from 'react';
import Header from './Header/Header';
import FooterContainer from './FooterContainer';
import ViewContainer from './ViewContainer/ViewContainer';
import { useAppContext } from './Utilities/AppContext';

function App() {
  const { htmlHeight } = useAppContext();
  useEffect(() => { 
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width,height='+htmlHeight+', initial-scale=1.0';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, [htmlHeight])
  return (
    <div className="App" style={{minHeight: htmlHeight, overflow: "hidden"}}>
      <Header />
      <ViewContainer />
      <FooterContainer />
    </div>
  );
}

export default App;
