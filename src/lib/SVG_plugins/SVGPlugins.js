// import { Box, extend, on, off, G} from 'svg.js';
// import SVG from 'svg.js';
//
// // Our Object which manages drawing
// function PaintHandler(el, event, options) {
//
//   this.el = el;
//   el.remember('_paintHandler', this);
//
//   var _this = this,
//     plugin = this.getPlugin();
//
//   this.parent = el.parent(SVG.Nested) || el.parent(SVG.Doc);
//   this.p = this.parent.node.createSVGPoint(); // Helping point for coord transformation
//   this.m = null;  // transformation matrix. We get it when drawing starts
//   this.startPoint = null;
//   this.lastUpdateCall = null;
//   this.options = {};
//   this.set = new SVG.Set();
//
//   // Merge options and defaults
//   for (var i in this.el.draw.defaults) {
//     this.options[i] = this.el.draw.defaults[i];
//     if (typeof options[i] !== 'undefined') {
//       this.options[i] = options[i];
//     }
//   }
//
//   if(plugin.point) {
//     plugin['pointPlugin'] = plugin.point;
//     delete plugin.point;
//   }
//
//   // Import all methods from plugin into object
//   for (var i in plugin){
//     this[i] = plugin[i];
//   }
//
//   // When we got an event, we use this for start, otherwise we use the click-event as default
//   if (!event) {
//     this.parent.on('click.draw', function (e) {
//       _this.start(e);
//     });
//
//   }
//
// }
//
// PaintHandler.prototype.transformPoint = function(x, y){
//
//   this.p.x = x - (this.offset.x - window.pageXOffset);
//   this.p.y = y - (this.offset.y - window.pageYOffset);
//
//   return this.p.matrixTransform(this.m);
//
// }
//
// PaintHandler.prototype.start = function (event) {
//
//   var _this = this;
//
//   // get the current transform matrix from screen to element (offset corrected)
//   this.m = this.el.node.getScreenCTM().inverse();
//
//   // we save the current scrolling-offset here
//   this.offset = { x: window.pageXOffset, y: window.pageYOffset };
//
//   // we want to snap in screen-coords, so we have to scale the snapToGrid accordingly
//   this.options.snapToGrid *= Math.sqrt(this.m.a * this.m.a + this.m.b * this.m.b)
//
//   // save the startpoint
//   this.startPoint = this.snapToGrid(this.transformPoint(event.clientX, event.clientY));
//
//   // the plugin may do some initial work
//   if(this.init){ this.init(event); }
//
//   // Fire our `drawstart`-event. We send the offset-corrected cursor-position along
//   this.el.fire('drawstart', {event:event, p:this.p, m:this.m});
//
//   // We need to bind the update-function to the mousemove event to keep track of the cursor
//   SVG.on(window, 'mousemove.draw', function (e) {
//     _this.update(e);
//   });
//
//   // Every consecutive call to start should map to point now
//   this.start = this.point;
//
//
// };
//
// // This function draws a point if the element is a polyline or polygon
// // Otherwise it will just stop drawing the shape cause we are done
// PaintHandler.prototype.point = function (event) {
//   if (this.point != this.start) return this.start(event);
//
//   if (this.pointPlugin) {
//     return this.pointPlugin(event);
//   }
//
//   // If this function is not overwritten we just call stop
//   this.stop(event);
// };
//
//
// // The stop-function does the cleanup work
// PaintHandler.prototype.stop = function (event) {
//   if (event) {
//     this.update(event);
//   }
//
//   // Plugin may want to clean something
//   if(this.clean){ this.clean(); }
//
//   // Unbind from all events
//   SVG.off(window, 'mousemove.draw');
//   this.parent.off('click.draw');
//
//   // remove Refernce to PaintHandler
//   this.el.forget('_paintHandler');
//
//   // overwrite draw-function since we never need it again for this element
//   this.el.draw = function () {
//   };
//
//   // Fire the `drawstop`-event
//   this.el.fire('drawstop');
// };
//
// // Updates the element while moving the cursor
// PaintHandler.prototype.update = function (event) {
//
//   if(!event && this.lastUpdateCall){
//     event = this.lastUpdateCall;
//   }
//
//   this.lastUpdateCall = event;
//
//   // Get the current transform matrix
//   // it could have been changed since the start or the last update call
//   this.m = this.el.node.getScreenCTM().inverse();
//
//   // Call the calc-function which calculates the new position and size
//   this.calc(event);
//
//   // Fire the `drawupdate`-event
//   this.el.fire('drawupdate', {event:event, p:this.p, m:this.m});
// };
//
// // Called from outside. Finishs a poly-element
// PaintHandler.prototype.done = function () {
//   this.calc();
//   this.stop();
//
//   this.el.fire('drawdone');
// };
//
// // Called from outside. Cancels a poly-element
// PaintHandler.prototype.cancel = function () {
//   // stop drawing and remove the element
//   this.stop();
//   this.el.remove();
//
//   this.el.fire('drawcancel');
// };
//
// // Calculate the corrected position when using `snapToGrid`
// PaintHandler.prototype.snapToGrid = function (draw) {
//
//   var temp = null;
//
//   // An array was given. Loop through every element
//   if (draw.length) {
//     temp = [draw[0] % this.options.snapToGrid, draw[1] % this.options.snapToGrid];
//     draw[0] -= temp[0] < this.options.snapToGrid / 2 ? temp[0] : temp[0] - this.options.snapToGrid;
//     draw[1] -= temp[1] < this.options.snapToGrid / 2 ? temp[1] : temp[1] - this.options.snapToGrid;
//     return draw;
//   }
//
//   // Properties of element were given. Snap them all
//   for (var i in draw) {
//     temp = draw[i] % this.options.snapToGrid;
//     draw[i] -= (temp < this.options.snapToGrid / 2 ? temp : temp - this.options.snapToGrid) + (temp < 0 ? this.options.snapToGrid : 0);
//   }
//
//   return draw;
// };
//
// PaintHandler.prototype.param = function (key, value) {
//   this.options[key] = value === null ? this.el.draw.defaults[key] : value;
//   this.update();
// };
//
// // Returns the plugin
// PaintHandler.prototype.getPlugin = function () {
//   return this.el.draw.plugins[this.el.type];
// };
//
// SVG.Element.prototype.draw.extend('circle', {
//
//   init:function(e){
//
//     var p = this.startPoint;
//
//     this.el.attr({ cx: p.x, cy: p.y, r: 1 });
//   },
//
//   // We determine the radius by the cursor position
//   calc:function (e) {
//
//     var p = this.transformPoint(e.clientX, e.clientY),
//       circle = {
//         cx: this.startPoint.x,
//         cy: this.startPoint.y,
//
//         // calculating the radius
//         r: Math.sqrt(
//           (p.x - this.startPoint.x) * (p.x - this.startPoint.x) +
//           (p.y - this.startPoint.y) * (p.y - this.startPoint.y)
//         )
//       };
//
//     this.snapToGrid(circle);
//     this.el.attr(circle);
//   }
//
// });
//
// SVG.Element.prototype.draw.extend('ellipse', {
//
//   init:function(e){
//     // We start with a circle with radius 1 at the position of the cursor
//     var p = this.startPoint;
//
//     this.el.attr({ cx: p.x, cy: p.y, rx: 1, ry: 1 });
//
//   },
//
//   calc:function (e) {
//     var p = this.transformPoint(e.clientX, e.clientY);
//
//     var ellipse = {
//       cx: this.startPoint.x,
//       cy: this.startPoint.y,
//       rx: Math.abs(p.x - this.startPoint.x),
//       ry: Math.abs(p.y - this.startPoint.y)
//     };
//
//     this.snapToGrid(ellipse);
//     this.el.attr(ellipse);
//   }
//
// });
//
// SVG.Element.prototype.draw.extend('line polyline polygon', {
//
//   init:function(e){
//     // When we draw a polygon, we immediately need 2 points.
//     // One start-point and one point at the mouse-position
//
//     this.set = new SVG.Set();
//
//     var p = this.startPoint,
//       arr = [
//         [p.x, p.y],
//         [p.x, p.y]
//       ];
//
//     this.el.plot(arr);
//
//     // We draw little circles around each point
//     // This is absolutely not needed and maybe removed in a later release
//     this.drawCircles();
//
//   },
//
//
//   // The calc-function sets the position of the last point to the mouse-position (with offset ofc)
//   calc:function (e) {
//     var arr = this.el.array().valueOf();
//     arr.pop();
//
//     if (e) {
//       var p = this.transformPoint(e.clientX, e.clientY);
//       arr.push(this.snapToGrid([p.x, p.y]));
//     }
//
//     this.el.plot(arr);
//     this.drawCircles();
//   },
//
//   point:function(e){
//
//     if (this.el.type.indexOf('poly') > -1) {
//       // Add the new Point to the point-array
//       var p = this.transformPoint(e.clientX, e.clientY),
//         arr = this.el.array().valueOf();
//
//       arr.push(this.snapToGrid([p.x, p.y]));
//
//       this.el.plot(arr);
//       this.drawCircles();
//
//       // Fire the `drawpoint`-event, which holds the coords of the new Point
//       this.el.fire('drawpoint', {event:e, p:{x:p.x, y:p.y}, m:this.m});
//
//       return;
//     }
//
//     // We are done, if the element is no polyline or polygon
//     this.stop(e);
//
//   },
//
//   clean:function(){
//
//     // Remove all circles
//     this.set.each(function () {
//       this.remove();
//     });
//
//     this.set.clear();
//
//     delete this.set;
//
//   },
//
//   drawCircles:function () {
//     var array = this.el.array().valueOf()
//
//     this.set.each(function () {
//       this.remove();
//     });
//
//     this.set.clear();
//
//     for (var i = 0; i < array.length; ++i) {
//
//       this.p.x = array[i][0]
//       this.p.y = array[i][1]
//
//       var p = this.p.matrixTransform(this.parent.node.getScreenCTM().inverse().multiply(this.el.node.getScreenCTM()));
//
//       this.set.add(this.parent.circle(5).stroke({width: 1}).fill('#ccc').center(p.x, p.y));
//     }
//   },
//
//   undo:function() {
//     if (this.set.length()) {
//       this.set.members.splice(-2, 1)[0].remove();
//       this.el.array().value.splice(-2, 1);
//       this.el.plot(this.el.array());
//       this.el.fire('undopoint');
//     }
//   },
// });
//
// SVG.Element.prototype.draw.extend('rect image', {
//
//   init:function(e){
//
//     var p = this.startPoint;
//
//     this.el.attr({ x: p.x, y: p.y, height: 0, width: 0 });
//   },
//
//   calc:function (e) {
//
//     var rect = {
//       x: this.startPoint.x,
//       y: this.startPoint.y
//     },  p = this.transformPoint(e.clientX, e.clientY);
//
//     rect.width = p.x - rect.x;
//     rect.height = p.y - rect.y;
//
//     // Snap the params to the grid we specified
//     this.snapToGrid(rect);
//
//     // When width is less than zero, we have to draw to the left
//     // which means we have to move the start-point to the left
//     if (rect.width < 0) {
//       rect.x = rect.x + rect.width;
//       rect.width = -rect.width;
//     }
//
//     // ...same with height
//     if (rect.height < 0) {
//       rect.y = rect.y + rect.height;
//       rect.height = -rect.height;
//     }
//
//     // draw the element
//     this.el.attr(rect);
//   }
//
// });
//
// function SelectHandler(el) {
//
//   this.el = el;
//   el.remember('_selectHandler', this);
//   this.pointSelection = { isSelected: false };
//   this.rectSelection = { isSelected: false };
//
//   // helper list with position settings of each type of point
//   this.pointsList = {
//     lt: [0, 0],
//     rt: ['width', 0],
//     rb: ['width', 'height'],
//     lb: [0, 'height'],
//     t: ['width', 0],
//     r: ['width', 'height'],
//     b: ['width', 'height'],
//     l: [0, 'height']
//   };
//
//   // helper function to get point coordinates based on settings above and an object (bbox in our case)
//   this.pointCoord = function (setting, object, isPointCentered) {
//     var coord = typeof setting !== 'string' ? setting : object[setting];
//     // Top, bottom, right and left points are placed in the center of element width/height
//     return isPointCentered ? coord / 2 : coord
//   }
//
//   this.pointCoords = function (point, object) {
//     var settings = this.pointsList[point];
//
//     return {
//       x: this.pointCoord(settings[0], object, (point === 't' || point === 'b')),
//       y: this.pointCoord(settings[1], object, (point === 'r' || point === 'l'))
//     }
//   }
// }
//
// SelectHandler.prototype.init = function (value, options) {
//
//   var bbox = this.el.bbox();
//   this.options = {};
//
//   // store defaults list of points in order to verify users config
//   var points = this.el.selectize.defaults.points;
//
//   // Merging the defaults and the options-object together
//   for (var i in this.el.selectize.defaults) {
//     this.options[i] = this.el.selectize.defaults[i];
//     if (options[i] !== undefined) {
//       this.options[i] = options[i];
//     }
//   }
//
//   // prepare & validate list of points to be added (or excluded)
//   var pointsLists = ['points', 'pointsExclude'];
//
//   for (var i in pointsLists) {
//     var option = this.options[pointsLists[i]];
//
//     if (typeof option === 'string') {
//       if (option.length > 0) {
//         // if set as comma separated string list => convert it into an array
//         option = option.split(/\s*,\s*/i);
//       } else {
//         option = [];
//       }
//     } else if (typeof option === 'boolean' && pointsLists[i] === 'points') {
//       // this is not needed, but let's have it for legacy support
//       option = option ? points : [];
//     }
//
//     this.options[pointsLists[i]] = option;
//   }
//
//   // intersect correct all points options with users config (exclude unwanted points)
//   // ES5 -> NO arrow functions nor Array.includes()
//   this.options.points = [points, this.options.points].reduce(
//     function (a, b) {
//       return a.filter(
//         function (c) {
//           return b.indexOf(c) > -1;
//         }
//       )
//     }
//   );
//
//   // exclude pointsExclude, if wanted
//   this.options.points = [this.options.points, this.options.pointsExclude].reduce(
//     function (a, b) {
//       return a.filter(
//         function (c) {
//           return b.indexOf(c) < 0;
//         }
//       )
//     }
//   );
//
//   this.parent = this.el.parent();
//   this.nested = (this.nested || this.parent.group());
//   this.nested.matrix(new SVG.Matrix(this.el).translate(bbox.x, bbox.y));
//
//   // When deepSelect is enabled and the element is a line/polyline/polygon, draw only points for moving
//   if (this.options.deepSelect && ['line', 'polyline', 'polygon'].indexOf(this.el.type) !== -1) {
//     this.selectPoints(value);
//   } else {
//     this.selectRect(value);
//   }
//
//   this.observe();
//   this.cleanup();
//
// };
//
// SelectHandler.prototype.selectPoints = function (value) {
//
//   this.pointSelection.isSelected = value;
//
//   // When set is already there we dont have to create one
//   if (this.pointSelection.set) {
//     return this;
//   }
//
//   // Create our set of elements
//   this.pointSelection.set = this.parent.set();
//   // draw the points and mark the element as selected
//   this.drawPoints();
//
//   return this;
//
// };
//
// // create the point-array which contains the 2 points of a line or simply the points-array of polyline/polygon
// SelectHandler.prototype.getPointArray = function () {
//   var bbox = this.el.bbox();
//
//   return this.el.array().valueOf().map(function (el) {
//     return [el[0] - bbox.x, el[1] - bbox.y];
//   });
// };
//
// // Draws a points
// SelectHandler.prototype.drawPoints = function () {
//
//   var _this = this, array = this.getPointArray();
//
//   // go through the array of points
//   for (var i = 0, len = array.length; i < len; ++i) {
//
//     var curriedEvent = (function (k) {
//       return function (ev) {
//         ev = ev || window.event;
//         ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
//         ev.stopPropagation();
//
//         var x = ev.pageX || ev.touches[0].pageX;
//         var y = ev.pageY || ev.touches[0].pageY;
//         _this.el.fire('point', { x: x, y: y, i: k, event: ev });
//       };
//     })(i);
//
//     // add every point to the set
//     // add css-classes and a touchstart-event which fires our event for moving points
//     var point = this.drawPoint(array[i][0], array[i][1])
//       .addClass(this.options.classPoints)
//       .addClass(this.options.classPoints + '_point')
//       .on('touchstart', curriedEvent)
//       .on('mousedown', curriedEvent)
//     this.pointSelection.set.add(point);
//   }
// };
//
// // The function to draw single point
// SelectHandler.prototype.drawPoint = function (cx, cy) {
//   var pointType = this.options.pointType;
//
//   switch (pointType) {
//     case 'circle':
//       return this.drawCircle(cx, cy);
//     case 'rect':
//       return this.drawRect(cx, cy);
//     default:
//       if (typeof pointType === 'function') {
//         return pointType.call(this, cx, cy);
//       }
//
//       throw new Error('Unknown ' + pointType + ' point type!');
//   }
// };
//
// // The function to draw the circle point
// SelectHandler.prototype.drawCircle = function (cx, cy) {
//   return this.nested.circle(this.options.pointSize)
//     .stroke(this.options.pointStroke)
//     .fill(this.options.pointFill)
//     .center(cx, cy);
// };
//
// // The function to draw the rect point
// SelectHandler.prototype.drawRect = function (cx, cy) {
//   return this.nested.rect(this.options.pointSize, this.options.pointSize)
//     .stroke(this.options.pointStroke)
//     .fill(this.options.pointFill)
//     .center(cx, cy);
// };
//
// // every time a point is moved, we have to update the positions of our point
// SelectHandler.prototype.updatePointSelection = function () {
//   var array = this.getPointArray();
//
//   this.pointSelection.set.each(function (i) {
//     if (this.cx() === array[i][0] && this.cy() === array[i][1]) {
//       return;
//     }
//     this.center(array[i][0], array[i][1]);
//   });
// };
//
// SelectHandler.prototype.updateRectSelection = function () {
//   var _this = this, bbox = this.el.bbox();
//
//   this.rectSelection.set.get(0).attr({
//     width: bbox.width,
//     height: bbox.height
//   });
//
//   // set.get(1) is always in the upper left corner. no need to move it
//   if (this.options.points.length) {
//     this.options.points.map(function (point, index) {
//       var coords = _this.pointCoords(point, bbox);
//
//       _this.rectSelection.set.get(index + 1).center(coords.x, coords.y);
//     });
//   }
//
//   if (this.options.rotationPoint) {
//     var length = this.rectSelection.set.length();
//
//     this.rectSelection.set.get(length - 1).center(bbox.width / 2, 20);
//   }
// };
//
// SelectHandler.prototype.selectRect = function (value) {
//
//   var _this = this, bbox = this.el.bbox();
//
//   this.rectSelection.isSelected = value;
//
//   // when set is already p
//   this.rectSelection.set = this.rectSelection.set || this.parent.set();
//
//   // helperFunction to create a mouse-down function which triggers the event specified in `eventName`
//   function getMoseDownFunc(eventName) {
//     return function (ev) {
//       ev = ev || window.event;
//       ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
//       ev.stopPropagation();
//
//       var x = ev.pageX || ev.touches[0].pageX;
//       var y = ev.pageY || ev.touches[0].pageY;
//       _this.el.fire(eventName, { x: x, y: y, event: ev });
//     };
//   }
//
//   // create the selection-rectangle and add the css-class
//   if (!this.rectSelection.set.get(0)) {
//     this.rectSelection.set.add(this.nested.rect(bbox.width, bbox.height).addClass(this.options.classRect));
//   }
//
//   // Draw Points at the edges, if enabled
//   if (this.options.points.length && this.rectSelection.set.length() < 2) {
//     var ename = "touchstart", mname = "mousedown";
//
//     this.options.points.map(function (point, index) {
//       var coords = _this.pointCoords(point, bbox);
//
//       var pointElement = _this.drawPoint(coords.x, coords.y)
//         .attr('class', _this.options.classPoints + '_' + point)
//         .on(mname, getMoseDownFunc(point))
//         .on(ename, getMoseDownFunc(point));
//       _this.rectSelection.set.add(pointElement);
//     });
//
//     this.rectSelection.set.each(function () {
//       this.addClass(_this.options.classPoints);
//     });
//   }
//
//   // draw rotationPint, if enabled
//   if (this.options.rotationPoint && ((this.options.points && !this.rectSelection.set.get(9)) || (!this.options.points && !this.rectSelection.set.get(1)))) {
//
//     var curriedEvent = function (ev) {
//       ev = ev || window.event;
//       ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
//       ev.stopPropagation();
//
//       var x = ev.pageX || ev.touches[0].pageX;
//       var y = ev.pageY || ev.touches[0].pageY;
//       _this.el.fire('rot', { x: x, y: y, event: ev });
//     };
//
//     var pointElement = this.drawPoint(bbox.width / 2, 20)
//       .attr('class', this.options.classPoints + '_rot')
//       .on("touchstart", curriedEvent)
//       .on("mousedown", curriedEvent);
//     this.rectSelection.set.add(pointElement);
//   }
//
// };
//
// SelectHandler.prototype.handler = function () {
//
//   var bbox = this.el.bbox();
//   this.nested.matrix(new SVG.Matrix(this.el).translate(bbox.x, bbox.y));
//
//   if (this.rectSelection.isSelected) {
//     this.updateRectSelection();
//   }
//
//   if (this.pointSelection.isSelected) {
//     this.updatePointSelection();
//   }
//
// };
//
// SelectHandler.prototype.observe = function () {
//   var _this = this;
//
//   if (MutationObserver) {
//     if (this.rectSelection.isSelected || this.pointSelection.isSelected) {
//       this.observerInst = this.observerInst || new MutationObserver(function () {
//         _this.handler();
//       });
//       this.observerInst.observe(this.el.node, { attributes: true });
//     } else {
//       try {
//         this.observerInst.disconnect();
//         delete this.observerInst;
//       } catch (e) {
//       }
//     }
//   } else {
//     this.el.off('DOMAttrModified.select');
//
//     if (this.rectSelection.isSelected || this.pointSelection.isSelected) {
//       this.el.on('DOMAttrModified.select', function () {
//         _this.handler();
//       });
//     }
//   }
// };
//
// SelectHandler.prototype.cleanup = function () {
//
//   //var _this = this;
//
//   if (!this.rectSelection.isSelected && this.rectSelection.set) {
//     // stop watching the element, remove the selection
//     this.rectSelection.set.each(function () {
//       this.remove();
//     });
//
//     this.rectSelection.set.clear();
//     delete this.rectSelection.set;
//   }
//
//   if (!this.pointSelection.isSelected && this.pointSelection.set) {
//     // Remove all points, clear the set, stop watching the element
//     this.pointSelection.set.each(function () {
//       this.remove();
//     });
//
//     this.pointSelection.set.clear();
//     delete this.pointSelection.set;
//   }
//
//   if (!this.pointSelection.isSelected && !this.rectSelection.isSelected) {
//     this.nested.remove();
//     delete this.nested;
//
//   }
// };
//
//
// SVG.extend(SVG.Element, {
//   // Select element with mouse
//   selectize: function (value, options) {
//
//     // Check the parameters and reassign if needed
//     if (typeof value === 'object') {
//       options = value;
//       value = true;
//     }
//
//     var selectHandler = this.remember('_selectHandler') || new SelectHandler(this);
//
//     selectHandler.init(value === undefined ? true : value, options || {});
//
//     return this;
//
//   }
// });
//
// SVG.Element.prototype.selectize.defaults = {
//   points: ['lt', 'rt', 'rb', 'lb', 't', 'r', 'b', 'l'],    // which points to draw, default all
//   pointsExclude: [],                       // easier option if to exclude few than rewrite all
//   classRect: 'svg_select_boundingRect',    // Css-class added to the rect
//   classPoints: 'svg_select_points',        // Css-class added to the points
//   pointSize: 7,                            // size of point
//   rotationPoint: true,                     // If true, rotation point is drawn. Needed for rotation!
//   deepSelect: false,                       // If true, moving of single points is possible (only line, polyline, polyon)
//   pointType: 'circle',                     // Point type: circle or rect, default circle
//   pointFill: "#000",                       // Point fill color
//   pointStroke: { width: 1, color: "#000" } // Point stroke properties
// };
//
// // import { Box, Element, G, extend, off, on } from 'svg.min.js'
// Box = SVG.Box;
// Element = SVG.Element;
// G = SVG.G;
// extend = SVG.extend;
// off = SVG.off;
// on = SVG.on;
// const getCoordsFromEvent = (ev) => {
//   if (ev.changedTouches) {
//     ev = ev.changedTouches[0]
//   }
//   return { x: ev.clientX, y: ev.clientY }
// }
//
// // Creates handler, saves it
// class DragHandler {
//   constructor(el) {
//     el.remember('_draggable', this)
//     this.el = el
//
//     this.drag = this.drag.bind(this)
//     this.startDrag = this.startDrag.bind(this)
//     this.endDrag = this.endDrag.bind(this)
//   }
//
//   // Enables or disabled drag based on input
//   init(enabled) {
//     if (enabled) {
//       this.el.on('mousedown.drag', this.startDrag)
//       this.el.on('touchstart.drag', this.startDrag)
//     } else {
//       this.el.off('mousedown.drag')
//       this.el.off('touchstart.drag')
//     }
//   }
//
//   // Start dragging
//   startDrag(ev) {
//     const isMouse = !ev.type.indexOf('mouse')
//
//     // Check for left button
//     if (isMouse && (ev.which || ev.buttons) !== 1) {
//       return
//     }
//
//     // Fire beforedrag event
//     if (this.el.fire('beforedrag', { event: ev, handler: this }).defaultPrevented) {
//       return
//     }
//
//     // Prevent browser drag behavior as soon as possible
//     ev.preventDefault()
//
//     // Prevent propagation to a parent that might also have dragging enabled
//     ev.stopPropagation()
//
//     // Make sure that start events are unbound so that one element
//     // is only dragged by one input only
//     this.init(false)
//
//     this.box = this.el.bbox()
//     this.lastClick = this.el.point(getCoordsFromEvent(ev))
//
//     // We consider the drag done, when a touch is canceled, too
//     const eventMove = (isMouse ? 'mousemove' : 'touchmove') + '.drag'
//     const eventEnd = (isMouse ? 'mouseup' : 'touchcancel.drag touchend') + '.drag'
//
//     // Bind drag and end events to window
//     on(window, eventMove, this.drag)
//     on(window, eventEnd, this.endDrag)
//
//     // Fire dragstart event
//     this.el.fire('dragstart', { event: ev, handler: this, box: this.box })
//   }
//
//   // While dragging
//   drag(ev) {
//
//     const { box, lastClick } = this
//
//     const currentClick = this.el.point(getCoordsFromEvent(ev))
//     const x = box.x + (currentClick.x - lastClick.x)
//     const y = box.y + (currentClick.y - lastClick.y)
//     const newBox = new Box(x, y, box.w, box.h)
//
//     if (this.el.fire('dragmove', {
//       event: ev,
//       handler: this,
//       box: newBox
//     }).defaultPrevented) return
//
//     this.move(x, y)
//     return newBox
//   }
//
//   move(x, y) {
//     // Svg elements bbox depends on their content even though they have
//     // x, y, width and height - strange!
//     // Thats why we handle them the same as groups
//     if (this.el.type === 'svg') {
//       G.prototype.move.call(this.el, x, y)
//     } else {
//       this.el.move(x, y)
//     }
//   }
//
//   endDrag(ev) {
//     // final drag
//     const box = this.drag(ev)
//
//     // fire dragend event
//     this.el.fire('dragend', { event: ev, handler: this, box })
//
//     // unbind events
//     off(window, 'mousemove.drag')
//     off(window, 'touchmove.drag')
//     off(window, 'mouseup.drag')
//     off(window, 'touchend.drag')
//
//     // Rebind initial Events
//     this.init(true)
//   }
// }
//
// extend(Element, {
//   draggable(enable = true) {
//     const dragHandler = this.remember('_draggable') || new DragHandler(this)
//     dragHandler.init(enable);
//     return this;
//   }
// })
//
// SVG.extend(SVG.Element, {
//   // Draw element with mouse
//   draw: function (event, options, value) {
//
//     // sort the parameters
//     if (!(event instanceof Event || typeof event === 'string')) {
//       options = event;
//       event = null;
//     }
//
//     // get the old Handler or create a new one from event and options
//     var paintHandler = this.remember('_paintHandler') || new PaintHandler(this, event, options || {});
//
//     // When we got an event we have to start/continue drawing
//     if (event instanceof Event) {
//       paintHandler['start'](event);
//     }
//
//     // if event is located in our PaintHandler we handle it as method
//     if (paintHandler[event]) {
//       paintHandler[event](options, value);
//     }
//
//     return this;
//   }
//
// });
//
// // Default values. Can be changed for the whole project if needed
// SVG.Element.prototype.draw.defaults = {
//   snapToGrid: 1        // Snaps to a grid of `snapToGrid` px
// };
//
// SVG.Element.prototype.draw.extend = function(name, obj){
//
//   var plugins = {};
//   if(typeof name === 'string'){
//     plugins[name] = obj;
//   }else{
//     plugins = name;
//   }
//
//   for(var shapes in plugins){
//     var shapesArr = shapes.trim().split(/\s+/);
//
//     for(var i in shapesArr){
//       SVG.Element.prototype.draw.plugins[shapesArr[i]] = plugins[shapes];
//     }
//   }
//
// };
//
// // Container for all types not specified here
// SVG.Element.prototype.draw.plugins = {};
//
// ; (function () {
//
//   function ResizeHandler(el) {
//
//     el.remember('_resizeHandler', this);
//
//     this.el = el;
//     this.parameters = {};
//     this.lastUpdateCall = null;
//     this.p = el.doc().node.createSVGPoint();
//   }
//
//   ResizeHandler.prototype.transformPoint = function (x, y, m) {
//
//     this.p.x = x - (this.offset.x - window.pageXOffset);
//     this.p.y = y - (this.offset.y - window.pageYOffset);
//
//     return this.p.matrixTransform(m || this.m);
//
//   };
//
//   ResizeHandler.prototype._extractPosition = function (event) {
//     // Extract a position from a mouse/touch event.
//     // Returns { x: .., y: .. }
//     return {
//       x: event.clientX != null ? event.clientX : event.touches[0].clientX,
//       y: event.clientY != null ? event.clientY : event.touches[0].clientY
//     }
//   };
//
//   ResizeHandler.prototype.init = function (options) {
//
//     var _this = this;
//
//     this.stop();
//
//     if (options === 'stop') {
//       return;
//     }
//
//     this.options = {};
//
//     // Merge options and defaults
//     for (var i in this.el.resize.defaults) {
//       this.options[i] = this.el.resize.defaults[i];
//       if (typeof options[i] !== 'undefined') {
//         this.options[i] = options[i];
//       }
//     }
//
//     // We listen to all these events which are specifying different edges
//     this.el.on('lt.resize', function (e) { _this.resize(e || window.event); });  // Left-Top
//     this.el.on('rt.resize', function (e) { _this.resize(e || window.event); });  // Right-Top
//     this.el.on('rb.resize', function (e) { _this.resize(e || window.event); });  // Right-Bottom
//     this.el.on('lb.resize', function (e) { _this.resize(e || window.event); });  // Left-Bottom
//
//     this.el.on('t.resize', function (e) { _this.resize(e || window.event); });   // Top
//     this.el.on('r.resize', function (e) { _this.resize(e || window.event); });   // Right
//     this.el.on('b.resize', function (e) { _this.resize(e || window.event); });   // Bottom
//     this.el.on('l.resize', function (e) { _this.resize(e || window.event); });   // Left
//
//     this.el.on('rot.resize', function (e) { _this.resize(e || window.event); }); // Rotation
//
//     this.el.on('point.resize', function (e) { _this.resize(e || window.event); }); // Point-Moving
//
//     // This call ensures, that the plugin reacts to a change of snapToGrid immediately
//     this.update();
//
//   };
//
//   ResizeHandler.prototype.stop = function () {
//     this.el.off('lt.resize');
//     this.el.off('rt.resize');
//     this.el.off('rb.resize');
//     this.el.off('lb.resize');
//
//     this.el.off('t.resize');
//     this.el.off('r.resize');
//     this.el.off('b.resize');
//     this.el.off('l.resize');
//
//     this.el.off('rot.resize');
//
//     this.el.off('point.resize');
//
//     return this;
//   };
//
//   ResizeHandler.prototype.resize = function (event) {
//     var _this = this;
//     this.m = this.el.node.getScreenCTM().inverse();
//     this.offset = { x: window.pageXOffset, y: window.pageYOffset };
//
//     var txPt = this._extractPosition(event.detail.event);
//     this.parameters = {
//       type: this.el.type, // the type of element
//       p: this.transformPoint(txPt.x, txPt.y),
//       x: event.detail.x,      // x-position of the mouse when resizing started
//       y: event.detail.y,      // y-position of the mouse when resizing started
//       box: this.el.bbox(),    // The bounding-box of the element
//       rotation: this.el.transform().rotation  // The current rotation of the element
//     };
//
//     // Add font-size parameter if the element type is text
//     if (this.el.type === "text") {
//       this.parameters.fontSize = this.el.attr()["font-size"];
//     }
//
//     // the i-param in the event holds the index of the point which is moved, when using `deepSelect`
//     if (event.detail.i !== undefined) {
//
//       // get the point array
//       var array = this.el.array().valueOf();
//
//       // Save the index and the point which is moved
//       this.parameters.i = event.detail.i;
//       this.parameters.pointCoords = [array[event.detail.i][0], array[event.detail.i][1]];
//     }
//
//     // Lets check which edge of the bounding-box was clicked and resize the this.el according to this
//     switch (event.type) {
//
//       // Left-Top-Edge
//       case 'lt':
//         // We build a calculating function for every case which gives us the new position of the this.el
//         this.calc = function (diffX, diffY) {
//           // The procedure is always the same
//           // First we snap the edge to the given grid (snapping to 1px grid is normal resizing)
//           var snap = this.snapToGrid(diffX, diffY);
//
//           // Now we check if the new height and width still valid (> 0)
//           if (this.parameters.box.width - snap[0] > 0 && this.parameters.box.height - snap[1] > 0) {
//             // ...if valid, we resize the this.el (which can include moving because the coord-system starts at the left-top and this edge is moving sometimes when resized)
//
//             /*
//              * but first check if the element is text box, so we can change the font size instead of
//              * the width and height
//              */
//
//             if (this.parameters.type === "text") {
//               this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y);
//               this.el.attr("font-size", this.parameters.fontSize - snap[0]);
//               return;
//             }
//
//             snap = this.checkAspectRatio(snap);
//
//             this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y + snap[1]).size(this.parameters.box.width - snap[0], this.parameters.box.height - snap[1]);
//           }
//         };
//         break;
//
//       // Right-Top
//       case 'rt':
//         // s.a.
//         this.calc = function (diffX, diffY) {
//           var snap = this.snapToGrid(diffX, diffY, 1 << 1);
//           if (this.parameters.box.width + snap[0] > 0 && this.parameters.box.height - snap[1] > 0) {
//             if (this.parameters.type === "text") {
//               this.el.move(this.parameters.box.x - snap[0], this.parameters.box.y);
//               this.el.attr("font-size", this.parameters.fontSize + snap[0]);
//               return;
//             }
//
//             snap = this.checkAspectRatio(snap, true);
//
//             this.el.move(this.parameters.box.x, this.parameters.box.y + snap[1]).size(this.parameters.box.width + snap[0], this.parameters.box.height - snap[1]);
//           }
//         };
//         break;
//
//       // Right-Bottom
//       case 'rb':
//         // s.a.
//         this.calc = function (diffX, diffY) {
//           var snap = this.snapToGrid(diffX, diffY, 0);
//           if (this.parameters.box.width + snap[0] > 0 && this.parameters.box.height + snap[1] > 0) {
//             if (this.parameters.type === "text") {
//               this.el.move(this.parameters.box.x - snap[0], this.parameters.box.y);
//               this.el.attr("font-size", this.parameters.fontSize + snap[0]);
//               return;
//             }
//
//             snap = this.checkAspectRatio(snap);
//
//             this.el.move(this.parameters.box.x, this.parameters.box.y).size(this.parameters.box.width + snap[0], this.parameters.box.height + snap[1]);
//           }
//         };
//         break;
//
//       // Left-Bottom
//       case 'lb':
//         // s.a.
//         this.calc = function (diffX, diffY) {
//           var snap = this.snapToGrid(diffX, diffY, 1);
//           if (this.parameters.box.width - snap[0] > 0 && this.parameters.box.height + snap[1] > 0) {
//             if (this.parameters.type === "text") {
//               this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y);
//               this.el.attr("font-size", this.parameters.fontSize - snap[0]);
//               return;
//             }
//
//             snap = this.checkAspectRatio(snap, true);
//
//             this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y).size(this.parameters.box.width - snap[0], this.parameters.box.height + snap[1]);
//           }
//         };
//         break;
//
//       // Top
//       case 't':
//         // s.a.
//         this.calc = function (diffX, diffY) {
//           var snap = this.snapToGrid(diffX, diffY, 1 << 1);
//           if (this.parameters.box.height - snap[1] > 0) {
//             // Disable the font-resizing if it is not from the corner of bounding-box
//             if (this.parameters.type === "text") {
//               return;
//             }
//
//             this.el.move(this.parameters.box.x, this.parameters.box.y + snap[1]).height(this.parameters.box.height - snap[1]);
//           }
//         };
//         break;
//
//       // Right
//       case 'r':
//         // s.a.
//         this.calc = function (diffX, diffY) {
//           var snap = this.snapToGrid(diffX, diffY, 0);
//           if (this.parameters.box.width + snap[0] > 0) {
//             if (this.parameters.type === "text") {
//               return;
//             }
//
//             this.el.move(this.parameters.box.x, this.parameters.box.y).width(this.parameters.box.width + snap[0]);
//           }
//         };
//         break;
//
//       // Bottom
//       case 'b':
//         // s.a.
//         this.calc = function (diffX, diffY) {
//           var snap = this.snapToGrid(diffX, diffY, 0);
//           if (this.parameters.box.height + snap[1] > 0) {
//             if (this.parameters.type === "text") {
//               return;
//             }
//
//             this.el.move(this.parameters.box.x, this.parameters.box.y).height(this.parameters.box.height + snap[1]);
//           }
//         };
//         break;
//
//       // Left
//       case 'l':
//         // s.a.
//         this.calc = function (diffX, diffY) {
//           var snap = this.snapToGrid(diffX, diffY, 1);
//           if (this.parameters.box.width - snap[0] > 0) {
//             if (this.parameters.type === "text") {
//               return;
//             }
//
//             this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y).width(this.parameters.box.width - snap[0]);
//           }
//         };
//         break;
//
//       // Rotation
//       case 'rot':
//         // s.a.
//         this.calc = function (diffX, diffY) {
//
//           // yes this is kinda stupid but we need the mouse coords back...
//           var current = { x: diffX + this.parameters.p.x, y: diffY + this.parameters.p.y };
//
//           // start minus middle
//           var sAngle = Math.atan2((this.parameters.p.y - this.parameters.box.y - this.parameters.box.height / 2), (this.parameters.p.x - this.parameters.box.x - this.parameters.box.width / 2));
//
//           // end minus middle
//           var pAngle = Math.atan2((current.y - this.parameters.box.y - this.parameters.box.height / 2), (current.x - this.parameters.box.x - this.parameters.box.width / 2));
//
//           var angle = this.parameters.rotation + (pAngle - sAngle) * 180 / Math.PI + this.options.snapToAngle / 2;
//
//           // We have to move the element to the center of the box first and change the rotation afterwards
//           // because rotation always works around a rotation-center, which is changed when moving the element
//           // We also set the new rotation center to the center of the box.
//           this.el.center(this.parameters.box.cx, this.parameters.box.cy).rotate(angle - (angle % this.options.snapToAngle), this.parameters.box.cx, this.parameters.box.cy);
//         };
//         break;
//
//       // Moving one single Point (needed when an element is deepSelected which means you can move every single point of the object)
//       case 'point':
//         this.calc = function (diffX, diffY) {
//
//           // Snapping the point to the grid
//           var snap = this.snapToGrid(diffX, diffY, this.parameters.pointCoords[0], this.parameters.pointCoords[1]);
//
//           // Get the point array
//           var array = this.el.array().valueOf();
//
//           // Changing the moved point in the array
//           array[this.parameters.i][0] = this.parameters.pointCoords[0] + snap[0];
//           array[this.parameters.i][1] = this.parameters.pointCoords[1] + snap[1];
//
//           // And plot the new this.el
//           this.el.plot(array);
//         };
//     }
//
//     this.el.fire('resizestart', { dx: this.parameters.x, dy: this.parameters.y, event: event });
//     // When resizing started, we have to register events for...
//     // Touches.
//     SVG.on(window, 'touchmove.resize', function (e) {
//       _this.update(e || window.event);
//     });
//     SVG.on(window, 'touchend.resize', function () {
//       _this.done();
//     });
//     // Mouse.
//     SVG.on(window, 'mousemove.resize', function (e) {
//       _this.update(e || window.event);
//     });
//     SVG.on(window, 'mouseup.resize', function () {
//       _this.done();
//     });
//
//   };
//
//   // The update-function redraws the element every time the mouse is moving
//   ResizeHandler.prototype.update = function (event) {
//     if (!event) {
//       if (this.lastUpdateCall) {
//         this.calc(this.lastUpdateCall[0], this.lastUpdateCall[1]);
//       }
//       return;
//     }
//
//     // Calculate the difference between the mouseposition at start and now
//     var txPt = this._extractPosition(event);
//     var p = this.transformPoint(txPt.x, txPt.y);
//
//     var diffX = p.x - this.parameters.p.x,
//       diffY = p.y - this.parameters.p.y;
//
//     this.lastUpdateCall = [diffX, diffY];
//
//     // Calculate the new position and height / width of the element
//     this.calc(diffX, diffY);
//
//     // Emit an event to say we have changed.
//     this.el.fire('resizing', { dx: diffX, dy: diffY, event: event });
//     //
//     // var sibling = SVG.adopt(document.getElementById(this.el.node.getAttribute('target_id')));
//
//     // sibling.attr("height", this.el.attr("height"));
//     // sibling.attr("x", this.el.attr("x"));
//
//     // sibling.attr("y", this.el.attr("y"));
//
//     // .setAttribute("width", 1000 + Math.abs(diffX));
//
//   };
//
//   // Is called on mouseup.
//   // Removes the update-function from the mousemove event
//   ResizeHandler.prototype.done = function () {
//     this.lastUpdateCall = null;
//     SVG.off(window, 'mousemove.resize');
//     SVG.off(window, 'mouseup.resize');
//     SVG.off(window, 'touchmove.resize');
//     SVG.off(window, 'touchend.resize');
//     this.el.fire('resizedone');
//   };
//
//   // The flag is used to determine whether the resizing is used with a left-Point (first bit) and top-point (second bit)
//   // In this cases the temp-values are calculated differently
//   ResizeHandler.prototype.snapToGrid = function (diffX, diffY, flag, pointCoordsY) {
//
//     var temp;
//
//     // If `pointCoordsY` is given, a single Point has to be snapped (deepSelect). That's why we need a different temp-value
//     if (typeof pointCoordsY !== 'undefined') {
//       // Note that flag = pointCoordsX in this case
//       temp = [(flag + diffX) % this.options.snapToGrid, (pointCoordsY + diffY) % this.options.snapToGrid];
//     } else {
//       // We check if the flag is set and if not we set a default-value (both bits set - which means upper-left-edge)
//       flag = flag == null ? 1 | 1 << 1 : flag;
//       temp = [(this.parameters.box.x + diffX + (flag & 1 ? 0 : this.parameters.box.width)) % this.options.snapToGrid, (this.parameters.box.y + diffY + (flag & (1 << 1) ? 0 : this.parameters.box.height)) % this.options.snapToGrid];
//     }
//
//     if (diffX < 0) {
//       temp[0] -= this.options.snapToGrid;
//     }
//     if (diffY < 0) {
//       temp[1] -= this.options.snapToGrid;
//     }
//
//     diffX -= (Math.abs(temp[0]) < this.options.snapToGrid / 2 ?
//       temp[0] :
//       temp[0] - (diffX < 0 ? -this.options.snapToGrid : this.options.snapToGrid));
//     diffY -= (Math.abs(temp[1]) < this.options.snapToGrid / 2 ?
//       temp[1] :
//       temp[1] - (diffY < 0 ? -this.options.snapToGrid : this.options.snapToGrid));
//
//     return this.constraintToBox(diffX, diffY, flag, pointCoordsY);
//
//   };
//
//   // keep element within constrained box
//   ResizeHandler.prototype.constraintToBox = function (diffX, diffY, flag, pointCoordsY) {
//     //return [diffX, diffY]
//     var c = this.options.constraint || {};
//     var orgX, orgY;
//
//     if (typeof pointCoordsY !== 'undefined') {
//       orgX = flag;
//       orgY = pointCoordsY;
//     } else {
//       orgX = this.parameters.box.x + (flag & 1 ? 0 : this.parameters.box.width);
//       orgY = this.parameters.box.y + (flag & (1 << 1) ? 0 : this.parameters.box.height);
//     }
//
//     if (typeof c.minX !== 'undefined' && orgX + diffX < c.minX) {
//       diffX = c.minX - orgX;
//     }
//
//     if (typeof c.maxX !== 'undefined' && orgX + diffX > c.maxX) {
//       diffX = c.maxX - orgX;
//     }
//
//     if (typeof c.minY !== 'undefined' && orgY + diffY < c.minY) {
//       diffY = c.minY - orgY;
//     }
//
//     if (typeof c.maxY !== 'undefined' && orgY + diffY > c.maxY) {
//       diffY = c.maxY - orgY;
//     }
//
//     return [diffX, diffY];
//   };
//
//   ResizeHandler.prototype.checkAspectRatio = function (snap, isReverse) {
//     if (!this.options.saveAspectRatio) {
//       return snap;
//     }
//
//     var updatedSnap = snap.slice();
//     var aspectRatio = this.parameters.box.width / this.parameters.box.height;
//     var newW = this.parameters.box.width + snap[0];
//     var newH = this.parameters.box.height - snap[1];
//     var newAspectRatio = newW / newH;
//
//     if (newAspectRatio < aspectRatio) {
//       // Height is too big. Adapt it
//       updatedSnap[1] = newW / aspectRatio - this.parameters.box.height;
//       isReverse && (updatedSnap[1] = -updatedSnap[1]);
//     } else if (newAspectRatio > aspectRatio) {
//       // Width is too big. Adapt it
//       updatedSnap[0] = this.parameters.box.width - newH * aspectRatio;
//       isReverse && (updatedSnap[0] = -updatedSnap[0]);
//     }
//
//     return updatedSnap;
//   };
//
//   SVG.extend(SVG.Element, {
//     // Resize element with mouse
//     resize: function (options) {
//
//       (this.remember('_resizeHandler') || new ResizeHandler(this)).init(options || {});
//
//       return this;
//
//     }
//
//   });
//
//   SVG.Element.prototype.resize.defaults = {
//     snapToAngle: 0.1,       // Specifies the speed the rotation is happening when moving the mouse
//     snapToGrid: 1,          // Snaps to a grid of `snapToGrid` Pixels
//     constraint: {},         // keep element within constrained box
//     saveAspectRatio: false  // Save aspect ratio when resizing using lt, rt, rb or lb points
//   };
//
// }).call(this);
