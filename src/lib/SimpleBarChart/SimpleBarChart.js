import * as d3 from 'd3';
import GraphObject from '../DefaultObjects/GraphObject';
import { input_types, scene } from "../Scene";
import SVG from 'svg.js';
import * as data from '../sales.csv';
import EffectStack from '../EffectStack';
import MoveEffect from './MoveEffect';
import FadeEffect from './FadeEffect';

class SimpleBarChart extends GraphObject {
    constructor(x, y, width, height, name, bounding_box) {
        super(x, y, width, height, "Simple Bar Chart", name, bounding_box);
        this.x_axis = null;
        this.y_axis = null;
        this.bars = null;
        this.x_scale = null;
        this.y_scale = null;
        this.x_data = null;
        this.y_data = null;
        this.columns = null;
        this.graph_x = null;
        this.graph_y = null;
        this.inner_graph = null;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.graph_width = this.total_width - this.margin.left - this.margin.right;
        this.graph_height = this.total_height - this.margin.top - this.margin.bottom;
        this.data = data;
        this.axis_styling = {};
        this.bar_styling = { fill: "blue" };
        this.import_data();
        this.all_effects = [MoveEffect];
        // let's do something fun
        let new_effectstack = new EffectStack(this, 0, 1000);
        this.track.add_effectstack(new_effectstack);
        let new_effect = new_effectstack.add_effect(FadeEffect.get_blueprint());
        new_effect.start_opacity = 0.5;
        new_effect.end_opacity = 1;
        this.track.play();
    }

    import_data(self = this) {
        d3.csv(this.data)
            .then(function (data) {
                self.data = data;
                self.columns = Object.keys(self.data[0]);
                self.x_data = self.columns[0];
                self.y_data = self.columns[1];
                // clear the graph
                // this.SVG_reference.
                self.SVG_reference.clear();
                self.construct_graph();
            })
    }

    construct_inner_graph(self = this) {
        self.inner_graph = self.svg_container
            .append("g")
            .attr("class", "inner_graph")
            .attr("transform",
                "translate(" + self.margin.left + "," + self.margin.top + ")");
    }

    construct_x_axis(self = this) {
        // add the x Axis
        self.graph_x = d3.scaleBand()
            .range([0, self.graph_width])
        self.graph_x.domain(self.data.map(function (d) { return d[self.x_data]; }));
        this.x_axis = self.inner_graph.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0," + self.graph_height + ")")
            .call(d3.axisBottom(self.graph_x));
    }

    construct_y_axis(self = this) {
        self.graph_y = d3.scaleLinear()
            .range([self.graph_height, 0]);
        // add the y Axis
        this.graph_y.domain([0, d3.max(self.data, function (d) { return d[self.y_data]; })]);
        this.y_axis = self.inner_graph.append("g")
            .attr("class", "y_axis")
            .call(d3.axisLeft(self.graph_y));
    }


    construct_graph(self = this) {
        self.construct_inner_graph();
        self.construct_x_axis();
        self.construct_y_axis();
        // append the rectangles for the bar chart
        self.bars = self.inner_graph.selectAll("." + self.name + "_bar")
            .data(self.data)
            .enter().append("rect")
            .attr("class", self.name + "_bar")
            .attr("x", function (d) { return self.graph_x(d[self.x_data]); })
            .attr("width", self.graph_x.bandwidth())
            .attr("y", function (d) { return self.graph_y(d[self.y_data]); })
            .attr("height", function (d) { return self.graph_height - self.graph_y(d[self.y_data]); });

        for (let style in self.bar_styling) {
            self.bars.attr(style, self.bar_styling[style]);
        }
    }

    get_targetable_components(self = this) {
        return {
            "svg_container": self.svg_container,
            "inner_graph": self.inner_graph,
            "bars": self.bars,
            "x_axis": self.x_axis,
            "y_axis": self.y_axis
        }
    }

    static create(callback, self = this) {
        const drawing = SVG.adopt(document.getElementById('canvas'));
        // first, let's clear all other listener on drawing
        drawing.off('mousedown');
        drawing.off('mouseup');

        var rect;
        const start_draw = (e) => {
            rect = drawing.rect();
            rect.draw(e);
        }
        const end_draw = (e) => {
            rect.draw('stop', e);
            // add the circle to the list of new objects
            var x = rect.x();
            var y = rect.y();
            var width = rect.attr('width');
            var height = rect.attr('height');
            // should be some sort of dispatch action here
            rect.attr('fill', 'red');
            const new_rect = new SimpleBarChart(x, y, width, height, 'simple bar graph', rect);
            scene.add_graphical_object(new_rect);
            // unbind the listener
            drawing.off('mousedown', start_draw);
            drawing.off('mouseup', end_draw);
        }
        drawing.on('mousedown', start_draw, false);
        drawing.on('mouseup', end_draw, false);
    }

    static get_blueprint(self = this) {
        return {
            type: "Simple Bar Chart",
            tooltips: "This is a simple bar chart",
            icon_representation: "",
            create_fn: SimpleBarChart.create
        }
    }

    export_attributes(self = this) {
        const new_attr = {
            bar_styling: {
                type: input_types.STRING,
                range: "",
                tooltips: "The name of the graphical object",
                value: JSON.stringify(this.bar_styling)
            },
            axis_styling: {
                type: input_types.STRING,
                range: "",
                value: JSON.stringify(this.axis_styling)
            }
        }
        return { ...this.export_default_attributes(), ...new_attr };
    }

    edit_attr(d) {
        if (!d) return;
        this.edit_default_attr(d);
        const attr = d.attribute;
        const value = d.value;
        switch (attr) {
            case "text":
                this.text.plain(value);
                return;
            default:
                break;
        }
        // this.SVG_reference.clear();
        // this.construct_graph();
        // this.SVG_reference
        //     .attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`);

    }
}
export default SimpleBarChart;
