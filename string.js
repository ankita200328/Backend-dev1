

// let sen="java is fun";
// let reversedSen=sen.split(" ").reverse().join(" ");
// console.log(reversedSen);


function isRotation(s1,s2) {
    if (s1.lenght !==s2.length) {
        return false;
    }
    return (s1+s2).includes(s2);
}
let s1="ABCD";
let s2="CDAB";
console.log(isRotation(s1,s2));