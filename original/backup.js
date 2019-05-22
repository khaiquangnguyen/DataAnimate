class ResizeEffect extends AnimationEffect {
    constructor(actor, duration, target_component = "bars") {
        super("Resize", actor, duration, target_component, false);
        this.begin_width_ratio = 1;
        this.end_width_ratio = 1;
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
                .tween("attr:transform", function () {
                    const element = d3.select(e);
                    // const width = element.attr("width");
                    // const height = element.attr("height");
                    // const begin_width = width * self.begin_width_ratio;
                    // const end_width = width * self.end_width_ratio;
                    // const begin_height = height * self.begin_height_ratio;
                    // const end_height = height * self.end_height_ratio;
                    // console.log(element.attr("width"));
                    // const start_y = parseFloat(element.attr("y"));
                    // const end_y = start_y + begin_height - end_height;
                    // const start_x = parseFloat(element.attr("x"));
                    // const end_x = start_x + (begin_width - end_width) / 2;
                    // console.log(start_y, end_y);
                    // var i_width = d3.interpolate(begin_width, end_width);
                    // var i_heigth = d3.interpolate(begin_height, end_height);
                    // var i_y = d3.interpolate(start_y, end_y);
                    // var i_x = d3.interpolate(start_x, end_x);
                    var begin_string = `scale(${self.begin_width_ratio},${self.begin_height_ratio})`;
                    var end_string = `scale(${self.end_width_ratio},${self.end_height_ratio})`;
                    var i_scale = d3.interpolateString(begin_string, end_string);
                    return function (t) {
                        // element.attr("width", i_width(t));
                        // element.attr("height", i_heigth(t));
                        // element.attr("y", i_y(t));
                        // element.attr("x", i_x(t));
                        element.attr("transform", i_scale(t));

                    }
                });
        });
    }
}