import * as d3 from 'd3';
import GraphObject from '../DefaultObjects/GraphObject';
import { input_types, scene } from "../Scene";
import SVG from 'svg.js';
import * as data from '../sales.csv';
import EffectStack from '../EffectStack';
import MoveEffect from './MoveEffect';
import FadeEffect from './FadeEffect';
import BarGrowByOne from './BarGrowByOne';
class SimpleBarChart extends GraphObject {
    constructor(x, y, width, height, name, bounding_box) {
        super(x, y, width, height, "Simple Bar Chart", name, bounding_box);
        this.x_axis = null;
        this.y_axis = null;
        this.bars = null;
        this.x_data = null;
        this.y_data = null;
        this.columns = null;
        this.x_scale = null;
        this.y_scale = null;
        this.inner_graph = null;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.graph_width = this.total_width - this.margin.left - this.margin.right;
        this.graph_height = this.total_height - this.margin.top - this.margin.bottom;
        this.data = data;
        this.axis_styling = {};
        this.bar_styling = { fill: "blue" };
        this.import_data();
        this.effect_bps = [MoveEffect.get_blueprint(), FadeEffect.get_blueprint(), BarGrowByOne.get_blueprint()];
        // let's do something fun
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
        self.x_scale = d3.scaleBand()
            .range([0, self.graph_width])
        self.x_scale.domain(self.data.map(function (d) { return d[self.x_data]; }));
        this.x_axis = self.inner_graph.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0," + self.graph_height + ")")
            .call(d3.axisBottom(self.x_scale));
    }

    construct_y_axis(self = this) {
        self.y_scale = d3.scaleLinear()
            .range([self.graph_height, 0]);
        // add the y Axis
        this.y_scale.domain([0, d3.max(self.data, function (d) { return d[self.y_data]; })]);
        this.y_axis = self.inner_graph.append("g")
            .attr("class", "y_axis")
            .call(d3.axisLeft(self.y_scale));
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
            .attr("x", function (d) { return self.x_scale(d[self.x_data]); })
            .attr("width", self.x_scale.bandwidth())
            .attr("y", function (d) { return self.y_scale(d[self.y_data]); })
            .attr("height", function (d) {
                return self.graph_height - self.y_scale(d[self.y_data]);
            });

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
            icon_representation: "fa-chart-bar",
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
            case "bar_styling":
                this.bar_styling = JSON.parse(value);
                this.SVG_reference.clear();
                this.construct_graph();
                return;
            case "axis_styling":
                this.axis_styling = JSON.parse(value);
                this.SVG_reference.clear();
                this.construct_graph();
                return;
            default:
                break;
        }

        // this.SVG_reference
        //     .attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`);

    }
}
export default SimpleBarChart;
