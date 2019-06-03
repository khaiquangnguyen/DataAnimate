import { input_types } from "../Scene";
import SVG from 'svg.js';
import AnimationEffect from '../DefaultEffects/AnimationEffect';
import * as d3 from 'd3';
class BarGrowByOne extends AnimationEffect {
    constructor(effect_stack) {
        super("BarGrowByOne", effect_stack, true);
        this.bars = this.actor.bars;
        this.graph_height = this.actor.graph_height;
        this.y_scale = this.actor.y_scale;
        this.y_data = this.actor.y_data;
        this.curr_percent = 0;
        this.reachTo(0);
    }

    reachTo(timestamp = 0, self = this) {
        if (!self.enabled) return;
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
        if (!self.enabled) return;
        self.reachTo(start_timestamp);
        self.bars.attr("T", 0);
        self.bars.transition()
            .duration(self.duration - start_timestamp)
            .attr("y", function (d) { return self.y_scale(d[self.y_data]); })
            .attr('T', 1)
            .attr("height", function (d) {
                return self.graph_height - self.y_scale(d[self.y_data]);
            })
    }

    pause(self = this) {
        self.bars.interrupt();
        this.curr_percent = self.bars.attr('T');
    }
    resume(self = this) {
        if (!self.enabled) return;
        // load the new time stamp
        let time_stamp = this.curr_percent * this.duration;
        console.log(time_stamp);
        this.play(time_stamp);
    }

    stop(self = this) {
        this.reachTo(0);
        self.bars.interrupt();
        self.actor.SVG_reference.show();
    }

    static get_blueprint(self = this) {
        return {
            name: "Bar Grow",
            tooltips: "Make the bar grow from 0 to full height",
            icon_representation: "",
            create_fn: BarGrowByOne.create
        }
    }

    static create(effect_stack, self = this) {
        const effect = new BarGrowByOne(effect_stack);
        return effect;
    }

    reconstruct_graph(self = this) {
        this.bars.attr("y", function (d) { return self.y_scale(d[self.y_data]); })
            .attr("height", function (d) {
                return self.graph_height - self.y_scale(d[self.y_data]);
            });
        this.reachTo(0);
    }



    edit_attr(d) {
        if (!d) return;
        this.edit_default_attr(d);
        const attr = d.attribute;
        const value = d.value;
        switch (attr) {
            case "start_per":
                this.start_per = value;
                return;
            case "end_per":
                this.end_per = value;
                return;
            default:
                break;
        }
    }

    export_attributes(self = this) {
        const new_attr = {
        }
        return { ...self.export_default_attributes(), ...new_attr };
    }
}

export default BarGrowByOne;
