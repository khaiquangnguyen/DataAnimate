class GraphicalObject {
    constructor(x, y, width, height, name) {
        this.type = "";
        this.name = name;
        this.total_width = width;
        this.total_height = height;
        this.x = x;
        this.y = y;
        this.opacity = 1;
        this.track = new Track(this);
        this.data = null;
        this.SVG_reference = null;
        this.unique_id = "graphicalObject_" + generate_unique_id();
        // add onclick event
    }

    select(self = this) {
        this.SVG_reference.selectize().draggable().resize();
    }
    deselect(self = this) {
        this.SVG_reference.selectize(false).draggable(false).resize(false);;
    }

    view_as_DOM(self = this) {
        return;
    }
    set_on_click(self = this) {
        this.SVG_reference.on('click', e => {
            scene.set_curr_graphical_object(self);
        })
    }

    remove_effectstack(effect_stack, self = this) {
        this.track.remove_effectstack(effect_stack);
    }

    add_effectstack(effect_stack, self = this) {
        this.track.add_effectstack(effect_stack);
    }

    export_params(self = this) {
        return {
            name: {
                type: input_types.STRING,
                range: "",
                tooltips: "The name of the graphical object",
                value: this.name
            },
            width: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                value: this.total_width,
            },
            height: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                value: this.total_height,
            },
            x: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                value: this.x
            },
            y: {
                type: input_types.INT,
                range: [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                value: this.y
            },
            opacity: {
                type: input_types.FLOAT,
                range: [0, 1],
                value: this.opacity
            },
            data: {
                type: input_types.SELECTOR,
                range: null,
                value: this.data
            },
            linked_object: this
        }
    }


    play(play_time = 0, self = this) {
        self.track.play(play_time);
    }

    pause(self = this) {
        self.track.pause();
    }

    resume(self = this) {
        self.track.resume();
    }

    reachTo(play_time, self = this) {
        self.track.reachTo(play_time);
    }

    reachTo(self = this) {
        self.track.stop();
    }


    export_state(self = this) {
        return { ...this.track.export_state(), ...this.export_params() };
    }

}


class GraphObject extends GraphicalObject {
    constructor(x, y, width, height, type, name) {
        super(x, y, width, height, type, name);
        this.svg_container = null;
        this.bounding_box = null;
        construct_svg_container();
        this.SVG_reference = SVG.adopt(document.getElementById(self.unique_id));
        this.set_on_click();

    }

    construct_svg_container(self = this) {
        // create svg container
        self.svg_container = d3.select("#canvas")
            .append("svg")
            .attr("width", this.total_width)
            .attr("height", this.total_height)
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("opacity", this.opacity)
            .attr("id", self.unique_id);
        self.svg_container.attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`)
            .attr('preserveAspectRatio', 'none')
    }

    construct_bounding_box(self = this) {
        var drawing = SVG.adopt(document.getElementById('canvas'));
        self.bounding_box = drawing.rect(self.total_width, self.total_height);
        self.bounding_box.x(self.x);
        self.bounding_box.y(self.y);
        self.bounding_box.opacity(0.2);
        self.bounding_box.selectize().draggable().resize();
        self.bounding_box.on('resizing', function (event) {
            console.log("resizing");
            var x = self.bounding_box.attr('x');
            var y = self.bounding_box.attr('y');
            var width = self.bounding_box.attr('width');
            var height = self.bounding_box.attr('height');
            self.update_defaults(x, y, width, height);
        });
        this.bounding_box.on('dragmove', function (event) {
            console.log("moving");
            var x = self.bounding_box.attr('x');
            var y = self.bounding_box.attr('y');
            var width = self.bounding_box.attr('width');
            var height = self.bounding_box.attr('height');
            self.update_defaults(x, y, width, height);
        });
    }

    update_defaults(x = this.x, y = this.y, width = this.total_width, height = this.total_height, name = this.name, opacity = this.opacity) {
        this.x = x;
        this.y = y;
        this.total_width = width;
        this.total_height = height;
        this.name = name;
        this.opacity = opacity;
        this.svg_container
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("width", this.total_width)
            .attr("height", this.total_height)
            .attr("opacity", this.opacity)
    }
}