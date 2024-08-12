import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";

export const Title9 = () => (
    <div>
        <b className="title">task 9</b>
        <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>creating a simple, drag-free projectile motion model that accounts for air resistance</p>
    </div>
);

const Task9 = (deg, g, u, h, c, rho, a, m) => {
    const rad = deg * (Math.PI / 180);
    let dt = 0.01;
    const k = (0.5 * c * rho * a) / m;

    const x = [0];
    const y = [h];
    const t = [0];
    const vx = [u * Math.cos(rad)];
    const vy = [u * Math.sin(rad)];
    const v = [Math.sqrt(vx[0] ** 2 + vy[0] ** 2)];

    while (y[y.length - 1] >= 0) {
        let ax = -k * v[v.length - 1] * vx[v.length - 1];
        let ay = -g - k * v[v.length - 1] * vy[v.length - 1];

        let vx_next = vx[vx.length - 1] + ax * dt;
        let vy_next = vy[vy.length - 1] + ay * dt;
        let v_next = Math.sqrt(vx_next ** 2 + vy_next ** 2);

        let x_next = x[x.length - 1] + vx[vx.length - 1] * dt;
        let y_next = y[y.length - 1] + vy[vy.length - 1] * dt;

        vx.push(vx_next);
        vy.push(vy_next);
        v.push(v_next);
        x.push(x_next);
        y.push(y_next);
        t.push(t[t.length - 1] + dt);
    }

    return { x, y, t, vx, vy, v };
};

const Slider9 = ({ sliderValues, handleSliderChange }) => (
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
        <br /> 
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
          max="20"
          value={sliderValues.u}
          onChange={(e) => handleSliderChange('u', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>INITIAL HEIGHT (h): {sliderValues.h}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={sliderValues.h}
          onChange={(e) => handleSliderChange('h', parseFloat(e.target.value))}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>DRAG COEFFICIENT (C): {sliderValues.c}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValues.c}
          onChange={(e) => handleSliderChange('c', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>AIR DENSITY (ρ): {sliderValues.rho}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={sliderValues.rho}
          onChange={(e) => handleSliderChange('rho', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>CROSS-SECTIONAL AREA (A): {sliderValues.a}</label>
        <input
          type="range"
          min="0"
          max="0.01"
          step="0.0001"
          value={sliderValues.a}
          onChange={(e) => handleSliderChange('a', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>MASS (m): {sliderValues.m}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValues.m}
          onChange={(e) => handleSliderChange('m', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
    </div>
);

class Chart9 extends Component {
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
                            data: data.x.map((x, i) => ({ x, y: data.y[i] })),
                            backgroundColor: 'rgba(60, 94, 237, 1)',
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
                                text: 't/ s'
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
            <Scatter
                width={825}
                height={550}
                data={{
                    datasets: [
                        {
                            label: 'Configured Trajectory',
                            data: data.t.map((x, i) => ({ x, y: data.y[i] })),
                            backgroundColor: 'rgba(60, 94, 237, 1)',
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
                                text: 'vx/ ms'
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
            <Scatter
                width={825}
                height={550}
                data={{
                    datasets: [
                        {
                            label: 'Configured Trajectory',
                            data: data.vx.map((x, i) => ({ x, y: data.y[i] })),
                            backgroundColor: 'rgba(60, 94, 237, 1)',
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
                                text: 'vy/ ms'
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
            <Scatter
                width={825}
                height={550}
                data={{
                    datasets: [
                        {
                            label: 'Configured Trajectory',
                            data: data.vy.map((x, i) => ({ x, y: data.y[i] })),
                            backgroundColor: 'rgba(60, 94, 237, 1)',
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
                                text: 'v/ ms'
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
                width={825}
                height={550}
                data={{
                    datasets: [
                        {
                            label: 'Configured Trajectory',
                            data: data.v.map((x, i) => ({ x, y: data.y[i] })),
                            backgroundColor: 'rgba(60, 94, 237, 1)',
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
        )
    };
}

class Route9 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sliderValues: { deg: 30, g: 9.81, u: 20, h: 2, c: 0.47, rho: 1, a: 0.007854, m: 0.1},
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
      const data = Task9(sliderValues.deg, sliderValues.g, sliderValues.u, sliderValues.h, sliderValues.c, sliderValues.rho, sliderValues.a, sliderValues.m);
  
      return (
        <div className="wrapper">
          <div className='row'>
            <div className='column'>
              <Chart9 data={data} />
            </div>
            <div className='column'>
              <Slider9 sliderValues={sliderValues} handleSliderChange={this.handleSliderChange} className='slider'/>
            </div>
          </div>
        </div>
      );
    }
}

export default Route9;
