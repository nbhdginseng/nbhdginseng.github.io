import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";

export const Title4 = () => {
    return (
      <div>
        <b className="title">task 4 & 6</b>
        <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>comparing a configured trajectory to that which maximises the horizontal range, given the same launch height and speed</p>
      </div> 
    );
};

const Task4 = (deg, g, u, h) => {

    // define constants    
    let theta = deg * (Math.PI / 180);
    let theta_max = Math.asin(1 / Math.sqrt(2 + (2 * g * h) / (u**2)))

    let R = (u**2 / g) * (Math.sin(theta) * Math.cos(theta) + Math.cos(theta) * Math.sqrt((Math.sin(theta))**2 + (2 * g * h) / (u**2)));
    let R_max = (u**2 / g) * (Math.sqrt(1 + (2 * g * h ) / (u**2)))

    const func_x = (x_start, x_stop, x_card) => {
        let x_arr = [];
        let x_step = (x_stop - x_start) / (x_card - 1);
        for (let i = 0; i < x_card; i++) {
            x_arr.push(x_start + (x_step * i));
        }
        return x_arr;
    };
    
    let x_arr = func_x(0,R,150);
    let x_max_arr = func_x(0,R_max,150);

    const func_y = (x_arr, theta) => {
        let y_arr = x_arr.map(x => h + x * Math.tan(theta) - (g / (2 * (u**2))) * (1 + (Math.tan(theta))**2) * (x**2));
        return y_arr; 
    };

    let y_arr = func_y(x_arr, theta);
    let y_max_arr = func_y(x_max_arr, theta_max)

    const func_s = (theta, R) => {
        let a = (u**2) / (g * (1 + (Math.tan(theta))**2));
        let b = Math.tan(theta);
        let c = Math.tan(theta) - g * R * (1 + (Math.tan(theta))**2 ) / (u**2);
        let m_1 = 0.5 * Math.log(Math.abs(Math.sqrt(1 + b**2) + b)) + 0.5 * b * Math.sqrt(1 + b**2);
        let m_2 = 0.5 * Math.log(Math.abs(Math.sqrt(1 + c**2) + c)) + 0.5 * c * Math.sqrt(1 + c**2); 
        let s = a * (m_1 - m_2);

        return s;
    };

    let s = func_s(theta, R);
    let s_max = func_s(theta_max, R_max);

    const func_xa = (theta) => {
        let xa = (u**2) * Math.sin(2 * theta) / (2 * g);

        return xa;
    }

    let xa = func_xa(theta)
    let xa_max = func_xa(theta_max)

    const func_ya = (theta) => {
        let ya = h + ((u**2) / (2 * g)) * Math.sin(theta)**2;

        return ya; 
    }

    let ya = func_ya(theta);
    let ya_max = func_ya(theta_max);

    return { x_arr, y_arr, x_max_arr, y_max_arr, xa, ya, xa_max, ya_max, s, s_max }
}

const Slider4 = ({ sliderValues, handleSliderChange }) => {
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

  class Chart4 extends Component {
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
                  label: 'CT Apogee',
                  data: [{ x: data.xa, y: data.ya }],
                  pointBorderColor: 'rgba(60, 94, 237, 1)',
                  pointStyle: 'star',
                  pointRadius: 7
                },
                {
                    label: 'Maximum Horizontal Range Trajectory',
                    data: data.x_max_arr.map((x, i) => ({ x, y: data.y_max_arr[i] })),
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 2,
                    showLine: true,
                },
                {
                    label: 'MHRT Apogee',
                    data: [{ x: data.xa_max, y: data.ya_max }],
                    pointBorderColor: 'rgba(255, 99, 132, 1)',
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
  
  
  class Route4 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sliderValues: { deg: 60, g: 9.81, u: 10, h: 2 },
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
      const { x_arr, y_arr, x_max_arr, y_max_arr, xa, ya, xa_max, ya_max, s, s_max } = Task4(sliderValues.deg, sliderValues.g, sliderValues.u, sliderValues.h);
  
      return (
        <div className="wrapper">
          <div className='row'>
            <div className='column'>
              <Chart4 data={{ x_arr, y_arr, x_max_arr, y_max_arr, xa, ya, xa_max, ya_max, s, s_max }} />
            </div>
            <div className='column'>
              <b style={{color: 'rgba(60, 94, 237, 1)'}}>DISTANCE TRAVELLED (CT): {s.toFixed(2)} m</b>
              <b style={{color: 'rgba(255, 99, 132, 1)'}}>DISTANCE TRAVELLED (MHRT): {s_max.toFixed(2)} m</b>
              <br />
              <br />
              <Slider4 sliderValues={sliderValues} handleSliderChange={this.handleSliderChange} className='slider'/>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Route4;
  