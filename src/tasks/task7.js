import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";

export const Title7 = () => {
  return (
    <div>
      <b className="title">task 7</b>
      <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>calculating the local maxima and minima of variations in projectile trajectory ranges</p>
    </div> 
  );
};

const Task7 = (g, u) => {

  // define constants
  let angles = [Math.PI / 6, Math.PI / 4, Math.PI / 3, (70.5 * Math.PI) / 180, (78 * Math.PI) / 180, (85 * Math.PI) / 180];

  const t = (t_start, t_stop, t_card) => {
      let t_arr = [];
      let t_step = (t_stop - t_start) / (t_card - 1);
      for (let i = 0; i < t_card; i++) {
          t_arr.push(t_start + (t_step * i));
      }
      return t_arr;
  };

  let t_arr = t(0, 2.5, 500);

  let result = angles.map((angle => {
    let sin_angle = Math.sin(angle);
    let cos_angle = Math.cos(angle);
    
    // initialise arrays
    let x_arr = [];
    let x_max = [];
    let x_min = [];
    
    let y_arr = [];
    let y_max = [];
    let y_min = [];
    
    let t_max = [];
    let t_min = [];
    
    let r_arr = [];
    let r_max = [];
    let r_min = [];

    for (let t_val of t_arr) {
        r_arr.push(Math.sqrt(u**2 * t_val**2 - g * t_val**3 * u * sin_angle + (g**2 * t_val**4) / 4));
        x_arr.push(u * t_val * cos_angle);
        y_arr.push(u * t_val * sin_angle - (g * t_val**2) / 2);
    }

    if (sin_angle >= (2 * Math.sqrt(2)) / 3) {
      let t_max_val = ((3 * u) / (2 * g)) * (sin_angle + Math.sqrt(sin_angle**2 - 8 / 9));
      let t_min_val = ((3 * u) / (2 * g)) * (sin_angle - Math.sqrt(sin_angle**2 - 8 / 9));

      t_max.push(t_max_val);
      t_min.push(t_min_val);

      r_max.push(Math.sqrt(u**2 * t_max_val**2 - g * t_max_val**3 * u * sin_angle + (g**2 * t_max_val**4) / 4));
      r_min.push(Math.sqrt(u**2 * t_min_val**2 - g * t_min_val**3 * u * sin_angle + (g**2 * t_min_val**4) / 4));

      x_max.push(u * t_max_val * cos_angle);
      x_min.push(u * t_min_val * cos_angle);

      y_max.push(u * t_max_val * sin_angle - (g * t_max_val**2) / 2);
      y_min.push(u * t_min_val * sin_angle - (g * t_min_val**2) / 2);
    }

    return { angle, x_arr, x_max, x_min, y_arr, y_max, y_min, t_arr, t_max, t_min, r_arr, r_max, r_min };

}));

return result;

};

const Slider7 = ({ sliderValues, handleSliderChange }) => {
  return (
    <div className="slider-font">
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
    </div>
  );
};

class Chart7 extends Component {
  render() {
    const { data, result } = this.props;
    const colors = [
      'rgba(0,0,255,1)',
      'rgba(0,127,0,1)',
      'rgba(255,0,0,1)',
      'rgba(0,191,191,1)',
      'rgba(191,0,191,1)',
      'rgba(191,191,0,1)',
    ];

    const dataset1 = data.flatMap((result, index) => (
      {
        label: `θ = ${(result.angle * 180 / Math.PI).toFixed(2)}°`,
        data: result.x_arr.map((x, i) => ({ x, y: result.y_arr[i] })),
        backgroundColor: colors[index % colors.length],
        pointRadius: 1.5,
        showLine: true
      }
    ));
    
    const dataset1_1 = data.flatMap((result, index) => [
      ...result.x_max.map((x, i) => ({
        label: 'Minimum',
        data: [{ x, y: result.y_max[i] }],
        pointBorderColor: 'rgba(0,0,0,1)',
        pointStyle: 'star',
        pointRadius: 6,
        showLine: false,
      })),

      ...result.x_min.map((x, i) => ({
        label: 'Maximum',
        data: [{ x, y: result.y_min[i] }],
        pointBorderColor: 'rgba(255,0,255,1)',
        pointStyle: 'star',
        pointRadius: 6,
        showLine: false,
      }))
    ]);

    const dataset2 = data.map((result, index) => (
      {
        label: `θ = ${(result.angle * 180 / Math.PI).toFixed(2)}°`,
        data: result.t_arr.map((x, i) => ({ x, y: result.r_arr[i] })),
        backgroundColor: colors[index % colors.length],
        pointRadius: 1.5,
        showLine: true
      }
    ));

    const dataset2_1 = data.flatMap((result, index) => [
      ...result.t_max.map((x, i) => ({
        label: 'Minimum',
        data: [{ x, y: result.r_max[i] }],
        pointBorderColor: 'rgba(0,0,0,1)',
        pointStyle: 'star',
        pointRadius: 6,
        showLine: false,
      })),

      ...result.t_min.map((x, i) => ({
        label: 'Maximum',
        data: [{ x, y: result.r_min[i] }],
        pointBorderColor: 'rgba(255,0,255,1)',
        pointStyle: 'star',
        pointRadius: 6,
        showLine: false,
      }))
    ]);

    return (
      <div>
        <row>
        <Scatter
          width={1000}
          height={550}
          data={{datasets: [...dataset2_1, ...dataset2]}}
          options={{
            scales: {
              x: { 
                min: 0, 
                title: {
                  display: true, 
                  text: 't/ s'
                },
              },
              y: { 
                min: -5, 
                title: {
                  display: true, 
                  text: 'range, r/ m'
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

        <Scatter
          width={1000}
          height={550}
          data={{datasets: [...dataset1_1, ...dataset1]}}
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
                min: -5, 
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


class Route7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValues: { g: 10, u: 10 },
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
    const data = Task7(sliderValues.g, sliderValues.u);

    return (
      <div className="wrapper">
        <div className='row'>
          <div className='column'>
            <Chart7 data={data} />
          </div>
          <div className='column'>
            <Slider7 sliderValues={sliderValues} handleSliderChange={this.handleSliderChange} className='slider'/>
          </div>
        </div>
      </div>
    );
  }
}

export default Route7;