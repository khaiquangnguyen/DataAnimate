class AnimationEffect {
    /**
    * 
    * @param {*} name the name of the effect
    * @param {*} actor the actor that the effect is applied to
    * @param {*} duration the duration of the effect. If not applicable, then is -1
    * @param {*} target_component the component of the actor to target. targetable components can be access from the actor 
    * @param {*} exclusive true if when this effect is active, no other effect can be active. False otherwise
    */
    constructor(name, effect_stack, exclusive = true) {
        this.effect_stack = effect_stack;
        this.name = name;
        this.actor = effect_stack.actor;;
        this.duration = effect_stack.duration;
        // must be a list of pure DOM 3elements
        this.target_components = [document.getElementById(this.actor.name)];
        this.exclusive = exclusive;
        this.enabled = true;
        this.unique_id = "AnimationEffect_" + generate_unique_id();
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

    set_actor(actor) {
        this.actor = actor;
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

    static get_name() {
        return this.name;
    }

    reachTo(timestamp = 0, self = this) {
        return;
    }
    play(start_timestamp = 0, self = this) {
        return;
    }
    pause(self = this) {
        return;
    }

    resume(self = this) {
        return;
    }

}

class SVG_Move extends AnimationEffect {
    constructor(effect_stack, ) {
        super("MoveTo", effect_stack, true);
        this.start_x = this.actor.x;
        this.start_y = this.actor.y;
        this.end_x = this.actor.x;
        this.end_y = this.actor.y;
    }

    reachTo(timestamp = 0, self = this) {
        if (timestamp < 0 || timestamp >= self.duration) return;
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            // clear out all animations
            svg_e.play();
            svg_e.stop();
            // get current position based on start_timestamp
            const start_x = self.start_x + (self.end_x - self.start_x) * timestamp / self.duration;
            const start_y = self.start_y + (self.end_y - self.start_y) * timestamp / self.duration;
            svg_e.x(start_x);
            svg_e.y(start_y);
        });
    }

    play(start_timestamp = 0, self = this) {
        this.reachTo(start_timestamp);
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            // clear out all animations
            svg_e.play();
            svg_e.stop();
            svg_e.animate(self.duration - start_timestamp).move(self.end_x, self.end_y).rotate(45);
        });
    }

    pause(self = this) {
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.pause();
        });
    }

    resume(self = this) {
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.play();
        });
    }

    set_attributes(begin_x = this.start_x, begin_y = this.start_y, end_x = this.end_x, end_y = this.end_y) {
        this.start_x = begin_x;
        this.start_y = begin_y;
        this.end_x = end_x;
        this.end_y = end_y;
    }

    static get_blueprint(self = this) {
        return {
            name: "SVG - Move To",
            tooltips: "Move an object from a starting location to an end location",
            icon_representation: "",
            create_fn: SVG_Move.create
        }
    }

    create(effect_stack, self = this) {
        const effect = new SVG_Move(effect_stack);
    }
}

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



