class Scene {
    constructor(duration) {
        this.duration = duration;
        this.graphical_object_blueprints = [];
        this.effect_blueprints = [];
        this.graphical_objects = [];
        this.curr_graphical_object = null;
        this.curr_effectstack = null;
        this.curr_timestamp = 0;
    }

    add_graphical_object(graphical_object, self = this) {
        this.graphical_objects.push(graphical_object);
    }
    remove_graphical_object(graphical_object, self = this) {
        for (var i = 0; i < self.graphical_objects.length; i++) {
            if (self.graphical_objects[i] === actor) {
                arr.splice(i, 1);
            }
        }
    }

    set_curr_graphical_object(graphical_object, self = this) {
        this.curr_graphical_object = graphical_object;
        // deselect all other objects first
        this.graphical_objects.forEach(object => {
            object.deselect();
        })
        this.curr_graphical_object.select();
    }
    set_curr_effectstack(curr_effect_stack, self = this) {
        this.curr_effectstack = curr_effect_stack;
    }

    import_graphical_object_blueprint(jsFile, self = this) {

    }
    import_effect_blueprint(jsFile, self = this) {

    }

    create_rectangle(self = this) {
        const drawing = SVG.adopt(document.getElementById('canvas'));
        var rect;
        const start_draw = (e) => {
            rect = drawing.rect();
            rect.draw(e);
        }
        const end_draw = (e) => {
            rect.draw('stop', e);
            // add the circle to the list of new objects
            var x = rect.x();
            var y = rect.y();
            var width = rect.attr('width');
            var height = rect.attr('height');
            console.log(rect);
            self.set_curr_graphical_object(new RectObject(x, y, width, height, "test_rectangle", rect));
            self.add_graphical_object(self.curr_graphical_object);
            // unbind the listener
            console.log(drawing);
            drawing.off('mousedown', start_draw);
            drawing.off('mouseup', end_draw);
        }
        drawing.on('mousedown', start_draw, false);
        drawing.on('mouseup', end_draw, false);
    }

    create_circle(self = this) {
        const drawing = SVG.adopt(document.getElementById('canvas'));
        var circle;
        const start_draw = (e) => {
            circle = drawing.circle();
            circle.draw(e);
        }
        const end_draw = (e) => {
            circle.draw('stop', e);
            // add the circle to the list of new objects
            var cx = circle.attr("cx")
            var cy = circle.attr("cy")
            var r = circle.attr('r');
            // set it as the currently chosen circle
            self.set_curr_graphical_object(new CircleObject(cx, cy, r, "test_circle", circle));
            self.add_graphical_object(self.curr_graphical_object);
            // unbind the listener
            console.log(drawing);
            drawing.off('mousedown', start_draw);
            drawing.off('mouseup', end_draw);
        }
        drawing.on('mousedown', start_draw, false);
        drawing.on('mouseup', end_draw, false);
    }

    /**
     * remove all junk elements from the scene
     * @param {*} self 
     */
    remove_junks(self = this) {
        return;
    }

    create_text() {
        current_focus_object = new TextObject(0, 0, 200, 100, 'test_text', 'this is a good text');
    }

}

/**
 * Help from Stackoverflow : https://stackoverflow.com/questions/1535631/static-variables-in-javascript
 * Function to generate a global unique id for all the elements
 */
var generate_unique_id = (function () {
    var id = 0; // This is the private persistent value
    // The outer function returns a nested function that has access
    // to the persistent value.  It is this nested function we're storing
    // in the variable uniqueID above.
    return function () { return id++; };  // Return and increment
})(); // Invoke the outer function after defining it.
