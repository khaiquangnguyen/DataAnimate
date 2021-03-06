import Track from '../Track';
import { input_types, generate_unique_id, scene } from "../Scene";
import EffectStack from '../EffectStack';
import { editAttribute, setObject, deleteObject } from '../../actions/index';
import { store } from '../../index';

class GraphicalObject {
    constructor(x, y, width, height, name) {
        this.type = "";
        this.name = name;
        this.total_width = width;
        this.total_height = height;
        this.x = x;
        this.y = y;
        this.opacity = 1;
        this.track = new Track(this);
        this.data = null;
        this.SVG_reference = null;
        this.show = 1;
        this.unique_id = "graphicalObject_" + generate_unique_id();
        this.effect_bps = [];
        this.track.add_effectstack(new EffectStack(this, 0, scene.duration));
        // add onclick event
    }

    select(self = this) {
        this.SVG_reference.selectize().draggable().resize();
    }
    deselect(self = this) {
        this.SVG_reference.selectize(false).draggable(false).resize(false);;
    }

    view_as_DOM(self = this) {
        return;
    }
    set_on_click(self = this) {
        this.SVG_reference.on('click', e => {
            store.dispatch(setObject(this));
        })
    }

    remove_effectstack(effect_stack, self = this) {
        this.track.remove_effectstack(effect_stack);
    }

    add_effectstack(effect_stack, self = this) {
        this.track.add_effectstack(effect_stack);
    }



    play(play_time = 0, self = this) {
        self.track.play(play_time);
    }

    pause(self = this) {
        self.track.pause();
    }

    resume(self = this) {
        self.track.resume();
    }

    reachTo(play_time, self = this) {
        self.track.reachTo(play_time);
    }

    stop(self = this) {
        self.track.stop();
    }

    edit_duration(duration) {
        this.track.edit_duration(duration);
    }

    edit_default_attr(d) {
        if (!d) return;
        const attr = d.attribute;
        const value = d.value;
        switch (attr) {
            case "name":
                this.name = value;
                return;
            case "height":
                this.total_height = value;
                this.SVG_reference
                    .attr("height", this.total_height)

                break;
            case "width":
                this.total_width = value;
                this.SVG_reference
                    .attr("width", this.total_width)

                break;
            case "x":
                this.x = value;
                this.SVG_reference
                    .attr("x", this.x)
                break;
            case "y":
                this.y = value;
                this.SVG_reference
                    .attr("y", this.y)
                break;
            case "opacity":
                this.opacity = value;
                this.SVG_reference
                    .attr("opacity", this.opacity)
                break;
            case "show":
                this.show = value;
                this.show === 1 ? this.SVG_reference.show() : this.SVG_reference.hide();
                break;
            default:
                break;
        }
    }

    edit_attr(d) {
        this.edit_default_attr(d);
    }

    export_default_attributes(self = this) {
        return {
            name: {
                type: input_types.STRING,
                range: "",
                tooltips: "The name of the graphical object",
                value: this.name
            },
            width: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                value: this.total_width,
            },
            height: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                value: this.total_height,
            },
            x: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                value: this.x
            },
            y: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                value: this.y
            },
            opacity: {
                type: input_types.FLOAT,
                range: [0, 1],
                value: this.opacity
            },
            reference_object: {
                type: undefined,
                range: undefined,
                value: this
            },
            show: {
                type: input_types.BOOLEAN,
                range: [0, 1],
                value: this.show
            }
        }
    }

    export_attributes(self = this) {
        return self.export_default_attributes()
    }

    export_animation_effects(self = this) {
    }

    export_state(self = this) {
        return { ...this.track.export_state(), ...this.export_attributes() };
    }

}

export default GraphicalObject;
