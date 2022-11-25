import {compile,derivative} from 'mathjs';

const func = (fx, data) => {
    var math = compile(fx); 
    let scope = { x: parseFloat(data) }; 
    return math.evaluate(scope);
}
const error = (xnew, xold) => {
    return Math.abs((xnew - xold) / xnew);
}
const funcDiff = (fx, data) => {
    var math = derivative(fx, 'x');
    let scope = {x:parseFloat(data)};
    return math.evaluate(scope); 
}
export {func,error,funcDiff};