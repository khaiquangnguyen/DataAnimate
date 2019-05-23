class AnimationEffect {
    /**
    * 
    * @param {*} name the name of the effect
    * @param {*} actor the actor that the effect is applied to
    * @param {*} duration the duration of the effect. If not applicable, then is -1
    * @param {*} target_component the component of the actor to target. targetable components can be access from the actor 
    * @param {*} exclusive true if when this effect is active, no other effect can be active. False otherwise
    */
    constructor(name, parent_actor, target_component = "svg_container", exclusive = true) {
        this.name = name;
        this.actor = parent_actor;
        this.duration = 0;
        this.effect_stack = null;
        this.target_component = target_component;
        this.exclusive = exclusive;
        this.enabled = true;
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

    set_effect_stack(effect_stack, self = this) {
        this.effect_stack = effect_stack;
    }
    get_targetable_components(self = this) {
        return self.actor.get_targetable_components();
    }

    set_duration(duration) {
        this.duration = duration;
    }

    enable(self = this) {
        self.enable = true;
    }
    disable(self = this) {
        self.disable = true;
    }
}


class ResizeEffect extends AnimationEffect {
    constructor(actor, duration, target_component = "svg_container") {
        super("Resize", actor, duration, target_component, false);
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

class FadeOutEffect extends AnimationEffect {
    constructor(actor) {
        super("Fade Out", actor, 'svg_container', false);
    }

    execute_halfway(self = this, time_left) {
        const targetable_components = self.get_targetable_components();
        const target_component_selector = targetable_components[self.target_component];
        target_component_selector._groups[0].forEach(e => {
            const effect_dummy = {};
            d3.select(effect_dummy).transition()
                .duration(time_left)
                .tween("attr:opacity", function () {
                    const element = d3.select(e);
                    var i_scale = d3.interpolateNumber(time_left / self.duration, 0);
                    return function (t) {
                        element.attr("transform", i_scale(t));
                    }
                });
        });
    }

    execute(self = this) {
        const targetable_components = self.get_targetable_components();
        const target_component_selector = targetable_components[self.target_component];
        console.log(target_component_selector);
        target_component_selector._groups[0].forEach(e => {
            const effect_dummy = {};
            d3.select(effect_dummy).transition()
                .duration(self.duration)
                .tween("attr:opacity", function () {
                    const element = d3.select(e);
                    var i = d3.interpolateNumber(1, 0);
                    return function (t) {
                        element.attr("opacity", i(t));
                    }
                });
        });
    }
}


class FadeInEffect extends AnimationEffect {
    constructor(actor) {
        super("Fade In", actor, 'bars', false);
    }

    execute(self = this) {
        const targetable_components = self.get_targetable_components();
        const target_component_selector = targetable_components[self.target_component];
        console.log(target_component_selector);
        target_component_selector._groups[0].forEach(e => {
            const effect_dummy = {};
            d3.select(effect_dummy).transition()
                .duration(self.duration)
                .tween("attr:opacity", function () {
                    const element = d3.select(e);
                    var i = d3.interpolateNumber(0, 1);
                    return function (t) {
                        element.attr("opacity", i(t));
                    }
                });
        });
    }
}



