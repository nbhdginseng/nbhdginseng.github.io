import React, { Component } from "react";
import './App.css'

export const Title0 = () => {
  return (
    <div>
      <b className="title">about</b>
      <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>information regarding the production of this web application</p>
    </div>

  )
}

class Home extends Component {
  render() {
    return (
      <div style={{color: 'rgba(4, 71, 131, 1)'}}>
        <br />
        <br />

        <row>
          <p style={{ textAlign: "center" }}>This web application was made with:</p>
        </row>

        <br />
        <br />
        <br />

        <div className="logo-container" >
          <div className="logo-item">
            <b>NODE.JS</b>
            <br />
            <img src={require("./images/nodejs.png")} className="logo"/>
            <br />
            <b>RUNTIME ENVIRONMENT</b>
            <p style={{color: 'rgba(66, 133, 244, 1)', fontWeight: '700'}}>BACKEND JS PLATFORM</p>
          </div>
          <div className="logo-item">
            <b>REACT.JS</b>
            <br />
            <img src={require("./images/reactjs.png")} className="logo"/>
            <br />
            <b>FRONTEND JS LIBRARY</b> 
            <p style={{color: 'rgba(66, 133, 244, 1)', fontWeight: '700'}}>BUILDING USER INTERFACES</p>
          </div>
          <div className="logo-item">
            <b>CHART.JS</b>
            <br />
            <img src={require("./images/chartjs.png")} className="logo"/>
            <br />
            <b>FRONTEND JS LIBRARY</b>
            <p style={{color: 'rgba(66, 133, 244, 1)', fontWeight: '700'}}>GRAPH PLOTTING</p>
          </div>      
        </div>

        <br />
        <br />
        <br />

        <p style={{ textAlign: "center", fontSize: '16px', }}>The source code can be found here: <a style={{color: 'rgba(66, 133, 244, 1)'}} href="https://github.com/nbhdginseng/nbhdginseng.github.io">Github Repository</a></p>
        
        
      </div>
      
    );
  }
}

export default Home;