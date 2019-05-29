
class ResizeEffect extends AnimationEffect {
    constructor(target_component = "svg_container") {
        super("Resize", target_component, false);
        this.begin_width_ratio = 0;
        this.end_width_ratio = 1;
        this.begin_height_ratio = 1;
        this.end_height_ratio = 1;
    }

    schedule(self = this, start_time) {
        if (start_time <= duration) {
            setTimeout(() => {

            }, timeout);
        }
    }

    execute(self = this) {
        const targetable_components = self.get_targetable_components();
        const target_component_selector = targetable_components[self.target_component];
        console.log(target_component_selector._groups);
        target_component_selector._groups[0].forEach(e => {
            const effect_dummy = {};
            d3.select(effect_dummy).transition()
                .duration(self.duration)
                .tween("attr:transform", function () {
                    const element = d3.select(e);
                    var begin_string = `scale(${self.begin_width_ratio},${self.begin_height_ratio})`;
                    var end_string = `scale(${self.end_width_ratio},${self.end_height_ratio})`;
                    var i_scale = d3.interpolateString(begin_string, end_string);
                    return function (t) {
                        element.attr("transform", i_scale(t));
                    }
                });
        });
    }
}