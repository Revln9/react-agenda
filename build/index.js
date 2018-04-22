module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(6)();
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swapArrayElements = swapArrayElements;
exports.isMouseBeyond = isMouseBeyond;
exports.getUnique = getUnique;
exports.getLast = getLast;
exports.getFirst = getFirst;
exports.guid = guid;
exports.mapItems = mapItems;

var _moment = __webpack_require__(2);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {array} items
 * @param {number} indexFrom
 * @param {number} indexTo
 * @returns {array}
 */
function swapArrayElements(items, indexFrom, indexTo) {
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
/*** Helper functions - they are decoupled because of testability */
function isMouseBeyond(mousePos, elementPos, elementSize, moveInMiddle) {
  var breakPoint;
  if (moveInMiddle) {
    breakPoint = elementSize / 2; //break point is set to the middle line of element
  } else {
    breakPoint = 0;
  }
  var mouseOverlap = mousePos - elementPos;
  return mouseOverlap > breakPoint;
}

function getUnique(array) {
  var newAr = array.filter(function (val, ind) {
    return array.indexOf(val) == ind;
  });
  return newAr;
}
function getLast(array) {
  return array[array.length - 1];
}

function getFirst(array) {
  return array[0];
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/********************************/
/*  GENERATE ROWS OF CELLS     */
/******************************/

function mapItems(itemsArray, rowsPerHour, timezone) {
  var itemsMap = {};

  itemsArray = itemsArray.sort(function (a, b) {
    return a.startDateTime - b.startDateTime;
  });

  itemsArray.forEach(function (item) {
    if (!item.startDateTime) {
      return false;
    }
    var interval = 60 / rowsPerHour;
    var offsetMinutes = item.startDateTime.getMinutes() % interval;
    var start = (0, _moment2.default)(item.startDateTime).subtract(offsetMinutes, "minutes").toDate();
    var end = (0, _moment2.default)(item.endDateTime);
    var duration = _moment2.default.duration(end.diff(start));
    item.duration = duration;
    var rows = Math.ceil(duration.asHours() / (interval / 60));

    var cellRefs = [];
    for (var i = 0; i < rows; i++) {
      var ref = (0, _moment2.default)(start).add(i * interval, 'minutes');
      // if(timezone) {
      //     ref.tz(timezone);
      // }
      ref = ref.format('YYYY-MM-DDTHH:mm:00');
      cellRefs.push(ref);
    }

    cellRefs.forEach(function (ref) {

      var newItem = Object.keys(item).filter(function (key) {
        return !key.includes('classes');
      }).reduce(function (obj, key) {
        obj[key] = item[key];
        return obj;
      }, {});

      newItem.classes = itemsMap[ref] ? itemsMap[ref].classes + ' ' + item.classes : item.classes || '';
      newItem.cellRefs = [getFirst(cellRefs), getLast(cellRefs)];
      if (itemsMap[ref]) {
        if (itemsMap[ref]._id) {
          var newArr = [itemsMap[ref], newItem];
          itemsMap[ref] = newArr;
          return;
        }
        if (itemsMap[ref][0] && !itemsMap[ref]._id) {
          itemsMap[ref].push(newItem);
          return;
        }
        return;
      }
      itemsMap[ref] = newItem;
    });
  }, this);
  return itemsMap;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reactAgenda = __webpack_require__(5);

var _reactAgenda2 = _interopRequireDefault(_reactAgenda);

var _reactAgendaCtrl = __webpack_require__(14);

var _reactAgendaCtrl2 = _interopRequireDefault(_reactAgendaCtrl);

var _Modal = __webpack_require__(17);

var _Modal2 = _interopRequireDefault(_Modal);

var _helpers = __webpack_require__(3);

__webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = { ReactAgenda: _reactAgenda2.default, ReactAgendaCtrl: _reactAgendaCtrl2.default, guid: _helpers.guid, getUnique: _helpers.getUnique, getLast: _helpers.getLast, getFirst: _helpers.getFirst, Modal: _Modal2.default };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = __webpack_require__(2);

var _moment2 = _interopRequireDefault(_moment);

var _reactAgendaItem = __webpack_require__(10);

var _reactAgendaItem2 = _interopRequireDefault(_reactAgendaItem);

var _classnames = __webpack_require__(12);

var _classnames2 = _interopRequireDefault(_classnames);

var _helpers = __webpack_require__(3);

var _dragAndDropHelper = __webpack_require__(13);

var DragDropHelper = _interopRequireWildcard(_dragAndDropHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var startSelect;
var endSelect;
var isDragging = false;
var isMouseDown = false;
var draggedElement;
var timeNow = (0, _moment2.default)();
var draggedItem;
var ctrlKey = false;

var DEFAULT_ITEM = {
  name: '',
  classes: '',
  cellRefs: []
};

var ReactAgenda = function (_Component) {
  _inherits(ReactAgenda, _Component);

  function ReactAgenda(props) {
    _classCallCheck(this, ReactAgenda);

    var _this = _possibleConstructorReturn(this, (ReactAgenda.__proto__ || Object.getPrototypeOf(ReactAgenda)).call(this, props));

    _this.state = {
      date: (0, _moment2.default)(),
      items: {},
      itemOverlayStyles: {},
      highlightedCells: [],
      numberOfDays: 4,
      autoScaleNumber: 0,
      focusedCell: null
    };
    _this.handleBeforeUpdate = _this.handleBeforeUpdate.bind(_this);
    _this.handleOnNextButtonClick = _this.handleOnNextButtonClick.bind(_this);
    _this.handleOnPrevButtonClick = _this.handleOnPrevButtonClick.bind(_this);
    _this.handleMouseClick = _this.handleMouseClick.bind(_this);
    _this.handleMouseOver = _this.handleMouseOver.bind(_this);
    _this.removeSelection = _this.removeSelection.bind(_this);
    _this.handleAllClickStarts = _this.handleAllClickStarts.bind(_this);
    _this.handleAllClickEnds = _this.handleAllClickEnds.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onDragEnter = _this.onDragEnter.bind(_this);
    _this.onDragOver = _this.onDragOver.bind(_this);
    _this.onDragEnd = _this.onDragEnd.bind(_this);
    _this.onDragHandlerStart = _this.onDragHandlerStart.bind(_this);
    _this.onDragHandlerEnd = _this.onDragHandlerEnd.bind(_this);
    _this.getSelection = _this.getSelection.bind(_this);
    _this.editEvent = _this.editEvent.bind(_this);
    _this.removeEvent = _this.removeEvent.bind(_this);
    _this.dragEvent = _this.dragEvent.bind(_this);
    _this.duplicateEvent = _this.duplicateEvent.bind(_this);
    _this.resizeEvent = _this.resizeEvent.bind(_this);
    _this.updateDimensions = _this.updateDimensions.bind(_this);
    return _this;
  }

  /********************/
  /*  Life Cycle      */
  /********************/


  _createClass(ReactAgenda, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleBeforeUpdate(this.props);
      if (this.props.autoScale) {
        window.removeEventListener("resize", this.updateDimensions);
      }
      if (this.props.locale && this.props.locale != "en") {
        _moment2.default.locale(this.props.locale);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {

      this.handleBeforeUpdate(props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      if (this.props.autoScale) {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
      }
    }
  }, {
    key: 'updateDimensions',
    value: function updateDimensions() {
      var width = Math.round(document.getElementById('agenda-wrapper').offsetWidth / 150 - 1);
      this.setState({ autoScaleNumber: width, numberOfDays: width });
    }

    /********************/
    /*  Item Renderers  */
    /********************/

  }, {
    key: 'getHeaderColumns',
    value: function getHeaderColumns() {
      var cols = [];
      for (var i = 0; i < this.state.numberOfDays; i++) {
        cols.push((0, _moment2.default)(this.state.date).add(i, 'days').toDate());
      }
      return cols;
    }
  }, {
    key: 'getBodyRows',
    value: function getBodyRows() {
      var rows = [];
      var interval = 60 / this.props.rowsPerHour;
      for (var i = 0; i < 24 * this.props.rowsPerHour; i++) {
        rows.push((0, _moment2.default)(this.state.date).startOf('day').add(Math.floor(i * interval), 'minutes'));
      }
      return rows;
    }
  }, {
    key: 'getMinuteCells',
    value: function getMinuteCells(rowMoment) {
      var cells = [];
      for (var i = 0; i < this.state.numberOfDays; i++) {
        var cellRef = (0, _moment2.default)(rowMoment).add(i, 'days').format('YYYY-MM-DDTHH:mm:ss');
        cells.push({
          cellRef: cellRef,
          item: this.state.items[cellRef] || DEFAULT_ITEM
        });
      }
      return cells;
    }

    /********************/
    /*  Event Handlers  */
    /********************/

  }, {
    key: 'handleBeforeUpdate',
    value: function handleBeforeUpdate(props) {
      if (props.hasOwnProperty('startDate') && props.startDate !== this.state.date.toDate()) {
        this.setState({
          date: (0, _moment2.default)(props.startDate)
        });
      }

      if (props.hasOwnProperty('items')) {
        this.setState({
          items: (0, _helpers.mapItems)(props.items, props.rowsPerHour, props.timezone)
        });
      }

      if (props.hasOwnProperty('numberOfDays') && props.numberOfDays !== this.state.numberOfDays && !this.props.autoScale) {
        this.setState({ numberOfDays: props.numberOfDays });
      }

      if (props.hasOwnProperty('minDate') && (!this.state.hasOwnProperty('minDate') || props.minDate !== this.state.minDate.toDate())) {
        this.setState({
          minDate: (0, _moment2.default)(props.minDate)
        });
      }

      if (props.hasOwnProperty('maxDate') && (!this.state.hasOwnProperty('maxDate') || props.maxDate !== this.state.maxDate.toDate())) {
        this.setState({
          maxDate: (0, _moment2.default)(props.maxDate)
        });
      }
    }
  }, {
    key: 'handleOnNextButtonClick',
    value: function handleOnNextButtonClick() {
      var nextStartDate = (0, _moment2.default)(this.state.date).add(this.state.numberOfDays, 'days');
      if (this.state.hasOwnProperty('maxDate')) {
        nextStartDate = _moment2.default.min(nextStartDate, this.state.maxDate);
      }

      var newStart = nextStartDate;
      var newEnd = (0, _moment2.default)(newStart).add(this.state.numberOfDays - 1, 'days');

      if (nextStartDate !== this.state.date) {
        this.setState({ date: nextStartDate });
      }

      if (this.props.onDateRangeChange) {
        this.props.onDateRangeChange(newStart.startOf('day').toDate(), newEnd.endOf('day').toDate());
      }
    }
  }, {
    key: 'handleOnPrevButtonClick',
    value: function handleOnPrevButtonClick() {
      var prevStartDate = (0, _moment2.default)(this.state.date).subtract(this.state.numberOfDays, 'days');
      if (this.state.hasOwnProperty('minDate')) {
        prevStartDate = _moment2.default.max(prevStartDate, this.state.minDate);
      }

      var newStart = prevStartDate;
      var newEnd = (0, _moment2.default)(newStart).add(this.state.numberOfDays - 1, 'days');

      if (prevStartDate !== this.state.date) {
        this.setState({ date: prevStartDate });
      }

      if (this.props.onDateRangeChange) {
        this.props.onDateRangeChange(newStart.toDate(), newEnd.toDate());
      }
    }
  }, {
    key: 'handleMouseClick',
    value: function handleMouseClick(cell, bypass) {

      if (typeof cell != "string" && cell.tagName) {
        var dt = (0, _moment2.default)(cell.innerText, ["h:mm A"]).format("HH");
        var old = parseInt(dt);
        var now = new Date();
        var newdate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), old + 1, 0);
        var mom = newdate.toISOString().substring(0, newdate.toISOString().length - 5);
        if (this.props.onCellSelect) {
          return this.props.onCellSelect(mom, bypass);
        }
      }
      if (this.props.onCellSelect) {
        this.props.onCellSelect(cell, bypass);
      }
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver(e) {
      if (e.buttons === 0) {
        return false;
      }

      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      e.target.classList.add('agenda__cell_selected');
    }
  }, {
    key: 'removeSelection',
    value: function removeSelection() {

      var old = document.getElementsByClassName('agenda__cell_selected');

      for (var i = old.length - 1; i >= 0; --i) {
        if (old[i]) {
          old[i].classList.remove('agenda__cell_selected');
        }
      }
    }
  }, {
    key: 'handleAllClickStarts',
    value: function handleAllClickStarts(e, n) {

      isMouseDown = true;
      this.removeSelection();
      if (e.target.classList.contains("--time") || e.target.classList.contains("--time-now") && !isDragging) {

        return this.handleMouseClick(e.target);
      }

      if (e.target.classList.contains("agenda__cell") && !e.target.classList.contains("--time") && !isDragging) {
        this.removeSelection();
        e.target.classList.toggle('agenda__cell_selected');
        startSelect = e.target.id;
        if (e.buttons === 0) {
          return false;
        }
        this.handleMouseClick(e.target.id);
      }

      if (e.target.classList.contains("cell-item") && !isDragging) {
        this.removeSelection();

        // startSelect = e.target.id
        //  this.handleMouseClick(e.target.id)
      }
    }
  }, {
    key: 'handleAllClickEnds',
    value: function handleAllClickEnds(e, n) {
      //  e.preventDefault ? e.preventDefault() : e.returnValue = false
      isMouseDown = false;
      isDragging = false;

      endSelect = e.target.id;

      if (startSelect && endSelect && startSelect != endSelect) {
        return this.getSelection();
      }
    }

    /**************** ****/
    /*  Drag Handlers   */
    /*******************/

  }, {
    key: 'onDragStart',
    value: function onDragStart(e) {

      isDragging = true;
      isMouseDown = false;
      draggedItem = e.target.id;
      e.dataTransfer.setDragImage(e.target, 0, 0);
    }
  }, {
    key: 'onDragEnter',
    value: function onDragEnter(e) {
      e.preventDefault();
      if (!isDragging) {
        this.removeSelection();
      }
      e.dataTransfer.dropEffect = "move";
      if (e.ctrlKey) {
        e.dataTransfer.effectAllowed = "copy";
      }
    }
  }, {
    key: 'onDragOver',
    value: function onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.target.id === draggedElement) {
        return false;
      }

      if (e.ctrlKey) {
        e.dataTransfer.effectAllowed = "copy";
        ctrlKey = true;
      } else {
        e.dataTransfer.dropEffect = "move";
      }

      if (e.target.classList.contains("cell-item")) {

        return draggedElement = e.target.parentNode.parentNode.id;
      }

      if (e.target.classList.contains("handler")) {
        return draggedElement = e.target.parentNode.id;
      }
      if (e.target.classList.contains("dragDiv")) {
        return draggedElement = e.target.parentNode.id;
      }

      draggedElement = e.target.id;
    }
  }, {
    key: 'dragEvent',
    value: function dragEvent(id, d) {
      if (!this.props.onChangeEvent) {
        return;
      }
      var date = d;
      var itm;
      if (!this.refs[d]) {
        return;
      }
      if (this.refs[d].tagName !== 'TD') {
        // when user drag and drop an event into another we assign parent id
        date = this.refs[d].parentNode.id;
      }
      var items = this.props.items;
      if (id && date && items) {
        for (var i in items) {
          if (items[i]._id === id) {
            var start = (0, _moment2.default)(items[i].startDateTime);
            var end = (0, _moment2.default)(items[i].endDateTime);
            var duration = _moment2.default.duration(end.diff(start));
            var newdate = (0, _moment2.default)(date).subtract(duration % (60 / this.state.rowsPerHour));
            var newEnddate = (0, _moment2.default)(newdate).add(duration);
            items[i].startDateTime = new Date(newdate);
            items[i].endDateTime = new Date(newEnddate);
            itm = items[i];
            break;
          }
        }
        this.props.onChangeEvent(items, itm);
      }
    }
  }, {
    key: 'duplicateEvent',
    value: function duplicateEvent(id, d) {
      var date = d;
      var itm;
      var oldItm;
      if (!this.refs[d]) {
        return;
      }
      if (this.refs[d].tagName !== 'TD') {
        // when user drag and drop an event into another we assign parent id
        date = this.refs[d].parentNode.id;
      }
      var items = this.props.items;
      if (id && date && items) {
        for (var i in items) {
          if (items[i]._id === id) {
            itm = Object.assign({}, items[i], { _id: (0, _helpers.guid)() });
            var start = (0, _moment2.default)(itm.startDateTime);
            var end = (0, _moment2.default)(itm.endDateTime);
            var duration = _moment2.default.duration(end.diff(start));
            var newdate = (0, _moment2.default)(date);
            var newEnddate = (0, _moment2.default)(newdate).add(duration);
            itm.startDateTime = new Date(newdate);
            itm.endDateTime = new Date(newEnddate);
            items.push(itm);
            if (this.props.onChangeEvent) {
              this.props.onChangeEvent(items, itm);
            }
            break;
          }
        }
      }
    }
  }, {
    key: 'resizeEvent',
    value: function resizeEvent(id, date) {

      if (!this.props.onChangeDuration) {
        return;
      }

      var items = this.props.items;
      if (id && date && items) {

        for (var i in items) {
          if (items[i]._id === id) {
            var difference = new Date(date) - new Date(items[i].startDateTime);
            if (difference < 1) {
              var strt = new Date(items[i].startDateTime);
              items[i].endDateTime = new Date(strt.getFullYear(), strt.getMonth(), strt.getDate(), strt.getHours(), strt.getMinutes() + 15, 0);
              this.setState({ items: items });
              return this.props.onChangeDuration(items, items[i]);
            }
            var newdate = (0, _moment2.default)(date);
            items[i].endDateTime = new Date(newdate);
            return this.props.onChangeDuration(items, items[i]);
            break;
          }
        }
      }
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd(e) {

      var newDate = draggedElement;

      if (ctrlKey) {

        this.duplicateEvent(e.target.id, newDate);
      } else {
        this.dragEvent(e.target.id, newDate);
      }
      isDragging = false;
      isMouseDown = false;
      ctrlKey = false;
      draggedElement = '';
      draggedItem = '';
    }
  }, {
    key: 'onDragHandlerStart',
    value: function onDragHandlerStart(e) {

      isDragging = true;
      //e.dataTransfer.setData("text/html", e.target);
      //e.dataTransfer.effectAllowed = "all";

    }
  }, {
    key: 'onDragHandlerEnd',
    value: function onDragHandlerEnd(e, n) {

      if ((typeof draggedElement === 'undefined' ? 'undefined' : _typeof(draggedElement)) === undefined || draggedElement === '') {
        return;
      }
      var item = e.target.id || e.target.offsetParent.id;

      if (this.refs[draggedElement] && this.refs[e.target.id] && this.refs[e.target.id].tagName === "DIV" && this.refs[draggedElement].tagName === "DIV") {
        //detect if we are resizing an event
        item = e.target.id;
        draggedElement = this.refs[draggedElement].parentNode.id;
        return this.resizeEvent(item, draggedElement);
      }

      if (draggedElement === '' && !this.refs[draggedElement] && this.refs[e.target.id].tagName === "DIV") {
        // when user drag and drop an event into another we assign parent id
        draggedElement = this.refs[e.target.id].parentNode.id;
        return;
      }

      if (!this.refs[draggedElement] && draggedElement) {
        //detect if we are dragging an event from its description panel (item component)
        var old = document.getElementById(draggedElement);
        draggedElement = old.parentNode.id;
      }

      this.resizeEvent(item, draggedElement);

      isDragging = false;
      isMouseDown = false;
      draggedElement = '';
    }

    /**************************/
    /*  selection Handlers   */
    /************************/

  }, {
    key: 'getSelection',
    value: function getSelection() {

      var array = [];
      var array2 = [];
      var old = document.getElementsByClassName('agenda__cell_selected');

      array = Object.keys(old).map(function (value, index) {
        return old[value].id;
      });
      var last = (0, _moment2.default)((0, _helpers.getLast)(array));
      var addon = last.add(60 / this.props.rowsPerHour, 'Minutes');
      array.push(addon.format('YYYY-MM-DDTHH:mm:00'));

      if (this.props.onRangeSelection) {
        this.props.onRangeSelection(array);
      }
    }

    /***************************/
    /*  EVENTS MODIFiCATION   */
    /*************************/

  }, {
    key: 'editEvent',
    value: function editEvent(props) {
      if (this.props.onItemEdit) {
        this.props.onItemEdit(props, true);
      }
    }
  }, {
    key: 'removeEvent',
    value: function removeEvent(item) {
      var items = this.props.items;
      var newItems = items.filter(function (el) {
        return el._id !== item._id;
      });
      if (this.props.onItemRemove) {
        this.props.onItemRemove(newItems, item);
      }
    }
  }, {
    key: 'render',
    value: function render() {

      var renderHeaderColumns = function renderHeaderColumns(col, i) {
        var headerLabel = (0, _moment2.default)(col);
        headerLabel.locale(this.props.locale);
        return _react2.default.createElement(
          'th',
          { ref: "column-" + (i + 1), key: "col-" + i, className: 'agenda__cell --head' },
          this.props.headFormat ? headerLabel.format(this.props.headFormat) : headerLabel.format('dddd DD MMM YY')
        );
      };

      var renderBodyRows = function renderBodyRows(row, i) {
        if (i % this.props.rowsPerHour === 0) {
          var ref = "hour-" + Math.floor(i / this.props.rowsPerHour);
          var timeLabel = (0, _moment2.default)(row);
          var differ = timeLabel.diff(timeNow, 'minutes');

          timeLabel.locale(this.props.locale);
          return _react2.default.createElement(
            'tr',
            { key: "row-" + i, ref: ref, draggable: false, className: 'agenda__row   --hour-start' },
            _react2.default.createElement(
              'td',
              { className: differ <= 60 && differ >= 0 ? 'disable-select agenda__cell --time-now' : 'disable-select agenda__cell --time', rowSpan: this.props.rowsPerHour },
              timeLabel.format('LT')
            ),
            this.getMinuteCells(row).map(renderMinuteCells, this)
          );
        } else {
          return _react2.default.createElement(
            'tr',
            { key: "row-" + i },
            this.getMinuteCells(row).map(renderMinuteCells, this)
          );
        }
      };

      var itmName;

      var Colors = this.props.itemColors;

      var ItemComponent = this.props.itemComponent ? this.props.itemComponent : _reactAgendaItem2.default;

      var renderItemCells = function (cell, i) {

        var cellClasses = {
          'agenda__cell': true
        };
        cell['item'].forEach(function (itm) {

          cellClasses[itm.classes] = true;
        });

        var classSet = (0, _classnames2.default)(cellClasses);

        var splt = classSet.split(' ');

        splt = splt.filter(function (i) {
          return !i.includes('agenda__cell');
        });
        splt = splt.filter(function (i) {
          return !i.includes('undefined');
        });

        var nwsplt = [];
        splt.forEach(function (value) {
          if (value.length > 0) {
            nwsplt.push(Colors[value]);
          }
        });

        var styles = {
          height: this.props.cellHeight + 'px'
        };
        if (splt.length > 1) {

          if (nwsplt[1] === nwsplt[2]) {

            nwsplt.splice(1, 0, "rgb(255,255,255)");
          }
          nwsplt = nwsplt.join(' , ');
          styles = {
            "background": 'linear-gradient(-100deg,' + nwsplt + ')',
            height: this.props.cellHeight + 'px'
          };
        }

        var itemElement = cell.item.map(function (item, idx) {

          var last1 = (0, _helpers.getLast)(item.cellRefs);
          var first1 = (0, _helpers.getFirst)(item.cellRefs);

          if (first1 === cell.cellRef) {

            return _react2.default.createElement(
              'div',
              { id: item._id, ref: cell.cellRef, key: idx, className: 'dragDiv', onDragStart: this.onDragStart, onDragEnd: this.onDragEnd, draggable: 'true' },
              first1 === cell.cellRef ? _react2.default.createElement('i', { className: 'drag-handle-icon', 'aria-hidden': 'true' }) : '',
              first1 === cell.cellRef ? _react2.default.createElement(ItemComponent, { item: item,
                parent: cell.cellRef,
                itemColors: Colors,
                edit: this.props.onItemEdit ? this.editEvent : null,
                remove: this.props.onItemRemove ? this.removeEvent : null,
                days: this.props.numberOfDays }) : ''
            );
          }

          if (last1 === cell.cellRef && this.props.onChangeDuration) {
            return _react2.default.createElement(
              'div',
              { className: 'handler', style: {
                  marginLeft: 8 * (idx + 1) + 'px'
                }, id: item._id, key: item._id, onDragStart: this.onDragHandlerStart, onDragEnd: this.onDragHandlerEnd, draggable: 'true' },
              _react2.default.createElement('i', { className: 'resize-handle-icon' })
            );
          }

          return '';
        }.bind(this));

        return _react2.default.createElement(
          'td',
          { ref: cell.cellRef, key: "cell-" + i, className: classSet, style: styles, id: cell.cellRef },
          itemElement
        );
      }.bind(this);

      var renderMinuteCells = function renderMinuteCells(cell, i) {
        if (cell.item[0] && !cell.item._id) {
          return renderItemCells(cell, i);
        }

        var cellClasses = {
          'agenda__cell': true
        };

        cellClasses[cell.item.classes] = true;
        if (cell.item.cellRefs) {
          var last = (0, _helpers.getLast)(cell.item.cellRefs);
          var first = (0, _helpers.getFirst)(cell.item.cellRefs);
        }

        var classSet = (0, _classnames2.default)(cellClasses);

        var splt = classSet.split(' ');
        splt = splt.filter(function (i) {
          return !i.includes('agenda__cell');
        });
        splt = splt.filter(function (i) {
          return !i.includes('undefined');
        });
        var nwsplt = [];
        splt.forEach(function (value) {
          if (value.length > 0) {
            nwsplt.push(Colors[value]);
          }
        });

        var styles = {
          height: this.props.cellHeight + 'px'
        };
        if (splt.length > 1) {
          nwsplt = nwsplt.join(' , ');
          styles = {
            "background": 'linear-gradient(to left,' + nwsplt + ')',
            height: this.props.cellHeight + 'px'
          };
        }

        if (splt.length == 1) {
          styles = {
            "background": nwsplt[0],
            height: this.props.cellHeight + 'px'
          };
        }

        return _react2.default.createElement(
          'td',
          { ref: cell.cellRef, key: "cell-" + i, className: classSet, style: styles, id: cell.cellRef },
          first === cell.cellRef ? _react2.default.createElement(
            'div',
            { id: cell.item._id, ref: cell.item._id, className: 'dragDiv', onDragStart: this.onDragStart, onDragEnd: this.onDragEnd, draggable: 'true' },
            first === cell.cellRef && this.props.onChangeEvent ? _react2.default.createElement('i', { className: 'drag-handle-icon', 'aria-hidden': 'true' }) : '',
            first === cell.cellRef ? _react2.default.createElement(ItemComponent, { item: cell.item,
              parent: cell.cellRef,
              itemColors: Colors,
              edit: this.props.onItemEdit ? this.editEvent : null,
              remove: this.props.onItemRemove ? this.removeEvent : null,
              days: this.props.numberOfDays }) : ''
          ) : '',
          last === cell.cellRef && this.props.onChangeDuration ? _react2.default.createElement(
            'div',
            { className: 'handler', id: cell.item._id, onDragStart: this.onDragHandlerStart, onDragEnd: this.onDragHandlerEnd, draggable: 'true' },
            _react2.default.createElement('i', { className: 'resize-handle-icon' })
          ) : ''
        );
      };

      var disablePrev = function disablePrev(state) {
        if (!state.hasOwnProperty('minDate')) {
          return false;
        }

        return state.date.toDate().getTime() === state.minDate.toDate().getTime();
      };

      var disableNext = function disableNext(state) {
        if (!state.hasOwnProperty('maxDate')) {
          return false;
        }

        return state.date.toDate().getTime() === state.maxDate.toDate().getTime();
      };

      return _react2.default.createElement(
        'div',
        { className: 'agenda', id: 'agenda-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'agenda__table --header' },
          _react2.default.createElement(
            'table',
            null,
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'th',
                  { ref: 'column-0', className: 'agenda__cell --controls' },
                  _react2.default.createElement(
                    'div',
                    { className: 'agenda-controls-layout' },
                    _react2.default.createElement('button', { className: "agenda__prev" + (disablePrev(this.state) ? " --disabled" : ""), onClick: this.handleOnPrevButtonClick }),
                    _react2.default.createElement('button', { className: "agenda__next" + (disableNext(this.state) ? " --disabled" : ""), onClick: this.handleOnNextButtonClick })
                  )
                ),
                this.getHeaderColumns(this.props.view).map(renderHeaderColumns, this)
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { ref: 'agendaScrollContainer', className: 'agenda__table --body', style: {
              position: 'relative'
            } },
          _react2.default.createElement(
            'table',
            { cellSpacing: '0', cellPadding: '0' },
            _react2.default.createElement(
              'tbody',
              { onMouseDown: this.handleAllClickStarts, onDragEnter: this.onDragEnter, onDragOver: this.onDragOver, onMouseUp: this.handleAllClickEnds, onMouseOver: this.handleMouseOver },
              this.getBodyRows().map(renderBodyRows, this)
            )
          )
        )
      );
    }
  }]);

  return ReactAgenda;
}(_react.Component);

exports.default = ReactAgenda;
;

ReactAgenda.propTypes = {
  minDate: _propTypes2.default.instanceOf(Date),
  maxDate: _propTypes2.default.instanceOf(Date),
  startDate: _propTypes2.default.instanceOf(Date),
  startAtTime: _propTypes2.default.number,
  cellHeight: _propTypes2.default.number,
  view: _propTypes2.default.string,
  locale: _propTypes2.default.string,
  items: _propTypes2.default.array,
  itemComponent: _propTypes2.default.element,
  numberOfDays: _propTypes2.default.number,
  headFormat: _propTypes2.default.string,
  rowsPerHour: _propTypes2.default.number,
  itemColors: _propTypes2.default.object,
  fixedHeader: _propTypes2.default.bool,
  autoScaleNumber: _propTypes2.default.bool
};

ReactAgenda.defaultProps = {
  minDate: new Date(),
  maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3),
  startDate: new Date(),
  startAtTime: 0,
  cellHeight: 15,
  view: "agenda",
  locale: "en",
  items: [],
  autoScale: false,
  itemComponent: _reactAgendaItem2.default,
  numberOfDays: 4,
  headFormat: "ddd DD MMM",
  rowsPerHour: 4,
  itemColors: {
    'color-1': "rgba(102, 195, 131 , 1)",
    "color-2": "rgba(242, 177, 52, 1)",
    "color-3": "rgba(235, 85, 59, 1)",
    "color-4": "rgba(70, 159, 213, 1)"
  },
  fixedHeader: true
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(7);
var invariant = __webpack_require__(8);
var ReactPropTypesSecret = __webpack_require__(9);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = __webpack_require__(2);

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _helpers = __webpack_require__(3);

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactAgendaItem = function (_Component) {
  _inherits(ReactAgendaItem, _Component);

  function ReactAgendaItem(props) {
    _classCallCheck(this, ReactAgendaItem);

    var _this = _possibleConstructorReturn(this, (ReactAgendaItem.__proto__ || Object.getPrototypeOf(ReactAgendaItem)).call(this, props));

    _this.state = {
      wrapper: {
        width: '150px',
        marginLeft: '0px',
        zIndex: 5,
        borderLeft: null

      },
      controls: {}

    };
    _this.updateDimensions = _this.updateDimensions.bind(_this);
    _this.raiseZindex = _this.raiseZindex.bind(_this);
    _this.lowerZindex = _this.lowerZindex.bind(_this);

    return _this;
  }

  _createClass(ReactAgendaItem, [{
    key: 'updateDimensions',
    value: function updateDimensions() {
      var elem = document.getElementById(this.props.parent);
      if (elem) {
        var nwidh = elem.offsetWidth / 1.4;
        var nmrgl = this.props.padder > 0 ? nwidh / 5 + this.props.padder * 8 : nwidh / 5;

        return this.setState({ wrapper: {
            width: nwidh + 'px',
            marginLeft: nmrgl + 'px',
            marginTop: this.props.padder * 8 + 'px',
            zIndex: 5
          }
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props, next) {
      setTimeout(function () {
        this.updateDimensions();
      }.bind(this), 50);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);

      this.updateDimensions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }
  }, {
    key: 'lowerZindex',
    value: function lowerZindex(e) {
      var sty = this.state.wrapper;

      if (sty.zIndex === 8) {
        var newState = { wrapper: Object.assign({}, sty, { zIndex: 5 }) };
        return this.setState(newState);
      }
    }
  }, {
    key: 'raiseZindex',
    value: function raiseZindex(e) {
      var sty = this.state.wrapper;

      if (sty.zIndex === 5) {

        var newState = { wrapper: Object.assign({}, sty, { zIndex: 8 }) };
        return this.setState(newState);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var duratH = _moment2.default.duration(this.props.item.duration._milliseconds, 'Milliseconds').humanize();
      var duratL = (0, _moment2.default)(this.props.item.startDateTime).format("HH:mm");
      var duratE = (0, _moment2.default)(this.props.item.endDateTime).format("HH:mm");

      return _react2.default.createElement(
        'div',
        { style: this.state.wrapper, className: 'agenda-cell-item', onMouseEnter: this.raiseZindex, onMouseLeave: this.lowerZindex },
        _react2.default.createElement(
          'div',
          { className: 'agenda-controls-item', style: this.state.controls },
          this.props.edit ? _react2.default.createElement(
            'div',
            { className: 'agenda-edit-event' },
            _react2.default.createElement(
              'a',
              { onClick: function onClick() {
                  return _this2.props.edit(_this2.props.item);
                }, className: 'agenda-edit-modele' },
              _react2.default.createElement('i', { className: 'edit-item-icon' })
            )
          ) : '',
          this.props.remove ? _react2.default.createElement(
            'div',
            { className: 'agenda-delete-event' },
            _react2.default.createElement(
              'a',
              { onClick: function onClick() {
                  return _this2.props.remove(_this2.props.item);
                }, className: 'agenda-delete-modele' },
              _react2.default.createElement('i', { className: 'remove-item-icon' })
            )
          ) : ''
        ),
        _react2.default.createElement(
          'div',
          { className: 'agenda-item-description' },
          _react2.default.createElement(
            'section',
            null,
            this.props.item.name
          ),
          _react2.default.createElement(
            'small',
            null,
            ', ',
            duratL,
            ' - ',
            duratE,
            ' , ',
            duratH
          )
        )
      );
    }
  }]);

  return ReactAgendaItem;
}(_react.Component);

exports.default = ReactAgendaItem;


ReactAgendaItem.propTypes = {
  parent: _propTypes2.default.string,
  item: _propTypes2.default.object,
  padder: _propTypes2.default.number,
  edit: _propTypes2.default.func,
  remove: _propTypes2.default.func

};

ReactAgendaItem.defaultProps = {
  parent: 'body',
  item: {},
  padder: 0
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DragDropTouch;
(function (DragDropTouch_1) {
    'use strict';
    /**
     * Object used to hold the data that is being dragged during drag and drop operations.
     *
     * It may hold one or more data items of different types. For more information about
     * drag and drop operations and data transfer objects, see
     * <a href="https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer">HTML Drag and Drop API</a>.
     *
     * This object is created automatically by the @see:DragDropTouch singleton and is
     * accessible through the @see:dataTransfer property of all drag events.
     */

    var DataTransfer = function () {
        function DataTransfer() {
            this._dropEffect = 'move';
            this._effectAllowed = 'all';
            this._data = {};
        }
        Object.defineProperty(DataTransfer.prototype, "dropEffect", {
            /**
             * Gets or sets the type of drag-and-drop operation currently selected.
             * The value must be 'none',  'copy',  'link', or 'move'.
             */
            get: function get() {
                return this._dropEffect;
            },
            set: function set(value) {
                this._dropEffect = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataTransfer.prototype, "effectAllowed", {
            /**
             * Gets or sets the types of operations that are possible.
             * Must be one of 'none', 'copy', 'copyLink', 'copyMove', 'link',
             * 'linkMove', 'move', 'all' or 'uninitialized'.
             */
            get: function get() {
                return this._effectAllowed;
            },
            set: function set(value) {
                this._effectAllowed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataTransfer.prototype, "types", {
            /**
             * Gets an array of strings giving the formats that were set in the @see:dragstart event.
             */
            get: function get() {
                return Object.keys(this._data);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Removes the data associated with a given type.
         *
         * The type argument is optional. If the type is empty or not specified, the data
         * associated with all types is removed. If data for the specified type does not exist,
         * or the data transfer contains no data, this method will have no effect.
         *
         * @param type Type of data to remove.
         */
        DataTransfer.prototype.clearData = function (type) {
            if (type != null) {
                delete this._data[type];
            } else {
                this._data = null;
            }
        };
        /**
         * Retrieves the data for a given type, or an empty string if data for that type does
         * not exist or the data transfer contains no data.
         *
         * @param type Type of data to retrieve.
         */
        DataTransfer.prototype.getData = function (type) {
            return this._data[type] || '';
        };
        /**
         * Set the data for a given type.
         *
         * For a list of recommended drag types, please see
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Recommended_Drag_Types.
         *
         * @param type Type of data to add.
         * @param value Data to add.
         */
        DataTransfer.prototype.setData = function (type, value) {
            this._data[type] = value;
        };
        /**
         * Set the image to be used for dragging if a custom one is desired.
         *
         * @param img An image element to use as the drag feedback image.
         * @param offsetX The horizontal offset within the image.
         * @param offsetY The vertical offset within the image.
         */
        DataTransfer.prototype.setDragImage = function (img, offsetX, offsetY) {
            var ddt = DragDropTouch._instance;
            ddt._imgCustom = img;
            ddt._imgOffset = { x: offsetX, y: offsetY };
        };
        return DataTransfer;
    }();
    DragDropTouch_1.DataTransfer = DataTransfer;
    /**
     * Defines a class that adds support for touch-based HTML5 drag/drop operations.
     *
     * The @see:DragDropTouch class listens to touch events and raises the
     * appropriate HTML5 drag/drop events as if the events had been caused
     * by mouse actions.
     *
     * The purpose of this class is to enable using existing, standard HTML5
     * drag/drop code on mobile devices running IOS or Android.
     *
     * To use, include the DragDropTouch.js file on the page. The class will
     * automatically start monitoring touch events and will raise the HTML5
     * drag drop events (dragstart, dragenter, dragleave, drop, dragend) which
     * should be handled by the application.
     *
     * For details and examples on HTML drag and drop, see
     * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations.
     */
    var DragDropTouch = function () {
        /**
         * Initializes the single instance of the @see:DragDropTouch class.
         */
        function DragDropTouch() {
            this._lastClick = 0;
            // enforce singleton pattern
            if (DragDropTouch._instance) {
                throw 'DragDropTouch instance already created.';
            }
            // listen to touch events
            if ('ontouchstart' in document) {
                var d = document,
                    ts = this._touchstart.bind(this),
                    tm = this._touchmove.bind(this),
                    te = this._touchend.bind(this);
                d.addEventListener('touchstart', ts);
                d.addEventListener('touchmove', tm);
                d.addEventListener('touchend', te);
                d.addEventListener('touchcancel', te);
            }
        }
        /**
         * Gets a reference to the @see:DragDropTouch singleton.
         */
        DragDropTouch.getInstance = function () {
            return DragDropTouch._instance;
        };
        // ** event handlers
        DragDropTouch.prototype._touchstart = function (e) {
            var _this = this;
            if (this._shouldHandle(e)) {
                // raise double-click and prevent zooming
                if (Date.now() - this._lastClick < DragDropTouch._DBLCLICK) {
                    if (this._dispatchEvent(e, 'dblclick', e.target)) {
                        e.preventDefault();
                        this._reset();
                        return;
                    }
                }
                // clear all variables
                this._reset();
                // get nearest draggable element
                var src = this._closestDraggable(e.target);
                if (src) {
                    // give caller a chance to handle the hover/move events
                    if (!this._dispatchEvent(e, 'mousemove', e.target) && !this._dispatchEvent(e, 'mousedown', e.target)) {
                        // get ready to start dragging
                        this._dragSource = src;
                        this._ptDown = this._getPoint(e);
                        this._lastTouch = e;
                        e.preventDefault();
                        // show context menu if the user hasn't started dragging after a while
                        setTimeout(function () {
                            if (_this._dragSource == src && _this._img == null) {
                                if (_this._dispatchEvent(e, 'contextmenu', src)) {
                                    _this._reset();
                                }
                            }
                        }, DragDropTouch._CTXMENU);
                    }
                }
            }
        };
        DragDropTouch.prototype._touchmove = function (e) {
            if (this._shouldHandle(e)) {
                // see if target wants to handle move
                var target = this._getTarget(e);
                if (this._dispatchEvent(e, 'mousemove', target)) {
                    this._lastTouch = e;
                    e.preventDefault();
                    return;
                }
                // start dragging
                if (this._dragSource && !this._img) {
                    var delta = this._getDelta(e);
                    if (delta > DragDropTouch._THRESHOLD) {
                        this._dispatchEvent(e, 'dragstart', this._dragSource);
                        this._createImage(e);
                        this._dispatchEvent(e, 'dragenter', target);
                    }
                }
                // continue dragging
                if (this._img) {
                    this._lastTouch = e;
                    e.preventDefault(); // prevent scrolling
                    if (target != this._lastTarget) {
                        this._dispatchEvent(this._lastTouch, 'dragleave', this._lastTarget);
                        this._dispatchEvent(e, 'dragenter', target);
                        this._lastTarget = target;
                    }
                    this._moveImage(e);
                    this._dispatchEvent(e, 'dragover', target);
                }
            }
        };
        DragDropTouch.prototype._touchend = function (e) {
            if (this._shouldHandle(e)) {
                // see if target wants to handle up
                if (this._dispatchEvent(this._lastTouch, 'mouseup', e.target)) {
                    e.preventDefault();
                    return;
                }
                // user clicked the element but didn't drag, so clear the source and simulate a click
                if (!this._img) {
                    this._dragSource = null;
                    this._dispatchEvent(this._lastTouch, 'click', e.target);
                    this._lastClick = Date.now();
                }
                // finish dragging
                this._destroyImage();
                if (this._dragSource) {
                    if (e.type.indexOf('cancel') < 0) {
                        this._dispatchEvent(this._lastTouch, 'drop', this._lastTarget);
                    }
                    this._dispatchEvent(this._lastTouch, 'dragend', this._dragSource);
                    this._reset();
                }
            }
        };
        // ** utilities
        // ignore events that have been handled or that involve more than one touch
        DragDropTouch.prototype._shouldHandle = function (e) {
            return e && !e.defaultPrevented && e.touches && e.touches.length < 2;
        };
        // clear all members
        DragDropTouch.prototype._reset = function () {
            this._destroyImage();
            this._dragSource = null;
            this._lastTouch = null;
            this._lastTarget = null;
            this._ptDown = null;
            this._dataTransfer = new DataTransfer();
        };
        // get point for a touch event
        DragDropTouch.prototype._getPoint = function (e, page) {
            if (e && e.touches) {
                e = e.touches[0];
            }
            return { x: page ? e.pageX : e.clientX, y: page ? e.pageY : e.clientY };
        };
        // get distance between the current touch event and the first one
        DragDropTouch.prototype._getDelta = function (e) {
            var p = this._getPoint(e);
            return Math.abs(p.x - this._ptDown.x) + Math.abs(p.y - this._ptDown.y);
        };
        // get the element at a given touch event
        DragDropTouch.prototype._getTarget = function (e) {
            var pt = this._getPoint(e),
                el = document.elementFromPoint(pt.x, pt.y);
            while (el && getComputedStyle(el).pointerEvents == 'none') {
                el = el.parentElement;
            }
            return el;
        };
        // create drag image from source element
        DragDropTouch.prototype._createImage = function (e) {
            // just in case...
            if (this._img) {
                this._destroyImage();
            }
            // create drag image from custom element or drag source
            var src = this._imgCustom || this._dragSource;
            this._img = src.cloneNode(true);
            this._copyStyle(src, this._img);
            this._img.style.top = this._img.style.left = '-9999px';
            this._img.style['-webkit-transform'] = 'translateX(-9999px) translateY(-9999px)';
            // if creating from drag source, apply offset and opacity
            if (!this._imgCustom) {
                var rc = src.getBoundingClientRect(),
                    pt = this._getPoint(e);
                this._imgOffset = {
                    x: pt.x - rc.left,
                    y: pt.y - rc.top
                };
                this._img.style.opacity = DragDropTouch._OPACITY.toString();
            }
            // add image to document
            this._moveImage(e);
            document.body.appendChild(this._img);
        };
        // dispose of drag image element
        DragDropTouch.prototype._destroyImage = function () {
            if (this._img && this._img.parentElement) {
                this._img.parentElement.removeChild(this._img);
            }
            this._img = null;
            this._imgCustom = null;
        };
        // move the drag image element
        DragDropTouch.prototype._moveImage = function (e) {
            var _this = this;
            requestAnimationFrame(function () {
                var pt = _this._getPoint(e, true),
                    s = _this._img.style;
                s.position = 'fixed';
                s.pointerEvents = 'none';
                s.zIndex = '999999';
                s.top = s.left = '0px';
                var left = Math.round(pt.x - _this._imgOffset.x);
                var top = Math.round(pt.y - _this._imgOffset.y);
            });
        };
        // copy properties from an object to another
        DragDropTouch.prototype._copyProps = function (dst, src, props) {
            for (var i = 0; i < props.length; i++) {
                var p = props[i];
                dst[p] = src[p];
            }
        };
        DragDropTouch.prototype._copyStyle = function (src, dst) {
            // remove potentially troublesome attributes
            DragDropTouch._rmvAtts.forEach(function (att) {
                dst.removeAttribute(att);
            });
            // copy canvas content
            if (src instanceof HTMLCanvasElement) {
                var cSrc = src,
                    cDst = dst;
                cDst.width = cSrc.width;
                cDst.height = cSrc.height;
                cDst.getContext('2d').drawImage(cSrc, 0, 0);
            }
            // copy style
            var cs = getComputedStyle(src);
            for (var i = 0; i < cs.length; i++) {
                var key = cs[i];
                dst.style[key] = cs[key];
            }
            dst.style.pointerEvents = 'none';
            // and repeat for all children
            for (var i = 0; i < src.children.length; i++) {
                this._copyStyle(src.children[i], dst.children[i]);
            }
        };
        DragDropTouch.prototype._dispatchEvent = function (e, type, target) {
            if (e && target) {
                var evt = document.createEvent('Event'),
                    t = e.touches ? e.touches[0] : e;
                evt.initEvent(type, true, true);
                evt.button = 0;
                evt.which = evt.buttons = 1;
                this._copyProps(evt, e, DragDropTouch._kbdProps);
                this._copyProps(evt, t, DragDropTouch._ptProps);
                evt.dataTransfer = this._dataTransfer;
                target.dispatchEvent(evt);
                return evt.defaultPrevented;
            }
            return false;
        };
        // gets an element's closest draggable ancestor
        DragDropTouch.prototype._closestDraggable = function (e) {
            for (; e; e = e.parentElement) {
                if (e.hasAttribute('draggable')) {
                    return e;
                }
            }
            return null;
        };
        /*private*/DragDropTouch._instance = new DragDropTouch(); // singleton
        // constants
        DragDropTouch._THRESHOLD = 5; // pixels to move before drag starts
        DragDropTouch._OPACITY = 0.5; // drag image opacity
        DragDropTouch._DBLCLICK = 500; // max ms between clicks in a double click
        DragDropTouch._CTXMENU = 900; // ms to hold before raising 'contextmenu' event
        // copy styles/attributes from drag source to drag image element
        DragDropTouch._rmvAtts = 'id,class,style,draggable'.split(',');
        // synthesize and dispatch an event
        // returns true if the event has been handled (e.preventDefault == true)
        DragDropTouch._kbdProps = 'altKey,ctrlKey,metaKey,shiftKey'.split(',');
        DragDropTouch._ptProps = 'pageX,pageY,clientX,clientY,screenX,screenY'.split(',');
        return DragDropTouch;
    }();
    DragDropTouch_1.DragDropTouch = DragDropTouch;
})(DragDropTouch || (DragDropTouch = {}));
//# sourceMappingURL=DragDropTouchNoWijmo.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = __webpack_require__(2);

var _moment2 = _interopRequireDefault(_moment);

var _helpers = __webpack_require__(3);

var _reactDatetime = __webpack_require__(15);

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

__webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // @flow


var now = new Date();

var ReactAgendaCtrl = function (_Component) {
  _inherits(ReactAgendaCtrl, _Component);

  function ReactAgendaCtrl() {
    _classCallCheck(this, ReactAgendaCtrl);

    var _this = _possibleConstructorReturn(this, (ReactAgendaCtrl.__proto__ || Object.getPrototypeOf(ReactAgendaCtrl)).call(this));

    _this.state = {
      editMode: false,
      showCtrl: false,
      multiple: {},
      name: '',
      classes: 'priority-1',
      startDateTime: now,
      endDateTime: now
    };
    _this.handleDateChange = _this.handleDateChange.bind(_this);
    _this.addEvent = _this.addEvent.bind(_this);
    _this.updateEvent = _this.updateEvent.bind(_this);
    _this.dispatchEvent = _this.dispatchEvent.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleEdit = _this.handleEdit.bind(_this);
    return _this;
  }

  _createClass(ReactAgendaCtrl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      if (this.props.itemColors) {
        this.setState({
          classes: Object.keys(this.props.itemColors)[0]
        });
      }
      setTimeout(function () {
        if (this.refs.eventName) {
          this.refs.eventName.focus();
        }
      }.bind(this), 50);

      if (!this.props.selectedCells) {
        var start = now;
        var endT = (0, _moment2.default)(now).add(15, 'Minutes');
        return this.setState({ editMode: false, name: '', startDateTime: start, endDateTime: endT });
      }

      if (this.props.selectedCells && this.props.selectedCells[0] && this.props.selectedCells[0]._id) {

        var _start = (0, _moment2.default)(this.props.selectedCells[0].startDateTime);
        var _endT = (0, _moment2.default)(this.props.selectedCells[0].endDateTime);

        return this.setState({ editMode: true, name: this.props.selectedCells[0].name, classes: this.props.selectedCells[0].classes, startDateTime: _start, endDateTime: _endT });
      }

      if (this.props.selectedCells && this.props.selectedCells.length === 1) {
        var _start2 = (0, _moment2.default)((0, _helpers.getFirst)(this.props.selectedCells));
        var _endT2 = (0, _moment2.default)((0, _helpers.getLast)(this.props.selectedCells)).add(15, 'Minutes');
        return this.setState({ editMode: false, name: '', startDateTime: _start2, endDateTime: _endT2 });
      }

      if (this.props.selectedCells && this.props.selectedCells.length > 0) {
        var _start3 = (0, _moment2.default)((0, _helpers.getFirst)(this.props.selectedCells));
        var _endT3 = (0, _moment2.default)((0, _helpers.getLast)(this.props.selectedCells)) || now;
        this.setState({ editMode: false, name: '', startDateTime: _start3, endDateTime: _endT3 });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      if (event.target.tagName === 'BUTTON') {
        event.preventDefault();
      }

      var data = this.state;
      data[event.target.name] = event.target.value;

      this.setState(data);
    }
  }, {
    key: 'handleDateChange',
    value: function handleDateChange(ev, date) {
      var endD = (0, _moment2.default)(this.state.endDateTime);
      var data = this.state;
      data[ev] = date;

      if (ev === 'startDateTime' && endD.diff(date) < 0) {
        data['endDateTime'] = (0, _moment2.default)(date).add(15, 'minutes');
      }

      this.setState(data);
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(obj) {
      var newAdded = [];
      var items = this.props.items;
      if (obj['multiple']) {
        var array = obj['multiple'];
        Object.keys(array).forEach(function (key) {
          var newAr = array[key].filter(function (val, ind) {
            return array[key].indexOf(val) == ind;
          });
          var start = newAr[0];
          var endT = newAr[newAr.length - 1] || now;
          var lasobj = {
            _id: (0, _helpers.guid)(),
            name: obj.name,
            startDateTime: new Date(start),
            endDateTime: new Date(endT),
            classes: obj.classes
          };
          items.push(lasobj);
          newAdded.push(lasobj);
        }.bind(this));
        return this.props.Addnew(items, newAdded);
      }

      obj._id = (0, _helpers.guid)();
      items.push(obj);
      this.props.Addnew(items, obj);
    }
  }, {
    key: 'addEvent',
    value: function addEvent(e) {
      if (this.state.name.length < 1) {
        return;
      }

      if (this.props.selectedCells && this.props.selectedCells.length > 0) {

        var obj = this.props.selectedCells.reduce(function (r, v, i, a) {
          var k = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : v.substring(0, 10);
          return (r[k] = r[k] || []).push(v), r;
        }, {});

        if (Object.values(obj).length > 1) {
          var newObj = {
            name: this.state.name,
            startDateTime: new Date(this.state.startDateTime),
            endDateTime: new Date(this.state.endDateTime),
            classes: this.state.classes,
            multiple: obj
          };

          return this.dispatchEvent(newObj);
        }
      }

      var newObj = {
        name: this.state.name,
        startDateTime: new Date(this.state.startDateTime),
        endDateTime: new Date(this.state.endDateTime),
        classes: this.state.classes
      };

      this.dispatchEvent(newObj);
    }
  }, {
    key: 'updateEvent',
    value: function updateEvent(e) {
      if (this.props.selectedCells[0]._id && this.props.items) {

        var newObj = {
          _id: this.props.selectedCells[0]._id,
          name: this.state.name,
          startDateTime: new Date(this.state.startDateTime),
          endDateTime: new Date(this.state.endDateTime),
          classes: this.state.classes
        };
        var items = this.props.items;
        for (var i = 0; i < items.length; i++) {
          if (items[i]._id === newObj._id) items[i] = newObj;
        }
        if (this.props.edit) {
          this.props.edit(items, newObj);
        }
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      this.addEvent(e);
    }
  }, {
    key: 'handleEdit',
    value: function handleEdit(e) {
      e.preventDefault();
      this.updateEvent(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var itc = Object.keys(this.props.itemColors);
      var colors = itc.map(function (item, idx) {

        return _react2.default.createElement(
          'div',
          { style: {
              background: this.props.itemColors[item]
            }, className: 'agendCtrls-radio-buttons', key: item },
          _react2.default.createElement('button', { name: 'classes', value: item, className: this.state.classes === item ? 'agendCtrls-radio-button--checked' : 'agendCtrls-radio-button', onClick: this.handleChange.bind(this) })
        );
      }.bind(this));

      var divStyle = {};

      if (this.state.editMode) {

        var select = this.props.selectedCells[0];

        return _react2.default.createElement(
          'div',
          { className: 'agendCtrls-wrapper', style: divStyle },
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleEdit },
            _react2.default.createElement(
              'div',
              { className: 'agendCtrls-label-wrapper' },
              _react2.default.createElement(
                'div',
                { className: 'agendCtrls-label-inline' },
                _react2.default.createElement(
                  'label',
                  null,
                  'Event name'
                ),
                _react2.default.createElement('input', { type: 'text', name: 'name', autoFocus: true, ref: 'eventName', className: 'agendCtrls-event-input', value: this.state.name, onChange: this.handleChange.bind(this), placeholder: 'Event Name' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'agendCtrls-label-inline ' },
                _react2.default.createElement(
                  'label',
                  null,
                  'Color'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'agendCtrls-radio-wrapper' },
                  colors
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'agendCtrls-timePicker-wrapper' },
              _react2.default.createElement(
                'div',
                { className: 'agendCtrls-time-picker' },
                _react2.default.createElement(
                  'label',
                  null,
                  'Start Date'
                ),
                _react2.default.createElement(_reactDatetime2.default, { value: this.state.startDateTime, onChange: this.handleDateChange.bind(null, 'startDateTime'), input: false, viewMode: 'time' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'agendCtrls-time-picker' },
                _react2.default.createElement(
                  'label',
                  null,
                  'End Date'
                ),
                _react2.default.createElement(_reactDatetime2.default, { value: this.state.endDateTime, onChange: this.handleDateChange.bind(null, 'endDateTime'), input: false, viewMode: 'time' })
              )
            ),
            _react2.default.createElement('input', { type: 'submit', value: 'Save' })
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'agendCtrls-wrapper', style: divStyle },
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            'div',
            { className: 'agendCtrls-label-wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'agendCtrls-label-inline' },
              _react2.default.createElement(
                'label',
                null,
                'Event name'
              ),
              _react2.default.createElement('input', { type: 'text', ref: 'eventName', autoFocus: true, name: 'name', className: 'agendCtrls-event-input', value: this.state.name, onChange: this.handleChange.bind(this), placeholder: 'Event Name' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'agendCtrls-label-inline' },
              _react2.default.createElement(
                'label',
                null,
                'Color'
              ),
              _react2.default.createElement(
                'div',
                { className: 'agendCtrls-radio-wrapper' },
                colors
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'agendCtrls-timePicker-wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'agendCtrls-time-picker' },
              _react2.default.createElement(
                'label',
                null,
                'Start Date'
              ),
              _react2.default.createElement(_reactDatetime2.default, { value: this.state.startDateTime, onChange: this.handleDateChange.bind(null, 'startDateTime'), input: false, viewMode: 'time' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'agendCtrls-time-picker' },
              _react2.default.createElement(
                'label',
                null,
                'End Date'
              ),
              _react2.default.createElement(_reactDatetime2.default, { value: this.state.endDateTime, onChange: this.handleDateChange.bind(null, 'endDateTime'), input: false, viewMode: 'time' })
            )
          ),
          _react2.default.createElement('input', { type: 'submit', value: 'Save' })
        )
      );
    }
  }]);

  return ReactAgendaCtrl;
}(_react.Component);

exports.default = ReactAgendaCtrl;


ReactAgendaCtrl.propTypes = {
  items: _propTypes2.default.array,
  itemColors: _propTypes2.default.object,
  selectedCells: _propTypes2.default.array,
  edit: _propTypes2.default.func,
  Addnew: _propTypes2.default.func

};

ReactAgendaCtrl.defaultProps = {
  items: [],
  itemColors: {},
  selectedCells: []
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-datetime");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalView = function (_Component) {
  _inherits(ModalView, _Component);

  function ModalView() {
    _classCallCheck(this, ModalView);

    return _possibleConstructorReturn(this, (ModalView.__proto__ || Object.getPrototypeOf(ModalView)).apply(this, arguments));
  }

  _createClass(ModalView, [{
    key: 'render',
    value: function render() {
      if (this.props.frameless) {
        return _react2.default.createElement(
          'div',
          { className: 'modal-nude  box-card' },
          _react2.default.createElement(
            'a',
            { onClick: this.props.closeFunc, className: 'modal-close' },
            'X'
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-title' },
            ' ',
            this.props.title
          ),
          this.props.children
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'modal  box-card' },
        _react2.default.createElement(
          'a',
          { onClick: this.props.closeFunc, className: 'modal-close' },
          'X'
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-title' },
          ' ',
          this.props.title
        ),
        this.props.children
      );
    }
  }]);

  return ModalView;
}(_react.Component);

ModalView.propTypes = {
  title: _propTypes2.default.string,
  frameless: _propTypes2.default.bool,
  children: _propTypes2.default.element,
  closeFunc: _propTypes2.default.func

};

ModalView.defaultProps = {
  title: '',
  frameless: false
};

var Modal = function (_Component2) {
  _inherits(Modal, _Component2);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this2 = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this2.clickedOutside = _this2.clickedOutside.bind(_this2);
    _this2.closeFunc = _this2.closeFunc.bind(_this2);

    return _this2;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.modalWrapperTarget = document.createElement('div');

      this.modalWrapperTarget.className = "modal-wrapper";

      this.modalWrapperTarget.addEventListener('click', this.clickedOutside);
      this.modalWrapperTarget.addEventListener('click', this.clickedOutside);
      this.modalWrapperTarget.addEventListener('keydown', this.clickedOutside, true);

      document.body.appendChild(this.modalWrapperTarget);
      this._render();
    }
  }, {
    key: 'clickedOutside',
    value: function clickedOutside(e) {

      if (e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) {
        e.preventDefault();
        this.props.clickOutside(e);
        return false;
      }

      if (this.props.clickOutside && e.target.classList.contains('modal-wrapper')) {
        this.props.clickOutside(e);
      }
    }
  }, {
    key: 'closeFunc',
    value: function closeFunc(e) {
      if (this.props.clickOutside) {
        this.props.clickOutside(e);
      }
    }
  }, {
    key: '_render',
    value: function _render() {

      _reactDom2.default.render(_react2.default.createElement(ModalView, { children: this.props.children, closeFunc: this.closeFunc, title: this.props.title, frameless: this.props.frameless }), this.modalWrapperTarget);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._render();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      this.modalWrapperTarget.removeEventListener('click', this.clickedOutside);
      this.modalWrapperTarget.removeEventListener('keydown', this.clickedOutside);
      _reactDom2.default.unmountComponentAtNode(this.modalWrapperTarget);
      document.body.removeChild(this.modalWrapperTarget);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('noscript', null);
    }
  }]);

  return Modal;
}(_react.Component);

exports.default = Modal;


Modal.propTypes = {
  title: _propTypes2.default.string,
  frameless: _propTypes2.default.bool,
  children: _propTypes2.default.element,
  closeFunc: _propTypes2.default.func

};

Modal.defaultProps = {
  title: '',
  frameless: false
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);