import { input_types } from "../Scene";
import SVG from 'svg.js';
import AnimationEffect from '../DefaultEffects/AnimationEffect';

class FadeEffect extends AnimationEffect {
    constructor(effect_stack) {
        super("Fade Effect", effect_stack, true);
        this.original_opacity = this.actor.opacity;
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
        this.reachTo(0);
    }

    reachTo(timestamp = 0, self = this) {
        if (!self.enabled) return;

        if (timestamp < 0 || timestamp >= self.duration) return;
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.play();
            svg_e.stop();
            // get current position based on start_timestamp
            const curr_opacity = self.start_opacity + (self.end_opacity - self.start_opacity) * timestamp / self.duration;
            svg_e.opacity(curr_opacity);
        });
    }

    play(start_timestamp = 0, self = this) {
        self.reachTo(0);
        if (!self.enabled) return;
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            // clear out all animations
            svg_e.animate(self.duration - start_timestamp).opacity(self.end_opacity);

        });
    }

    pause(self = this) {
        if (!self.enabled) return;
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
        if (!self.enabled) return;
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.stop();
        });
        self.actor.SVG_reference.show();

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
                this.start_opacity = value;
                return;
            case "end_opacity":
                this.end_opacity = value;
                return;
            default:
                break;
        }
    }

    reconstruct_graph(self = this) {
        this.DOM_target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            // clear out all animations
            svg_e.opacity(self.original_opacity);
        });
    }

    export_attributes(self = this) {
        const new_attr = {
            start_opacity: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning opacity",
                value: this.start_opacity
            },
            end_opacity: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The end opacity",
                value: this.end_opacity
            },
        }
        return { ...self.export_default_attributes(), ...new_attr };
    }
}

export default FadeEffect;
