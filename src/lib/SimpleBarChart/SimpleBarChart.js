import * as d3 from 'd3';
import GraphObject from '../DefaultObjects/GraphObject';
import { input_types, scene } from "../Scene";
import SVG from 'svg.js';
import * as data from '../sales.csv';
import MoveEffect from './MoveEffect';
import FadeEffect from './FadeEffect';
import BarGrowByOne from './BarGrowByOne';
import BarSort from './BarSort';
import { editAttribute, setObject, addObject } from '../../actions/index'
import { store } from '../../index';

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
        this.raw_data = data;
        this.data = "";
        this.axis_styling = {};
        this.bar_styling = '"fill":"lightblue","stroke":"lightblue","stroke-width":"1"';
        this.import_data();
        this.effect_bps = [BarSort.get_blueprint(), MoveEffect.get_blueprint(), FadeEffect.get_blueprint(), BarGrowByOne.get_blueprint()];
        store.dispatch(addObject(this));
        store.dispatch(setObject(this));
        let self = this;
        this.bounding_box.on('dragend', (e) => {
            store.dispatch(editAttribute(this, 'x', this.bounding_box.attr('x')));
            store.dispatch(editAttribute(this, 'y', this.bounding_box.attr('y')));
            this.svg_container.attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`)
            this.SVG_reference.clear();
            this.construct_graph();
            console.log('a');

        })
        this.bounding_box.on('resizedone', (e) => {
            store.dispatch(editAttribute(this, 'x', this.bounding_box.attr('x')));
            store.dispatch(editAttribute(this, 'y', this.bounding_box.attr('y')));
            store.dispatch(editAttribute(this, 'width', this.bounding_box.attr('width')));
            store.dispatch(editAttribute(this, 'height', this.bounding_box.attr('height')));
            this.svg_container.attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`)
            this.SVG_reference.clear();
            this.construct_graph();

        })
        this.bounding_box.on('resizing', function (event) {
            var x = self.bounding_box.attr('x');
            var y = self.bounding_box.attr('y');
            var width = self.bounding_box.attr('width');
            var height = self.bounding_box.attr('height');
            self.edit_attr({ attribute: 'x', value: x });
            self.edit_attr({ attribute: 'y', value: y });
            self.edit_attr({ attribute: 'width', value: width });
            self.edit_attr({ attribute: 'height', value: height });
        });
        this.bounding_box.on('dragmove', function (event) {
            var x = self.bounding_box.attr('x');
            var y = self.bounding_box.attr('y');
            var width = self.bounding_box.attr('width');
            var height = self.bounding_box.attr('height');
            self.edit_attr({ attribute: 'x', value: x });
            self.edit_attr({ attribute: 'y', value: y });
            self.edit_attr({ attribute: 'width', value: width });
            self.edit_attr({ attribute: 'height', value: height });
        });
    }

    import_data(self = this) {
        d3.csv(this.raw_data)
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

    select(self = this) {
        this.bounding_box.draggable().selectize().resize();
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
            .attr("x", function (d) { return self.x_scale(d[self.x_data]) + 5; })
            .attr("width", function (d) { return (self.x_scale.bandwidth() - 10) })
            .attr("y", function (d) { return self.y_scale(d[self.y_data]); })
            .attr("height", function (d) {
                return self.graph_height - self.y_scale(d[self.y_data]);
            });

        this.apply_bar_string_styling();
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
            rect.attr("fill", "none");
            rect.attr("stroke", "black");
            rect.attr("stroke-width", "2");
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
            // rect.attr('fill', 'none');
            rect.addClass('bounding-box');
            const new_rect = new SimpleBarChart(x, y, width, height, 'simple bar graph', rect);
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
                type: input_types.TEXT_AREA,
                range: "",
                tooltips: "The name of the graphical object",
                value: this.bar_styling
            },
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
                this.bar_styling = value;
                this.apply_bar_string_styling();

                return;
            case "axis_styling":
                this.axis_styling = JSON.parse(value);
                this.SVG_reference.clear();
                this.construct_graph();
                return;
            default:
                break;
        }
        this.graph_width = this.total_width - this.margin.left - this.margin.right;
        this.graph_height = this.total_height - this.margin.top - this.margin.bottom;
        this.bounding_box.attr("x", this.x);
        this.bounding_box.attr("y", this.y);
        this.bounding_box.attr("width", this.total_width);
        this.bounding_box.attr("height", this.total_height);
    }

    apply_bar_string_styling(self = this) {
        try {
            let style_dict = JSON.parse("{" + this.bar_styling + "}");
            for (let style in style_dict) {
                self.bars.attr(style, style_dict[style]);
            }
        }
        catch (error) {
            return;
        }

    }
}
export default SimpleBarChart;
