

class SimpleBarChart extends GraphicalObject {
    constructor(width = 500, height = 500) {
        super(width, height, "Simple_Bar_Chart");
        this.inner_graph = null;
        this.x_axis = null;
        this.y_axis = null;
        this.bars = null;
        this.graph_width = this.total_width - this.margin.left - this.margin.right;
        this.graph_height = this.total_height - this.margin.top - this.margin.bottom;
        this.x_scale = null;
        this.y_scale = null;
        this.x_data = null;
        this.y_data = null;
        this.columns = null;
        this.graph_x = null;
        this.graph_y = null;
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

    set_x_data(x_data) {
        this.x_data = x_data;
    }
    set_y_data(y_data) {
        this.y_data = y_data;
    }
    set_x_scale(x_scale) {
        this.x_scale = x_scale;
    }
    set_y_scale(y_scale) {
        this.y_scale = y_scale;
    }

}