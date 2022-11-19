const parseRes = [{class_name:"IG3",eleve_name:"Tom"},
{class_name:"IG3",eleve_name:"Lou"},
{class_name:"IG3",eleve_name:"Robin"},
{class_name:"IG4",eleve_name:"Jason"},
{class_name:"IG4",eleve_name:"Marvin"}]

console.log(parseRes.reduce((accumulator,currentValue) => {
    if (accumulator.length !== 0 && currentValue.class_name === accumulator[accumulator.length-1].class_name) {
        accumulator[accumulator.length-1].eleves.push(currentValue.eleve_name)
        return accumulator
    }
    else {
        accumulator.push({class_name:currentValue.class_name,eleves:[currentValue.eleve_name]})
        return accumulator
    }
},[]))