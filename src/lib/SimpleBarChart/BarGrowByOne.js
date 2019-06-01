import { input_types } from "../Scene";
import SVG from 'svg.js';
import AnimationEffect from '../DefaultEffects/AnimationEffect';

class BarGrowByOne extends AnimationEffect {
    constructor(effect_stack) {
        super("MoveTo", effect_stack, true);
        this.target_components = [this.actor.svg_container.node()];
    }

    reachTo(timestamp = 0, self = this) {
        if (timestamp < 0 || timestamp >= self.duration) return;
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            // clear out all animations
            svg_e.play();
            svg_e.stop();
            // get current position based on start_timestamp
            const curr_opacity = self.start_opacity + (self.end_opacity - self.start_opacity) * timestamp / self.duration;
            svg_e.opacity(curr_opacity);
        });
    }

    play(start_timestamp = 0, self = this) {
        console.log('why not run');
        this.reachTo(start_timestamp);
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            // clear out all animations
            svg_e.play();
            svg_e.stop();
            svg_e.animate(self.duration - start_timestamp).opacity(self.end_opacity);
        });
    }

    pause(self = this) {
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.pause();
        });
    }

    resume(self = this) {
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.play();
        });
    }

    stop(self = this) {
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.stop();
        });
    }


    static get_blueprint(self = this) {
        return {
            name: "SVG - Move To",
            tooltips: "Move an object from a starting location to an end location",
            icon_representation: "",
            create_fn: BarGrowByOne.create
        }
    }

    static create(effect_stack, self = this) {
        const effect = new BarGrowByOne(effect_stack);
        return effect;
    }

    edit_attr(d) {
        if (!d) return;
        this.edit_default_attr(d);
        const attr = d.attribute;
        const value = d.value;
        switch (attr) {
            case "start_opacity":
                this.begin_x = value;
                return;
            case "end_opacity":
                this.end_x = value;
                return;
            default:
                break;
        }
    }

    export_attributes(self = this) {
        const new_attr = {
            start_opacity: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning opacity",
                value: this.begin_x
            },
            end_opacity: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The end opacity",
                value: this.end_x
            },
        }
        return { ...self.export_default_attributes(), ...new_attr };
    }
}

export default BarGrowByOne;
