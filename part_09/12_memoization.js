/**
 Memoization is an optimization technique used to speed up function execution by storing the results of expensive function calls and returning the cached result when the same inputs occur again. This can be particularly useful for functions with heavy computations or recursive functions.
 */

let sum = 0;
const calc = (n) => {
    for(let i=0;i<n;i++) {
        sum += i;
    }
    return sum;
}

const memoize = (fun) => {
    let cache = {};
    return function(...args) {
        let n = args[0];
        if(n in cache) {
            console.log("cache");
            console.log(cache);

            return cache[n];
        }else {
            console.log("calculating first time");
            let result = fun(n);
            cache[n] = result;
            return result;
        }
    } 
}

const efficient = memoize(calc);

console.time();
console.log(efficient(5));
console.timeEnd();

console.time();
console.log(efficient(5));
console.timeEnd();