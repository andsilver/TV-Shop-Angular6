export const addObjectToArray = (array, object, property = 'id') => {
    const index = array.findIndex( item => item[property] === object[property] );
    if (index > -1) {
        array[index] = object;
    } else {
        array.push(object);
    }
    return array;
};
