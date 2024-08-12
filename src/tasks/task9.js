import React, { Component } from "react";
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import "../App.css";
import { Task1 } from "./task1";

export const Title9 = () => (
    <div>
        <b className="title">task 9</b>
        <p style={{ color: 'rgb(255, 255, 255)', fontSize: '16px', fontFamily: 'Lexend' }}>creating simple, drag-free projectile motion models that account for air resistance</p>
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
      let ax = -k * vx[vx.length - 1] * v[v.length - 1];
      let ay = -g - k * vy[vy.length - 1] * v[v.length - 1];

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
        <label>ANGLE: {sliderValues.deg} °</label>
        <input
          type="range"
          min="0"
          max="90"
          value={sliderValues.deg}
          onChange={(e) => handleSliderChange('deg', e.target.value)}
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
        <label>AIR DENSITY: {sliderValues.rho} kgm−3</label>
        <input
          type="range"
          min="0"
          max="10"
          value={sliderValues.rho}
          onChange={(e) => handleSliderChange('rho', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
        <br /> 
        <label>CROSS-SECTIONAL AREA: {sliderValues.a} m^2</label>
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
        <label>MASS: {sliderValues.m} kg</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={sliderValues.m}
          onChange={(e) => handleSliderChange('m', e.target.value)}
          style={{ height: '50px', backgroundColor: 'rgb(240, 241, 245)', borderRadius: '25px' }}
        />
    </div>
);

class Chart9 extends Component {
    render() {
    const { data } = this.props;
    const [data1, data2] = data;

    return (
        <div>
            <Scatter
                width={1000}
                height={550}
                data={{
                    datasets: [
                      {
                        label: 'No Air Resistance',
                        data: data2.x_arr.map((x, i) => ({ x, y: data2.y_arr[i] })),
                        backgroundColor: 'rgba(60, 94, 237, 1)',
                        pointRadius: 2,
                        showLine: true,
                      },
                      {
                        label: 'Air Resistance',
                        data: data1.x.map((x, i) => ({ x, y: data1.y[i] })),
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
            <Scatter
                width={825}
                height={550}
                data={{
                    datasets: [
                      {
                        label: 'No Air Resistance',
                        data: data2.t_arr.map((x, i) => ({ x, y: data2.y_arr[i] })),
                        backgroundColor: 'rgba(60, 94, 237, 1)',
                        pointRadius: 2,
                        showLine: true,
                      },
                      {
                        label: 'Air Resistance',
                        data: data1.t.map((x, i) => ({ x, y: data1.y[i] })),
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
                        label: 'No Air Resistance',
                        data: data2.t_arr.map((x, i) => ({ x, y: data2.vx_arr[i] })),
                        backgroundColor: 'rgba(60, 94, 237, 1)',
                        pointRadius: 2,
                        showLine: true,
                      },
                      {
                        label: 'Air Resistance',
                        data: data1.t.map((x, i) => ({ x, y: data1.vx[i] })),
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
                            max: 5,
                            title: {
                                display: true,
                                text: 't/ s'
                            },
                        },
                        y: {
                            min: 0,
                            title: {
                                display: true,
                                text: 'vx/ ms^-1'
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
                        label: 'No Air Resistance',
                        data: data2.t_arr.map((x, i) => ({ x, y: data2.vy_arr[i] })),
                        backgroundColor: 'rgba(60, 94, 237, 1)',
                        pointRadius: 2,
                        showLine: true,
                      },
                      {
                        label: 'Air Resistance',
                        data: data1.t.map((x, i) => ({ x, y: data1.vy[i] })),
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
                                text: 't/ s'
                            },
                        },
                        y: {
                            min: -15,
                            title: {
                                display: true,
                                text: 'vy/ ms^-1'
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
                        label: 'No Air Resistance',
                        data: data2.t_arr.map((x, i) => ({ x, y: data2.v_arr[i] })),
                        backgroundColor: 'rgba(60, 94, 237, 1)',
                        pointRadius: 2,
                        showLine: true,
                      },
                      {
                        label: 'Air Resistance',
                        data: data1.t.map((x, i) => ({ x, y: data1.v[i] })),
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
                            max: 5,
                            title: {
                                display: true,
                                text: 't/ s'
                            },
                        },
                        y: {
                            min: 0,
                            title: {
                                display: true,
                                text: 'v/ ms^-1'
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
      const data1 = Task9(sliderValues.deg, sliderValues.g, sliderValues.u, sliderValues.h, sliderValues.c, sliderValues.rho, sliderValues.a, sliderValues.m);
      const data2 = Task1(sliderValues.deg, sliderValues.g, sliderValues.u, sliderValues.h);
      const data = [data1, data2];


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
