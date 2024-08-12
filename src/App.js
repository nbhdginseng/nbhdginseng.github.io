import React, { useState } from "react";
import { Routes, Route, HashRouter, useNavigate, NavLink } from "react-router-dom";
import 'chart.js/auto';

import Home, { Title0 } from "./Home";
import Route1, { Title1 } from "./tasks/task1";
import Route2, { Title2 } from "./tasks/task2";
import Route3, { Title3 } from "./tasks/task3";
import Route4, { Title4 } from "./tasks/task4";
import Route5, { Title5 } from "./tasks/task5";
import Route7, { Title7 } from "./tasks/task7";
import Route8, { Title8 } from "./tasks/task8";
import Route9, { Title9 } from "./tasks/task9";

import "./App.css";

const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <div className="header">
          <div className="row">
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', alignItems: 'center' }}>
              <NavLink to="/" style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend', fontWeight: '700', textDecoration: 'none' }}>ABOUT</NavLink>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px', alignItems: 'center' }}>
              <b style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>TASKS</b>
              <Button1 />
              <Button2 />
              <Button3 />
              <Button4 />
              <Button5 />
              <Button7 />
              <Button8 />
              <Button9 />
            </div>
          </div>

          <b style={{ color: 'rgb(195, 205, 249)', fontSize: '16px', fontFamily: 'Lexend' }}>BPHO COMPUTATIONAL CHALLENGE</b>
          <br />
          <Routes>
            <Route path="/" element={<Title0 />} />
            <Route path="/route1" element={<Title1 />} />
            <Route path="/route2" element={<Title2 />} />
            <Route path="/route3" element={<Title3 />} />
            <Route path="/route4" element={<Title4 />} />
            <Route path="/route5" element={<Title5 />} />
            <Route path="/route7" element={<Title7 />} />
            <Route path="/route8" element={<Title8 />} />
            <Route path="/route9" element={<Title9 />} />
          </Routes>
        </div>

        <br />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/route1" element={<Route1 />} />
          <Route path="/route2" element={<Route2 />} />
          <Route path="/route3" element={<Route3 />} />
          <Route path="/route4" element={<Route4 />} />
          <Route path="/route5" element={<Route5 />} />
          <Route path="/route7" element={<Route7 />} />
          <Route path="/route8" element={<Route8 />} />
          <Route path="/route9" element={<Route9 />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

const Button1 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/route1'); 
  };

  return <button className='button1' onClick={handleClick}>1</button>; 
};

const Button2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/route2'); 
  };

  return <button className='button1' onClick={handleClick}>2</button>; 
};

const Button3 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/route3'); 
  };

  return <button className='button1' onClick={handleClick}>3</button>; 
};

const Button4 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/route4'); 
  };

  return <button className='button2' onClick={handleClick}>4 & 6</button>; 
};

const Button5 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/route5'); 
  };

  return <button className='button1' onClick={handleClick}>5</button>; 
};

const Button7 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/route7'); 
  };

  return <button className='button1' onClick={handleClick}>7</button>; 
};

const Button8 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/route8'); 
  };

  return <button className='button1' onClick={handleClick}>8</button>; 
};

const Button9 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/route9'); 
  };

  return <button className='button1' onClick={handleClick}>9</button>; 
};

export default App;
