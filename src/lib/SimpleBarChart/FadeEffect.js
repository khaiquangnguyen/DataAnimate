import { input_types } from "../Scene";
import SVG from 'svg.js';
import AnimationEffect from '../DefaultEffects/AnimationEffect';

class FadeEffect extends AnimationEffect {
    constructor(effect_stack) {
        super("MoveTo", effect_stack, true);
        this.start_opacity = this.actor.opacity;
        this.end_opacity = this.actor.opacity;
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
        if (timestamp < 0 || timestamp >= self.duration) return;
        this.DOM_target_components.forEach(e => {
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
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            // clear out all animations
            svg_e.play();
            svg_e.stop();
            svg_e.animate(self.duration - start_timestamp).opacity(self.end_opacity);
        });
    }

    pause(self = this) {
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.pause();
        });
    }

    resume(self = this) {
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.play();
        });
    }

    stop(self = this) {
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.stop();
        });
    }


    static get_blueprint(self = this) {
        return {
            name: "Fade",
            tooltips: "Fade an object from opacity to another opacity",
            icon_representation: "",
            create_fn: FadeEffect.create
        }
    }

    static create(effect_stack, self = this) {
        const effect = new FadeEffect(effect_stack);
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
            target_component: {
                type: input_types.DROPDOWN,
                range: Object.keys(this.targetable_components),
                tooltips: "The beginning x position",
                value: this.curr_target_component
            }
        }
        return { ...self.export_default_attributes(), ...new_attr };
    }
}

export default FadeEffect;
