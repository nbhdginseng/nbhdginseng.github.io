import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";

export const Title1 = () => {
  return (
    <div>
      <b className="title">task 1</b>
      <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>creating a simple, drag-free projectile motion model</p>
    </div> 
  );
};

const Task1 = (deg, g, u, h) => {
  const rad = deg * (Math.PI / 180);
  const ux = u * Math.cos(rad);
  const uy = u * Math.sin(rad);

  const t = (t_start, t_stop, t_card) => {
    let t_arr = [];
    let t_step = (t_stop - t_start) / (t_card - 1);
    for (let i = 0; i < t_card; i++) {
      t_arr.push(t_start + (t_step * i));
    }
    return t_arr;
  }

  let t_arr = t(0, 10, 400);

  const vx = ux;
  let vy_arr = t_arr.map(t => uy - g * t);

  let x_arr = t_arr.map(t => vx * t)
  let y_arr = t_arr.map(t => h + uy * t - 0.5 * g * t ** 2)

  return { x_arr, y_arr };
};

const Slider1 = ({ sliderValues, handleSliderChange }) => {
  return (
    <div className="slider-font">
      <label>ANGLE (θ): {sliderValues.deg}</label>
      <input
        type="range"
        min="0"
        max="90"
        value={sliderValues.deg}
        onChange={(e) => handleSliderChange('deg', e.target.value)}
        style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
      />
      <label>GRAVITY (g): {sliderValues.g}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValues.g}
        onChange={(e) => handleSliderChange('g', e.target.value)}
        style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
      />
      <br />
      <label>INITIAL SPEED (u): {sliderValues.u}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValues.u}
        onChange={(e) => handleSliderChange('u', e.target.value)}
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

// stores the data called by Chart1 as this.props

class Chart1 extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Scatter
          width={1000}
          height={550}
          data={{
            datasets: [{
              label: 'Configured Trajectory',
              data: data.x_arr.map((x, i) => ({ x, y: data.y_arr[i] })),
              backgroundColor: 'rgba(60, 94, 237, 1)',
              pointRadius: '2', 
              showLine: true
            }]
          }}
          options={{
            scales: {
              x: { 
                min: 0, 
                max: 50,
                title: {
                  display: true, 
                  text: 'x/ m'
                },
              },
              y: { 
                min: 0, 
                max: 30,
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

// the class "Route1" inherits all of the properties and methods from the "Component" class
// "constructor()" initialises an object with the parameter "props"
// "super()" calls the properties and methods of the parent constructor (in this case, the parameter "props")
// "this" refers to the object created by constructor() and its property, "state"
// defaults the starting values of the sliders


class Route1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValues: { deg: 45, g: 9.81, u: 20, h: 2 },
    };
  }

// function created with the parameters: name, value
// "[name]: parseFloat(value)" displays the parameter and its new slider value
// "[name]" used to display the first element of the array, "parseFloat" to convert strings into numeric values

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
    const { x_arr, y_arr } = Task1(sliderValues.deg, sliderValues.g, sliderValues.u, sliderValues.h);

// calls the object: "sliderValues," and calls the parameter of Slider1: "handleSliderChange," after any changes are stored
// properties are then unpacked in Slider1

    return (
      <div className="wrapper">
        <div className='row'>
          <div className='column'>
            <Chart1 data={{ x_arr, y_arr }} />
          </div>
          <div className='column'>
            <Slider1 sliderValues={sliderValues} handleSliderChange={this.handleSliderChange} className='slider'/>
          </div>
        </div>
      </div>
    );
  }
}

export default Route1;
