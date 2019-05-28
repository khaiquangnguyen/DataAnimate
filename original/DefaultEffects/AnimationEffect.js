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

    stop(self = this) {
        return;
    }

    export_default_params(self = this) {
        return {
            name: {
                type: input_types.CONST,
                range: "",
                tooltips: "The name of the the effect",
                value: this.name
            },
            exclusive: {
                type: input_types.BOOLEAN,
                range: [true, false],
                value: this.exclusive,
            },
            enabled: {
                type: input_types.BOOLEAN,
                range: [true, false],
                value: this.enabled,
            }
        }
    }

    export_extra_params(self = this) {
        return {}
    }

    export_state(self = this) {
        return { ...self.export_default_params, ...self.export_extra_params };
    }

}





