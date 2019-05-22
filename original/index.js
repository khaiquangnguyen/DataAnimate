class SimpleBarChart {
    constructor(name) {
        this.svg_container = null;
        this.name = name;
        this.timeline = [];
        this.data = null;
        this.total_width = 500;
        this.total_height = 500;
        this.x = 0;
        this.y = 0;
        this.opacity = 0;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.graph_width = this.total_width - this.margin.left - this.margin.right;
        this.graph_height = this.total_height - this.margin.top - this.margin.bottom;
        // construct the svg object container
    }

    import_data(self = this) {
        d3.csv("sales.csv", function (error, data) {
            if (error) throw error;
            self.data = data;
            // // format the data
            // data.forEach(function (d) {
            //     d.sales = +d.sales;
            // });
            self.construct_graph();
        });
    }

    construct_svg(self = this) {
        self.svg_container = d3.select("body").append("svg")
            .attr("width", self.total_width)
            .attr("height", self.total_height)
            .attr("id", self.name)
            // .attr("style", "background-color: red")
            .append("g")
            .attr("class", "inner_graph")
            .attr("transform",
                "translate(" + self.margin.left + "," + self.margin.top + ")");
    }

    construct_graph(self = this) {
        var x = d3.scaleBand()
            .range([0, self.graph_width])
            .padding(0.1);
        var y = d3.scaleLinear()
            .range([self.graph_height, 0]);
        // Scale the range of the data in the domains
        x.domain(self.data.map(function (d) { return d.salesperson; }));
        y.domain([0, d3.max(self.data, function (d) { return d.sales; })]);

        // append the rectangles for the bar chart
        self.svg_container.selectAll("." + self.name + "_bar")
            .data(self.data)
            .enter().append("rect")
            .attr("class", self.name + "_bar")
            .attr("x", function (d) { return x(d.salesperson); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.sales); })
            .attr("fill", "blue")
            .attr("height", function (d) { return self.graph_height - y(d.sales); });


        // add the x Axis
        self.svg_container.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0," + self.graph_height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        self.svg_container.append("g")
            .attr("class", "y_axis")
            .call(d3.axisLeft(y));
    }

    add_effect(effect) {
    }

    get_elements_to_target(self = this) {
        return ["svg_container", "bars", "x_axis", "y_axis"];
    }

    get svg_container(self = this) {
        return self.svg_container;
    }

    get bars(self = this) {
        return self.svg_container.selectAll("." + self.name + "_bar");
    }

}

const chart = new SimpleBarChart("barChart");
chart.construct_svg();
chart.import_data();
// setTimeout(() => (chart.add_effect()), 500);


class AnimationEffect {
    /**
    * 
    * @param {*} name the name of the effect
    * @param {*} actor the actor that the effect is applied to
    * @param {*} duration the duration of the effect. If not applicable, then is -1
    * @param {*} targeted_element the element of the actor to target. targetable elements can be access from the actor "get_elements_to_target"
    * @param {*} exclusive true if when this effect is active, no other effect can be active. False otherwise
    */
    constructor(name, parent_actor, duration, targeted_element, exclusive = true) {
        this.name = name;
        this.actor = parent_actor;
        t5his.duration = duration;
        this.targeted_element = targeted_element;
        this.exclusive = exclusive;
    }
}


class FadeinEffect extends AnimationEffect {
    constructor(name, actor, duration) {
        super(name, actor, duration, "svg_container", true);
    }


    effect(self = this) {
        const actor_svg_container = self.actor.svg_container;
        console.log(actor_svg_container);
        actor_svg_container
            .attr("opacity", 0)
            .transition()
            .duration(self.duration)
            .attr("opacity", 1)
    }
}

const effect = new AnimationEffect("fade", chart);
effect.effect();
console.log(chart);