
class Actor {
    constructor(width, height) {
        this.total_width = width;
        this.total_height = height;
        this.x = 0;
        this.y = 0;
        this.opacity = 0;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.track = new Track(this);
    }
}

class SimpleBarChart extends Actor {
    constructor(width = 500, height = 500) {
        super(width, height);
        this.name = "Simple_Bar_Chart";
        this.svg_container = null;
        this.inner_graph = null;
        this.x_axis = null;
        this.y_axis = null;
        this.bars = null;
        this.data = null;
        this.graph_width = this.total_width - this.margin.left - this.margin.right;
        this.graph_height = this.total_height - this.margin.top - this.margin.bottom;
        this.x_axis_params = { scale: "", domain: "" }
        this.y_axis_params = { scale: "", domain: "" }
        // construct the svg object container
    }



    import_data(self = this) {
        d3.csv("sales.csv", function (error, data) {
            if (error) throw error;
            self.data = data;
            self.construct_graph();
        });
    }

    select_x_domain(self = this, domain) {
        this.x_axis_params.domain = domain;
    }

    select_y_domain(self = this, domain) {
        this.y_axis_params.domain = domain;
    }
    construct_svg(self = this) {
        self.svg_container = d3.select("body").append("svg")
            .attr("width", self.total_width)
            .attr("height", self.total_height)
            .attr("id", self.name)
        self.inner_graph = self.svg_container
            .append("g")
            .attr("class", "inner_graph")
            .attr("transform",
                "translate(" + self.margin.left + "," + self.margin.top + ")");
    }


    construct_x_axis(self = this) {
        // add the x Axis
        var x = d3.scaleBand()
            .range([0, self.graph_width])
            .padding(0.1);
        this.x_axis = self.inner_graph.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0," + self.graph_height + ")")
            .call(d3.axisBottom(x));

    }

    construct_y_axis(self = this) {
        var y = d3.scaleLinear()
            .range([self.graph_height, 0]);
        // add the y Axis
        this.y_axis = self.inner_graph.append("g")
            .attr("class", "y_axis")
            .call(d3.axisLeft(y));
    }
    construct_graph(self = this) {

        // Scale the range of the data in the domains
        x.domain(self.data.map(function (d) { return d.salesperson; }));
        y.domain([0, d3.max(self.data, function (d) { return d.sales; })]);
        // append the rectangles for the bar chart
        self.bars = self.inner_graph.selectAll("." + self.name + "_bar")
            .data(self.data)
            .enter().append("rect")
            .attr("class", self.name + "_bar")
            .attr("x", function (d) { return x(d.salesperson); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.sales); })
            .attr("fill", "blue")
            .attr("height", function (d) { return self.graph_height - y(d.sales); });


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
}