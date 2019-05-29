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

    stop(self = this) {
        this.target_components.forEach(e => {
            var svg_e = SVG.adopt(e);
            svg_e.stop();
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

    static create(effect_stack, self = this) {
        const effect = new SVG_Move(effect_stack);
    }

    export_extra_params(self = this) {
        return {
            begin_x: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning x position",
                value: this.begin_x
            },
            end_x: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning x position",
                value: this.end_x
            },
            begin_y: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning x position",
                value: this.begin_y
            },
            end_y: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                tooltips: "The beginning x position",
                value: this.end_y
            }
        }
    }
}
