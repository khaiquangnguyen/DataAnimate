import { input_types } from "../Scene";
import SVG from 'svg.js';
import AnimationEffect from '../DefaultEffects/AnimationEffect';

class MoveEffect extends AnimationEffect {
    constructor(effect_stack) {
        super("MoveTo", effect_stack, true);
        this.start_x = this.actor.x;
        this.start_y = this.actor.y;
        this.end_x = this.actor.x;
        this.end_y = this.actor.y;
        this.targetable_components =
            {
                CONTAINER: 'CONTAINER',
                'X AXIS': 'X AXIS',
                'y AXIS': 'Y AXIS',
                'XY AXIS': 'XY AXIS',
                'BAR': 'BAR'
            }
        this.curr_target_component = this.DOM_target_components.CONTAINER;
        this.DOM_target_components = [this.actor.svg_container.node()];
    }

    reachTo(timestamp = 0, self = this) {
        if (!self.enabled) return;
        if (timestamp < 0 || timestamp >= self.duration) return;
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            // clear out all animations
            svg_e.play();
            svg_e.stop();
            // get current position based on start_timestamp
            const start_x = self.start_x + (self.end_x - self.start_x) * timestamp / self.duration;
            const start_y = self.start_y + (self.end_y - self.start_y) * timestamp / self.duration;
            svg_e.x(start_x);
            svg_e.y(start_y);
        });
    }

    play(start_timestamp = 0, self = this) {
        self.reachTo(0);
        if (!self.enabled) return;
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.animate(self.duration - start_timestamp).move(self.end_x, self.end_y);
        });
    }

    pause(self = this) {
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.pause();
        });
    }

    resume(self = this) {
        if (!self.enabled) return;
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.play();
        });
    }

    stop(self = this) {
        this.reachTo(0);
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.stop();
        });
        self.actor.SVG_reference.show();

    }


    static get_blueprint(self = this) {
        return {
            name: "Move",
            tooltips: "Move an object from a starting location to an end location",
            icon_representation: "",
            create_fn: MoveEffect.create
        }
    }

    static create(effect_stack, self = this) {
        const effect = new MoveEffect(effect_stack);
        return effect;
    }

    edit_attr(d) {
        if (!d) return;
        this.edit_default_attr(d);
        const attr = d.attribute;
        const value = d.value;
        switch (attr) {
            case "start_x":
                this.start_x = value;
                return;
            case "end_x":
                this.end_x = value;
                return;
            case "start_y":
                this.start_y = value;
                return;
            case "end_y":
                this.end_y = value;
                return;
            default:
                break;
        }
    }

    export_attributes(self = this) {
        const new_attr = {
            start_x: {
                type: input_types.CONST,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning x position",
                value: this.start_x
            },
            end_x: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning x position",
                value: this.end_x
            },
            start_y: {
                type: input_types.CONST,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning x position",
                value: this.start_y
            },
            end_y: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning x position",
                value: this.end_y
            },
        }
        return { ...self.export_default_attributes(), ...new_attr };
    }
}

export default MoveEffect;
