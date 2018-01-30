/*** Helper functions - they are decoupled because of testability */


/**
 * @param {array} items
 * @param {number} indexFrom
 * @param {number} indexTo
 * @returns {array}
 */
export function swapArrayElements(items, indexFrom, indexTo) {
  var item = items[indexTo];
  items[indexTo] = items[indexFrom];
  items[indexFrom] = item;
  return items;
}

/**
 * @param {number} mousePos
 * @param {number} elementPos
 * @param {number} elementSize
 * @returns {boolean}
 */
export function isMouseBeyond(mousePos, elementPos, elementSize, moveInMiddle) {
  var breakPoint;
  if(moveInMiddle){
    breakPoint = elementSize / 2; //break point is set to the middle line of element
  }else{
    breakPoint = 0
  }
  var mouseOverlap = mousePos - elementPos;
  return mouseOverlap > breakPoint;
}


export function getUnique(array){
  var newAr = array.filter(function(val,ind) { return array.indexOf(val) == ind; })
  return newAr
}
export function getLast(array){
  return array[array.length-1];
}

export function getFirst(array){
  return  array[0];
}

export function guid () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
