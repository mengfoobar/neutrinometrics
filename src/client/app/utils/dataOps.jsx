export const sumValueFromArray= (arr) =>{
    return arr.reduce(function(a, b) {
        return a + b.value;
    }, 0);
}

export const averageValueFromArray = (arr)=>{
    return sumValueFromArray(arr)/arr.length
}