import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";

export const Title2 = () => {
  return (
    <div>
      <b className="title">task 2</b>
      <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>creating an analytical model using equations for projectile trajectory</p>
    </div> 
  );
};

const Task2 = (deg, g, u, h) => {

    // define constants
    const rad = deg * (Math.PI / 180);
    const R = (u**2 / g) * (Math.sin(rad) * Math.cos(rad) + Math.cos(rad) * Math.sqrt(Math.sin(rad)**2 + (2 * g * h) / (u**2)));

    // define horizontal and vertical components of distance 
    const x = (x_start, x_stop, x_card) => {
        let x_arr = [];
        let x_step = (x_stop - x_start) / (x_card - 1);
        for (let i = 0; i < x_card; i++) {
            x_arr.push(x_start + (x_step * i));
        }
        return x_arr;
    };

    let x_arr = x(0, R, 200);
    let y_arr = x_arr.map(x => h + x * Math.tan(rad) - (g / (2 * (u**2))) * (1 + (Math.tan(rad))**2) * (x**2));

    // define coordinates of apogee
    let xa = (u**2 / g) * Math.sin(rad) * Math.cos(rad);
    let ya = h + (u**2 / (2 * g)) * (Math.sin(rad))**2;

    return { x_arr, y_arr, xa, ya };

};

const Slider2 = ({ sliderValues, handleSliderChange }) => {
    return (
      <div className="slider-font">
        <label>ANGLE: {sliderValues.deg} °</label>
        <input
          type="range"
          min="0"
          max="90"
          value={sliderValues.deg}
          onChange={(e) => handleSliderChange('deg', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
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
        <label>INITIAL HEIGHT: {sliderValues.h} m</label>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValues.h}
          onChange={(e) => handleSliderChange('h', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
      </div>
    );
  };

  class Chart2 extends Component {
    render() {
      const { data } = this.props;
      return (
        <div>
          <Scatter
            width={1000}
            height={550}
            data={{
              datasets: [
                {
                  label: 'Configured Trajectory',
                  data: data.x_arr.map((x, i) => ({ x, y: data.y_arr[i] })),
                  backgroundColor: 'rgba(60, 94, 237, 1)',
                  pointRadius: 2,
                  showLine: true,
                },
                {
                  label: 'Apogee',
                  data: [{ x: data.xa, y: data.ya }],
                  pointBorderColor: 'rgba(60, 94, 237, 1)',
                  pointStyle: 'star',
                  pointRadius: 7
                }
              ]
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
        </div>
      );
    }
  }
  
  
  class Route2 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sliderValues: { deg: 42, g: 9.81, u: 10, h: 1 },
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
      const { x_arr, y_arr, xa, ya } = Task2(sliderValues.deg, sliderValues.g, sliderValues.u, sliderValues.h);
  
      return (
        <div className="wrapper">
          <div className='row'>
            <div className='column'>
              <Chart2 data={{ x_arr, y_arr, xa, ya }} />
            </div>
            <div className='column'>
              <Slider2 sliderValues={sliderValues} handleSliderChange={this.handleSliderChange} className='slider'/>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Route2;
  