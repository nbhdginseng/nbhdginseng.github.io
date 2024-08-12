import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";

export const Title3 = () => {
    return (
      <div>
        <b className="title">task 3</b>
        <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>calculating the low-ball and high-ball trajectories of an object passing through a fixed position, and the minimum speed required</p>
      </div> 
    );
};

const Task3 = (X, Y, g, u, h) => {

    const x = (x_start, x_stop, x_card) => {
        let x_arr = [];
        let x_step = (x_stop - x_start) / (x_card - 1);
        for (let i = 0; i < x_card; i++) {
            x_arr.push(x_start + (x_step * i));
        }
        return x_arr;
    };

    let x_arr = x(0, X, 200);

    const a = (g * X**2) / (2 * u**2);
    const b = -X;
    const c = Y - h + (g * X**2) / (2 * u**2);

    // high ball parabola
    const a_max = Math.atan((-b + Math.sqrt(b**2 - 4 * a * c)) / (2 * a));
    const y_max_arr = x_arr.map(x => h + x * Math.tan(a_max) - (g / (2 * (u**2))) * (1 + (Math.tan(a_max))**2) * (x**2));

    // low ball parabola
    const a_min = Math.atan((-b - Math.sqrt(b**2 - 4 * a * c)) / (2 * a));
    const y_min_arr = x_arr.map(x => h + x * Math.tan(a_min) - (g/(2 * (u**2))) * (1 + (Math.tan(a_min))**2) * (x**2));

    // lower bound for slider value
    const u_min = Math.ceil(Math.sqrt(g) * Math.sqrt(Y + Math.sqrt(X**2 + Y**2)))

    return { x_arr, y_max_arr, y_min_arr, u_min, X, Y };
}

const Slider3 = ({ sliderValues, handleSliderChange, u_min }) => {
    return (
      <div className="slider-font">
        <label>X COORDINATE (m): {sliderValues.X}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={sliderValues.X}
          onChange={(e) => handleSliderChange('X', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <label>Y COORDINATE (m): {sliderValues.Y}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={sliderValues.Y}
          onChange={(e) => handleSliderChange('Y', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <label>GRAVITY (g): {sliderValues.g}</label>
        <input
          type="range"
          min="0"
          max="20"
          value={sliderValues.g}
          onChange={(e) => handleSliderChange('g', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>INITIAL SPEED (u): {sliderValues.u}</label>
        <input
          type="range"
          min={u_min}
          max="200"
          value={sliderValues.u}
          onChange={(e) => handleSliderChange('u', parseFloat(e.target.value))}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>INITIAL HEIGHT (h): {sliderValues.h}</label>
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

  class Chart3 extends Component {
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
                  label: 'Configured Point',
                  data: [{ x: data.X, y: data.Y }],
                  pointBorderColor: 'rgba(4, 71, 131, 1)',
                  pointStyle: 'star', 
                  pointRadius: 7, 
                  showLine: false,
                },
                {
                  label: 'High-ball Trajectory',
                  data: data.x_arr.map((x, i) => ({ x, y: data.y_max_arr[i] })),
                  backgroundColor: 'rgba(60, 94, 237, 1)',
                  pointRadius: 2, 
                  showLine: true,

                },
                {
                  label: 'Low-ball Trajectory',
                  data: data.x_arr.map((x, i) => ({ x, y: data.y_min_arr[i]})),
                  backgroundColor: 'rgba(255, 99, 132, 1)', 
                  pointRadius: 2, 
                  showLine: true,
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
  
  
  class Route3 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sliderValues: { X: 1000, Y: 300, g: 9.81, u: 150, h: 0},
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
      const { x_arr, y_max_arr, y_min_arr, u_min, X, Y } = Task3(sliderValues.X, sliderValues.Y, sliderValues.g, sliderValues.u, sliderValues.h);
  
      return (
        <div className="wrapper">
          <div className='row'>
            <div className='column'>
              <Chart3 data={{ x_arr, y_max_arr, y_min_arr, X, Y }} />
            </div>
            <div className='column'>
              <Slider3 sliderValues={sliderValues} handleSliderChange={this.handleSliderChange} u_min ={u_min} className='slider'/>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Route3;
  