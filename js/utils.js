
const randomUnitVector = () => {
    let vec = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    vec.normalize();
    return vec;
}

const randomVector = () => {
    let vec = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    return vec;
}

const tabulate = (n, f) => [...new Array(n)].map( (_, i) => f(i) );

const repeat = (n, f) => {
    for(let i = 0; i < n; i++) {
        f(i);
    }
}

const constrain = (value, start, end) => {
    if(value < start)
        return start;
    if(value > end)
        return end;
    return value;
}

const randBetween = (start, end) => {
    return THREE.Math.mapLinear(Math.random(), 0, 1, start, end);
}

const randomInt = (start, end) => {
    return Math.floor(randBetween(start, end));
}

const doWhile = f => f() || doWhile(f);

const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t ;
const easeInOutCubic = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 ;
const easeInOutQuint = t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t ;

