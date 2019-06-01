import { input_types } from "../Scene";
import SVG from 'svg.js';
import AnimationEffect from '../DefaultEffects/AnimationEffect';
import * as d3 from 'd3';
class BarGrowByOne extends AnimationEffect {
    constructor(effect_stack) {
        super("MoveTo", effect_stack, true);
        this.bars = this.actor.bars;
        this.graph_height = this.actor.graph_height;
        this.y_scale = this.actor.y_scale;
        this.y_data = this.actor.y_data;
    }

    reachTo(timestamp = 0, self = this) {
        self.bars
            .attr("y", function (d, i) {
                const per = timestamp / self.duration;
                const curr_y = self.y_scale(d[self.y_data] * per);
                return curr_y;

            })
            .attr("height", function (d, i) {
                const per = timestamp / self.duration;
                const curr_y = self.y_scale(d[self.y_data] * per);
                const curr_height = self.graph_height - curr_y;
                return curr_height;
            });
    }

    play(start_timestamp = 0, self = this) {
        self.reachTo(start_timestamp);
        self.bars.transition()
            .duration(self.duration - start_timestamp)
            .attr("y", function (d) { return self.y_scale(d[self.y_data]); })
            .attr("height", function (d) {
                return self.graph_height - self.y_scale(d[self.y_data]);
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
        self.start_timestamp = 0;
        this.DOM_target_components.forEach(e => {
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
