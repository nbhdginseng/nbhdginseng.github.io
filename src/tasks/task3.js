import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";

export const Title3 = () => {
    return (
      <div>
        <b className="title">task 3 & 5</b>
        <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>calculating the bounding, minimum speed, maximum horizontal range (MHR), high-ball and low-ball trajectories of an object passing through a fixed position</p>
      </div> 
    );
};

const Task3 = (X, Y, g, u, h) => {

    // define constants
    const a = (g * X**2) / (2 * u**2);
    const b = -X;
    const c = Y - h + (g * X**2) / (2 * u**2);

    const x = (x_start, x_stop, x_card) => {
        let x_arr = [];
        let x_step = (x_stop - x_start) / (x_card - 1);
        for (let i = 0; i < x_card; i++) {
            x_arr.push(x_start + (x_step * i));
        }
        return x_arr;
    };

    let R_max = (u**2 / g) * (1 + (2 * g * h / u**2))
    let x_arr = x(0, R_max, 300);

    // high ball parabola
    let a_high = Math.atan((-b + Math.sqrt(b**2 - 4 * a * c)) / (2 * a));
    let y_high = x_arr.map(x => h + x * Math.tan(a_high) - (g / (2 * (u**2))) * (1 + (Math.tan(a_high))**2) * (x**2));

    // low ball parabola
    let a_low = Math.atan((-b - Math.sqrt(b**2 - 4 * a * c)) / (2 * a));
    let y_low = x_arr.map(x => h + x * Math.tan(a_low) - (g / (2 * (u**2))) * (1 + (Math.tan(a_low))**2) * (x**2));

    // minimum speed (u) parabola
    let a_umin = Math.atan((Y + Math.sqrt(X**2 + Y**2)) / (X));
    let y_umin = x_arr.map(x => x * ((Y + Math.sqrt(X**2 + Y**2))/(X)) - (Math.sqrt(X**2 + Y**2)/(X**2))*(x**2));

    // bounding parabola 
    let y_bound = x_arr.map(x => (u**2) / (2 * g) - (g / (2 * u**2)) * (x**2));

    // max range
    let a_rmax = Math.asin( 1 / (Math.sqrt(2 + (2 * g * h) / u**2)))
    let y_rmax = x_arr.map(x => h + x * Math.tan(a_rmax) - (g / (2 * (u**2))) * (1 + (Math.tan(a_rmax))**2) * (x**2));

    // lower bound for slider value
    const u_min = Math.ceil(Math.sqrt(g) * Math.sqrt(Y + Math.sqrt(X**2 + Y**2)))

    return { x_arr, y_high, y_low, y_umin, y_bound, y_rmax, u_min, X, Y }

}

const Slider3 = ({ sliderValues, handleSliderChange, u_min }) => {
    return (
      <div className="slider-font">
        <label>X COORDINATE: {sliderValues.x} m</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={sliderValues.x}
          onChange={(e) => handleSliderChange('x', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>Y COORDINATE: {sliderValues.y} m</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={sliderValues.y}
          onChange={(e) => handleSliderChange('y', e.target.value)}
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
        <label>INITIAL SPEED: {sliderValues.u} ms^-1</label>
        <input
          type="range"
          min={u_min}
          max="300"
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
                  data: data.x_arr.map((x, i) => ({ x, y: data.y_high[i]})),
                  backgroundColor: 'rgba(60, 94, 237, 1)',
                  pointRadius: 2, 
                  showLine: true,
                },
                {
                  label: 'Low-ball Trajectory',
                  data: data.x_arr.map((x, i) => ({ x, y: data.y_low[i]})),
                  backgroundColor: 'rgba(255, 99, 132, 1)', 
                  pointRadius: 2, 
                  showLine: true,
                },
                {
                  label: 'Minimum Speed Trajectory',
                  data: data.x_arr.map((x, i) => ({ x, y: data.y_umin[i]})),
                  backgroundColor: 'rgba(191, 0, 191, 1)',
                  pointRadius: '2', 
                  showLine: true,
                },
                {
                  label: 'Bounding Trajectory',
                  data: data.x_arr.map((x, i) => ({ x, y: data.y_bound[i]})),
                  backgroundColor: 'rgba(191, 191, 0, 1)',
                  pointRadius: '2', 
                  showLine: true,
                },
                {
                  label: 'MHR Trajectory',
                  data: data.x_arr.map((x, i) => ({ x, y: data.y_rmax[i]})),
                  backgroundColor: 'rgba(0, 191, 191  , 1)',
                  pointRadius: '2', 
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
        sliderValues: { x: 1000, y: 300, g: 9.81, u: 150, h: 0 },
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
      const { x_arr, y_high, y_low, y_umin, y_bound, y_rmax, u_min, X, Y } = Task3(sliderValues.x, sliderValues.y, sliderValues.g, sliderValues.u, sliderValues.h);
  
      return (
        <div className="wrapper">
          <div className='row'>
            <div className='column'>
              <Chart3 data={{ x_arr, y_high, y_low, y_umin, y_bound, y_rmax, X, Y }} />
            </div>
            <div className='column'>
              <Slider3 sliderValues={sliderValues} handleSliderChange={this.handleSliderChange} u_min={u_min} className='slider'/>
            </div>
          </div>
        </div>
      );
    }
  }
  
export default Route3;
  