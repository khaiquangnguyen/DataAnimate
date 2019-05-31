import * as d3 from 'd3.js';
import 
class SimpleBarChart extends GraphObject {
    constructor(width = 500, height = 500) {
        super(width, height, "Simple_Bar_Chart");
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

        // construct the svg object container
    }

    import_data(self = this) {
        d3.csv(this.data, function (error, data) {
            if (error) throw error;
            self.data = data;
            self.columns = Object.keys(self.data[0]);
        });
    }

    construct_inner_graph(self = this) {
        self.inner_graph = self.svg_container
            .append("g")
            .attr("class", "inner_graph")
            .attr("transform",
                "translate(" + self.margin.left + "," + self.margin.top + ")");
        console.log(self.svg_container);
    }

    construct_x_axis(self = this) {
        console.log(self.x_data);
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
        // append the rectangles for the bar chart
        self.bars = self.inner_graph.selectAll("." + self.name + "_bar")
            .data(self.data)
            .enter().append("rect")
            .attr("class", self.name + "_bar")
            .attr("x", function (d) { return self.graph_x(d[self.x_data]); })
            .attr("width", self.graph_x.bandwidth())
            .attr("y", function (d) { return self.graph_y(d[self.y_data]); })
            .attr("fill", "blue")
            .attr("height", function (d) { return self.graph_height - self.graph_y(d[self.y_data]); });
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

    get_parameters(self = this) {
        return {
            "x_axis_scale": {
                "type": "dropdown",
                "range": ['scaleBand', 'scaleLinear']
            },
            "y_axis_scale": {
                "type": "dropdown",
                "range": ['scaleBand', 'scaleLinear']
            },
            "x_data": {
                "type": "dropdown",
                "range": this.columns
            },
            "y_data": {
                "type": "dropdown",
                "range": this.columns
            },

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
            rect.attr('fill','none');
            const new_rect = new SimpleBarChart(x, y, width, height, 'SimpleBarGraph','simple bar graph',rect);
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

}
import GraphObject from './GraphObject';
