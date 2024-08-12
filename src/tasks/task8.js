import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";

export const Title8 = () => {
    return (
      <div>
        <b className="title">task 8</b>
        <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>using a numerical method to compute projectile trajectory, including the possibility of a bounce</p>
      </div> 
    );
};

const Task8 = (u, C, theta, h, g, N) => {
    // initialise arrays
    let x = [];
    let y = [];

    let t = 0;
    const dt = 0.005;

    let Nbounce = 1;

    let vx = u * Math.cos(theta * (Math.PI / 180));
    let vy = u * Math.sin(theta * (Math.PI / 180));

    x.push(0); 
    y.push(h); 

    while (Nbounce <= N) {
        vx = vx;
        vy = vy - g * dt;

        let x_next = x[x.length - 1] + vx * dt;
        let y_next = y[y.length - 1] + vy * dt - 0.5 * g * dt ** 2;

        t = t + dt;

        if (y_next < 0) {
            y_next = 0;
            vy = -C * vy;
            Nbounce++;
        }

        x.push(x_next);
        y.push(y_next);
    }
    
    return { x, y };
};

const Slider8 = ({ sliderValues, handleSliderChange }) => {
    return (
        <div className="slider-font">
            <label>INITIAL SPEED: {sliderValues.u} ms^-1</label>
            <input
            type="range"
            min="0"
            max="100"
            value={sliderValues.u}
            onChange={(e) => handleSliderChange('u', e.target.value)}
            style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
            />
            <br /> 
            <label>COEFFICIENT OF RESTITUTION: {sliderValues.C} </label>
            <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sliderValues.C}
            onChange={(e) => handleSliderChange('C', e.target.value)}
            style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
            />
            <br /> 
            <label>ANGLE: {sliderValues.theta} °</label>
            <input
            type="range"
            min="0"
            max="100"
            value={sliderValues.theta}
            onChange={(e) => handleSliderChange('theta', e.target.value)}
            style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
            />
            <br /> 
            <label>INITIAL HEIGHT: {sliderValues.h} m</label>
            <input
            type="range"
            min="0"
            max="100"
            value={sliderValues.h}
            onChange={(e) => handleSliderChange('h', e.target.value)}
            style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
            />
            <br /> 
            <label>GRAVITY: {sliderValues.g} kgms^-2</label>
            <input
            type="range"
            min="0"
            max="20"
            value={sliderValues.g}
            onChange={(e) => handleSliderChange('g', e.target.value)}
            style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
            />
            <br /> 
            <label>NUMBER OF BOUNCES: {sliderValues.N}</label>
            <input
            type="range"
            min="0"
            max="20"
            value={sliderValues.N}
            onChange={(e) => handleSliderChange('N', e.target.value)}
            style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
            />
        </div>
    );
};
  
  class Chart8 extends Component {
    render() {
      const { data } = this.props;
  
      return (
        <div>
          <row>
          <Scatter
            width={1000}
            height={550}
            data={{
              datasets: [{
                label: 'Configured Trajectory',
                data: data.x.map((x, i) => ({ x, y: data.y[i] })),
                backgroundColor: 'rgba(60, 94, 237, 1)',
                pointRadius: '1.7', 
                showLine: true
              }]
            }}
            options={{
              scales: {
                x: { 
                  min: 0, 
                  title: {
                    display: true, 
                    text: 'x/ m'
                  },
                },
                y: { 
                  min: 0, 
                  title: {
                    display: true, 
                    text: 'y/ m'
                  },
                }
              },

              plugins: {
                legend: {
                  display: true,
                  position: "right",
                  align: "center",
                  labels: {
                    usePointStyle: true,
                    color: "#006192",
                    borderRadius: 0
                  }
                }
              }
            }}
          />
          </row>
        </div>
      );
    }
  }
  
class Route8 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sliderValues: { u: 5, C: 0.7, theta: 45, h: 10, g: 9.81, N: 6 },
      };
    }
  
    handleSliderChange = (name, value) => {
      this.setState(prevState => ({
        sliderValues: {
          ...prevState.sliderValues,
          [name]: parseFloat(value),
        },  
      }));
    };
  
    render() {
      const { sliderValues } = this.state;
      const data = Task8(sliderValues.u, sliderValues.C, sliderValues.theta, sliderValues.h, sliderValues.g, sliderValues.N);
  
      return (
        <div className="wrapper">
          <div className='row'>
            <div className='column'>
              <Chart8 data={data} />
            </div>
            <div className='column'>
              <Slider8 sliderValues={sliderValues} handleSliderChange={this.handleSliderChange} className='slider'/>
            </div>
          </div>
        </div>
      );
    }
}

export default Route8;