import RectObject from './DefaultObjects/RectObject';
import CircleObject from './DefaultObjects/CircleObject';
import TextObject from './DefaultObjects/TextObject';
import { selectObject } from '../actions';
import { store } from '../index';
import SimpleBarChart from './SimpleBarChart/SimpleBarChart';
export const input_types = {
    STRING: "string",
    INT: "int",
    FLOAT: "float",
    DROPDOWN: "dropdown",
    SELECTOR: "selector",
    BOOLEAN: "boolean",
    CONST: "const"
}

export const scene_action = {
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    STOP: 'STOP'
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

    remove_blueprint(blueprint, self = this) {
        for (let i = 0; i < self.blueprints.length; i++) {
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
}

class EffectBPLib extends BluePrintLibrary {
    constructor() {
        super();
        // initiate the default blueprints
        this.add_blueprint(
            {
                type: "Resize",
                tooltips: "This is a rectangle",
                icon_representation: "",
                create_fn: "ahaha"
            });
        this.add_blueprint(
            {
                type: "FadeIn",
                tooltips: "This is a rectangle",
                icon_representation: "",
                create_fn: "ahaha"
            });
    }
}

class DefaultBPLib extends BluePrintLibrary {
    constructor() {
        super();
        // initiate the default blueprints
        // this.add_blueprint(RectObject.get_blueprint());
        // this.add_blueprint(CircleObject.get_blueprint());
        // this.add_blueprint(TextObject.get_blueprint());
        this.add_blueprint(SimpleBarChart.get_blueprint());
    }
}

class Scene {
    constructor(duration, canvas_width, canvas_height) {
        this.canvas_width = 0;
        this.canvas_height = 0;
        this.duration = duration;
        this.graphical_objects = [];
        this.effect_bp_lib = new EffectBPLib();
        this.obj_bp_lib = new ObjectBPLib();
        this.default_bp_lib = new DefaultBPLib();
        this.curr_graphical_object = null;
        this.curr_effectstack = null;
        this.curr_timestamp = 0;
        this.curr_action = scene_action.STOP;
    }

    add_graphical_object(graphical_object, self = this) {
        self.graphical_objects.push(graphical_object);
        self.set_curr_graphical_object(graphical_object);
    }

    create_graphical_object(blueprint, self = this) {
        blueprint.create_fn(this.add_graphical_object);
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
        if (graphical_object === undefined || graphical_object === undefined) {
            console.log(graphical_object);
            this.graphical_objects.forEach(object => {
                object.deselect();
            })
            this.curr_graphical_object = null;
            return;
        }
        this.curr_graphical_object = graphical_object;
        // deselect all other objects first
        this.graphical_objects.forEach(object => {
            object.deselect();
        })
        this.curr_graphical_object.select();
        store.dispatch(selectObject(this.curr_graphical_object));

    }

    add_effectstack(add_effectstack, self = this) {
        this.curr_graphical_object.add_effectstack(add_effectstack);
        this.curr_effectstack = add_effectstack;
    }

    remove_effectstack(effect_stack = this.curr_effectstack, self = this) {
        this.curr_graphical_object.remove_effectstack(effect_stack);
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

    import_graphical_object_blueprint(self = this) {
        this.obj_bp_lib.add_blueprint();
    }

    import_effect_blueprint(jsFile, self = this) {
        this.effect_bp_lib.add_blueprint();
    }


    playpauseresume(self = this) {
        console.log(this.curr_action);
        if (this.curr_action === scene_action.PLAY) {
            this.curr_action = scene_action.PAUSE;
            self.graphical_objects.forEach(obj => {
                obj.pause();
            });
        }
        else if (this.curr_action === scene_action.PAUSE) {
            this.curr_action = scene_action.PLAY;
            self.graphical_objects.forEach(obj => {
                obj.resume();
            });
        }
        else if (this.curr_action === scene_action.STOP) {
            this.curr_action = scene_action.PLAY;
            self.graphical_objects.forEach(obj => {
                obj.play(this.curr_timestamp);
            });
        }
    }


    reachTo(play_time, self = this) {
        self.graphical_objects.forEach(obj => {
            obj.reachTo(play_time);
        });
    }

    stop(self = this) {
        self.graphical_objects.forEach(obj => {
            obj.stop();
        });
        this.curr_action = scene_action.STOP;

    }

    edit_duration(new_duration, self = this) {
        self.duration = new_duration;
        self.graphical_objects.forEach(obj => {
            obj.edit_duration(new_duration);
        })
    }

    edit_attr(d, self = this) {
        this.curr_graphical_object.edit_attr(d)
    }
    export_state() {
        return {
            scene: this,
            current_action: this.curr_action,
            duration: this.duration,
            curr_timestamp: this.curr_effectstack,
            obj_blueprints: this.obj_bp_lib.export_state(),
            effect_blueprints: this.effect_bp_lib.export_state(),
            default_blueprints: this.default_bp_lib.export_state(),
            curr_graphical_object: this.curr_graphical_object === null ? [] : this.curr_graphical_object.export_state(),
            curr_effectstack: this.curr_effectstack === null ? [] : this.curr_effectstack.export_state(),
            graphical_objects: (() => {
                const d = [];
                this.graphical_objects.forEach(object => {
                    d.push(object.export_state());
                });
                return d;
            })()
        }
    }
}



/**
 * Help from Stackoverflow : https://stackoverflow.com/questions/1535631/static-variables-in-javascript
 * Function to generate a global unique id for all the elements
 */
export const generate_unique_id = (function () {
    var id = 0; // This is the private persistent value
    // The outer function returns a nested function that has access
    // to the persistent value.  It is this nested function we're storing
    // in the variable uniqueID above.
    return function () { return id++; };  // Return and increment
})(); // Invoke the outer function after defining it.

export const scene = new Scene(1000);
console.log(scene);
