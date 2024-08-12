
        let ya = h + ((u**2) / (2 * g)) * Math.sin(theta)**2;

        return ya; 
    }

    let ya = func_ya(theta);
    let ya_max = func_ya(theta_max);

    return { x_arr, y_arr, x_max_arr, y_max_arr, xa, ya, xa_max, ya_max, s, s_max, theta_max, R_max }
}



const result = Task4(60, 9.81, 10, 2);
console.log({ result });

