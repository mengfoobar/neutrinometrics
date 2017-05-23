import {COLOR_COLLECTION, DYNAMIC_COLOR_COLLECTION} from '../constants/color.js';

let index=0;

export const genRandomSubset=(length, fullSet=COLOR_COLLECTION)=>{
    let colorSubset=[];
    let max=fullSet.length;
    let newSet=new Set();

    for(let i=0; colorSubset.length<=length; i++){
        let randomInt = Math.floor(Math.random()*max)
        if(!newSet.has(randomInt)){
            newSet.add(randomInt)
            colorSubset.push(fullSet[randomInt])
        }
    }
    return colorSubset
}

export const randomFlatUIColor=()=>{
    const max=DYNAMIC_COLOR_COLLECTION.length;
    index++;
    return DYNAMIC_COLOR_COLLECTION[index%max]
}