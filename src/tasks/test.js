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

    return { x_arr, y_arr, x_max_arr, y_max_arr, xa, ya, xa_max, ya_max, s, s_max, theta_max, R_max, R }
}



const result = Task4(60, 9.81, 10, 2);
console.log({ result });

