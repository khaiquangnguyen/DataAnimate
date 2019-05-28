const input_types = {
    STRING: "string",
    INT: "int",
    FLOAT: "float",
    DROPDOWN: "dropdown",
    SELECTOR: "selector",
    BOOLEAN: "boolean",
    CONST: "const"
}
// dummy class to hold all of the blueprints
class BluePrintLibrary {
    constructor() {
        this.blueprints = {};
    }

    get_num_blueprints() {
        return this.blueprints.length;
    }

    add_blueprint(blueprint, self = this) {
        this.blueprints[blueprint.type] = blueprint;
    }

    import(self = this) {
        var input = document.createElement('input');
        input.type = 'file';
        input.click();
        input.onchange = e => {

            // getting a hold of the file reference
            var file = e.target.files[0];

            // setting up the reader
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                var content = readerEvent.target.result; // this is the content!
                var script = document.createElement('script');
                const object_name = file.name.split(".")[0];
                console.log(script);
                script.text = content;
                document.head.appendChild(script); //or something of the likes
                const blue_print = eval(object_name + ".get_blueprint()");
                self.add_blueprint(blue_print);
            }
        }
    }

    remove_blueprint(blueprint) {
        for (var i = 0; i < self.blueprints.length; i++) {
            if (self.blueprints[i] === blueprint) {
                self.blueprints.splice(i, 1);
            }
        }
    }

    export_state() {
        return this.blueprints;
    }

}

class ObjectBPLib extends BluePrintLibrary {
    constructor() {
        super();
        // initiate the default blueprints
        this.add_blueprint(RectObject.get_blueprint());
    }
}

class EffectBPLib extends BluePrintLibrary {
    constructor() {
        super();
    }
}


class Scene {
    constructor(duration) {
        this.duration = duration;
        this.graphical_objects = [];
        this.effect_bp_lib = new EffectBPLib();
        this.obj_bp_lib = new ObjectBPLib();
        this.curr_graphical_object = null;
        this.curr_effectstack = null;
        this.curr_timestamp = 0;
    }

    add_graphical_object(graphical_object, self = this) {
        self.graphical_objects.push(graphical_object);
        self.set_curr_graphical_object(graphical_object);
    }
    
    remove_graphical_object(graphical_object, self = this) {
        for (var i = 0; i < self.graphical_objects.length; i++) {
            if (self.graphical_objects[i] === graphical_object) {
                self.graphical_objects.splice(i, 1);
            }
        }
        self.curr_graphical_object = null;
        self.curr_effectstack = null;
    }

    set_curr_graphical_object(graphical_object, self = this) {
        this.curr_graphical_object = graphical_object;
        // deselect all other objects first
        this.graphical_objects.forEach(object => {
            object.deselect();
        })
        this.curr_graphical_object.select();
    }

    add_effect_stack(effect_stack, self = this) {
        this.curr_graphical_object.add_effectstack(effect_stack);
        this.curr_effectstack = effect_stack;
    }

    remove_effectstack(self = this) {
        this.curr_graphical_object.remove_effectstack(this.curr_effectstack);
        this.curr_effectstack = null;
    }

    add_effect(effect, self = this) {
        this.curr_effectstack.add_effect(effect);
    }
    remove_effect(effect, self = this) {
        this.curr_effectstack.remove_effect(effect);
    }

    set_curr_effectstack(curr_effect_stack, self = this) {
        this.curr_effectstack = curr_effect_stack;
    }

    import_graphical_object_blueprint(jsFile, self = this) {
        this.obj_bp_lib.add_blueprint();
    }

    import_effect_blueprint(jsFile, self = this) {
        this.effect_bp_lib.add_blueprint();
    }

    create_object(self = this, blueprint) {
        blueprint.create_fn(this.add_graphical_object);
    }

    create_effect(self = this) {

    }

    create_rectangle(self = this) {
        this.obj_bp_lib.blueprints[0].create_fn(this.add_graphical_object);
        console.log(this.obj_bp_lib.blueprints[0]);
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

    export_state() {
        // generate 
        return {
            duration: this.duration,
            curr_timestamp: this.curr_effectstack,
            obj_blueprints: this.obj_bp_lib.export_state(),
            effect_blueprints: this.effect_bp_lib.export_state(),
            curr_graphical_object: this.curr_graphical_object === null ? [] : this.curr_graphical_object.export_state(),
            curr_effectstack: this.curr_effectstack === null ? [] : this.curr_effectstack.export_state(),
            graphical_objects: (() => {
                const d = [];
                this.graphical_objects.forEach(object => {
                    d.push(object.export_state());
                })
                return d;
            })()
        }
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

const scene = new Scene(1000);