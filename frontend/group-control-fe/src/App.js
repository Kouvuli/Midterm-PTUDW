import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateNewGroup from "./routes/Group/CreateNewGroup";
import GroupDetail from "./routes/Group/GroupDetail";
import MyGroup from "./routes/Group/MyGroup";
import Home from "./routes/Home";
import "./App.css";
import DashBoard from "./routes/Dashboard/DashBoard";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/createGroup" element={<CreateNewGroup />} />
      <Route exact path="/myGroup" element={<MyGroup />} />
      <Route exact path="/dashboard" element={<DashBoard />} />
      <Route path="/group">
        <Route path=":groupId" element={<GroupDetail />} />
      </Route>
      <Route />
    </Routes>
  </BrowserRouter>
);

export default App;
