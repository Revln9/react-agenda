/*** Helper functions - they are decoupled because of testability */
import moment from 'moment'

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

/********************************/
/*  GENERATE ROWS OF CELLS     */
/******************************/


export function mapItems(itemsArray, rowsPerHour, timezone) {
  var itemsMap = {};

  itemsArray = itemsArray.sort(function(a, b) {
    return a.startDateTime - b.startDateTime;
  });

  itemsArray.forEach(function(item) {
    if (!item.startDateTime) {
      return false
    }
    var interval = (60 / rowsPerHour);
    var offsetMinutes = item.startDateTime.getMinutes() % interval;
    var start = moment(item.startDateTime).subtract(offsetMinutes, "minutes").toDate();
    var end = moment(item.endDateTime);
    var duration = moment.duration(end.diff(start));
    item.duration = duration
    var rows = Math.ceil(duration.asHours() / (interval / 60));

    var cellRefs = [];
    for (var i = 0; i < rows; i++) {
      var ref = moment(start).add(i * interval, 'minutes');
      // if(timezone) {
      //     ref.tz(timezone);
      // }
      ref = ref.format('YYYY-MM-DDTHH:mm:00');
      cellRefs.push(ref);
    }

    cellRefs.forEach(function(ref) {

      var newItem = Object.keys(item).filter(key => !key.includes('classes')).reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {});

      newItem.classes = itemsMap[ref]
        ? (itemsMap[ref].classes + ' ' + item.classes)
        : (item.classes || '');
      newItem.cellRefs = [getFirst(cellRefs), getLast(cellRefs)];
      if (itemsMap[ref]) {
        if (itemsMap[ref]._id) {
          var newArr = [itemsMap[ref], newItem];
          itemsMap[ref] = newArr
          return
        }
        if (itemsMap[ref][0] && !itemsMap[ref]._id) {
          itemsMap[ref].push(newItem)
          return
        }
        return;
      }
      itemsMap[ref] = newItem;

    });
  }, this);
  return itemsMap;
}


