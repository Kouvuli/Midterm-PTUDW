import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import CreateNewGroup from './routes/CreateNewGroup';
import MyGroup from './routes/MyGroup';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/createGroup" element={<CreateNewGroup />}></Route>
        <Route exact path="/myGroup" element={<MyGroup />}></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
