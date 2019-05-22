
class SimpleBarChart {
    constructor() {
        this.name = "Simple_Bar_Chart";
        this.svg_container = null;
        this.inner_graph = null;
        this.x_axis = null;
        this.y_axis = null;
        this.bars = null;
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
        this.x_axis_params = { scale: "", domain: "", range: "" }
        this.y_axis_params = { scale: "", domain: "", range: "" }

        // construct the svg object container
    }


    import_data(self = this) {
        d3.csv("sales.csv", function (error, data) {
            if (error) throw error;
            self.data = data;
            self.construct_graph();
        });
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
        self.bars = self.inner_graph.selectAll("." + self.name + "_bar")
            .data(self.data)
            .enter().append("rect")
            .attr("class", self.name + "_bar")
            .attr("x", function (d) { return x(d.salesperson); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.sales); })
            .attr("fill", "blue")
            .attr("height", function (d) { return self.graph_height - y(d.sales); });
        // add the x Axis
        this.x_axis = self.inner_graph.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0," + self.graph_height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        this.y_axis = self.inner_graph.append("g")
            .attr("class", "y_axis")
            .call(d3.axisLeft(y));
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

    // add_effect(effect) {
    // }

    // get_elements_to_target(self = this) {
    //     return ["svg_container", "bars", "x_axis", "y_axis"];
    // }

    // get svg_container() {
    //     return this.svg_container;
    // }

    // get bars() {
    //     return this.svg_container.selectAll("." + self.name + "_bar");
    // }

}


class AnimationEffect {
    /**
    * 
    * @param {*} name the name of the effect
    * @param {*} actor the actor that the effect is applied to
    * @param {*} duration the duration of the effect. If not applicable, then is -1
    * @param {*} target_component the component of the actor to target. targetable components can be access from the actor 
    * @param {*} exclusive true if when this effect is active, no other effect can be active. False otherwise
    */
    constructor(name, parent_actor, duration, target_component = "svg_container", exclusive = true) {
        this.name = name;
        this.actor = parent_actor;
        this.duration = duration;
        this.target_component = target_component;
        this.exclusive = exclusive;
    }

    set_target_component(target_component) {
        if (target_component in this.actor.get_targetable_components()) {
            self.target_component = target_component;
            return 1;
        }
        else {
            console.log("there is no such component");
            return -1;
        }
    }

    set_exclusiveness(exclusive) {
        this.exclusive = exclusive;
    }

    set_name(name) {
        this.name = name;
    }

    get_targetable_components(self = this) {
        return self.actor.get_targetable_components();
    }

    set_duration(duration) {
        this.duration = duration;
    }
}


class ResizeEffect extends AnimationEffect {
    constructor(actor, duration, target_component = "bars") {
        super("Resize", actor, duration, target_component, false);
        this.begin_width_ratio = 1;
        this.end_width_ratio = 0.5;
        this.begin_height_ratio = 1;
        this.end_height_ratio = 0.5;
    }

    executeEffect(self = this) {
        const targetable_components = self.get_targetable_components();
        const target_component_selector = targetable_components[self.target_component];
        console.log(target_component_selector._groups);
        target_component_selector._groups[0].forEach(e => {
            const effect_dummy = {};
            d3.select(effect_dummy).transition()
                .duration(self.duration)
                .tween("", function () {
                    const element = d3.select(e);
                    const width = element.attr("width");
                    const heigth = element.attr("height");
                    const begin_width = width * self.begin_width_ratio;
                    const end_width = width * self.end_width_ratio;
                    const begin_heigth = heigth * self.begin_height_ratio;
                    const end_height = heigth * self.end_height_ratio;
                    console.log(begin_heigth, end_height);
                    var i_width = d3.interpolate(begin_width, end_width);
                    var i_heigth = d3.interpolate(begin_heigth, end_height);
                    return function (t) {
                        element.attr("width", i_width(t));
                        element.attr("height", i_heigth(t));
                    }
                });
        });
    }
}


class FadeinEffect extends AnimationEffect {
    constructor(name, actor, duration) {
        super(name, actor, duration, "svg_container", true);
    }
    play() {

    }
    executeEffect(self = this) {
        const actor_svg_container = self.actor.svg_container;
        const FadeinDummy = {}
        d3.select(FadeinDummy).transition()
            .duration(self.duration)
            .tween("", function () {
                var i = d3.interpolate(1, 0.2);
                return function (t) {
                    actor_svg_container.attr("opacity", i(t));
                }
            });
    }
}

const chart = new SimpleBarChart("barChart");
chart.construct_svg();
chart.import_data();
const FadeInEffect = new FadeinEffect("FadeIn", chart, 1000);
const resize = new ResizeEffect(chart, 1000);
setTimeout(() => {
    FadeInEffect.executeEffect();
    resize.executeEffect();
}, 500);
