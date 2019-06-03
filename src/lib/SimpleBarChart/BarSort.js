import { input_types } from "../Scene";
import SVG from 'svg.js';
import AnimationEffect from '../DefaultEffects/AnimationEffect';
import * as d3 from 'd3';
class BarSort extends AnimationEffect {
    constructor(effect_stack) {
        super("Bar Sort", effect_stack, true);
        this.bars = this.actor.bars;
        this.graph_height = this.actor.graph_height;
        this.y_scale = this.actor.y_scale;
        this.x_scale = this.actor.x_scale;
        this.y_data = this.actor.y_data;
        this.x_data = this.actor.x_data;
        this.x_axis = this.actor.x_axis;
        this.curr_percent = 0;
        this.DOM_target_components = [this.actor.svg_container.node()];
        this.data = JSON.parse(JSON.stringify(this.actor.data));
        // this.reachTo(0);
    }

    reachTo(timestamp = 0, self = this) {
        return;
    }

    play(start_timestamp = 0, self = this) {
        if (!self.enabled) return;
        self.data.sort((a, b) => a[self.y_data] - b[self.y_data]);
        self.x_scale.domain(self.data.map(d => d[self.x_data]));
        const t = this.actor.svg_container.transition()
            .duration(this.duration - this.data.length * 50)
        this.bars.data(self.data, d => d[self.x_data])
            .transition(t)
            .delay((d, i) => i * 20)
            .attr("x", function (d) { return self.x_scale(d[self.x_data]) + 5; })
        this.x_axis.transition(t)
            .call(d3.axisBottom(self.x_scale))
            .selectAll(".x_axis")
            .delay((d, i) => i * 20);
    }

    pause(self = this) {
        return;
    }
    resume(self = this) {
        if (!self.enabled) return;
        return;
    }

    stop(self = this) {
        self.actor.SVG_reference.show();
        this.bars.interrupt();
        self.data = JSON.parse(JSON.stringify(this.actor.data));
        self.x_scale.domain(self.data.map(d => d[self.x_data]));
        this.bars.data(self.data, d => d[self.x_data])
            .attr("x", function (d) { return self.x_scale(d[self.x_data]) + 5; })
    }

    static get_blueprint(self = this) {
        return {
            name: "Bar Sort",
            tooltips: "Make the bar grow from 0 to full height",
            icon_representation: "",
            create_fn: BarSort.create
        }
    }

    static create(effect_stack, self = this) {
        const effect = new BarSort(effect_stack);
        return effect;
    }

    reconstruct_graph(self = this) {
        this.actor.SVG_reference.clear();
        this.actor.construct_graph();
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

export default BarSort;
