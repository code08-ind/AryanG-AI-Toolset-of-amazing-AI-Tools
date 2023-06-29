import React from 'react';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Error from './pages/Error';
import Images from './pages/Images';
import Queries from './pages/Queries';
import Variations from './pages/Variations';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/images" element={<Images />} />
        <Route path="/generateImageVariations" element={<Variations />} />
        <Route path="/generateQueries" element={<Queries />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;