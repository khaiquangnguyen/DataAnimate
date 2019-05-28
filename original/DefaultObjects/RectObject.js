class RectObject extends GraphicalObject {
    constructor(x, y, width, height, name, rect) {
        super(x, y, width, height, name);
        this.type = "Rectangle";
        this.opacity = 0.1;
        this.SVG_reference = rect;
        this.SVG_reference.attr("id", this.unique_id);
        this.set_on_click();
    }

    update_defaults(x = this.x, y = this.y, width = this.total_width, height = this.total_height, name = this.name, opacity = this.opacity) {
        this.x = x;
        this.y = y;
        this.total_width = width;
        this.total_height = height;
        this.name = name;
        this.opacity = opacity;
        this.SVG_reference
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("width", this.total_width)
            .attr("height", this.total_height)
            .attr("opacity", this.opacity)
    }

    static create(self = this) {
        const drawing = SVG.adopt(document.getElementById('canvas'));
        var rect;
        const start_draw = (e) => {
            rect = drawing.rect();
            rect.draw(e);
        }
        const end_draw = (e) => {
            rect.draw('stop', e);
            // add the circle to the list of new objects
            var x = rect.x();
            var y = rect.y();
            var width = rect.attr('width');
            var height = rect.attr('height');
            // should be some sort of dispatch action here
            // self.set_curr_graphical_object(new RectObject(x, y, width, height, "test_rectangle", rect));
            // self.add_graphical_object(self.curr_graphical_object);
            // unbind the listener
            console.log(drawing);
            drawing.off('mousedown', start_draw);
            drawing.off('mouseup', end_draw);
        }
        drawing.on('mousedown', start_draw, false);
        drawing.on('mouseup', end_draw, false);
    }

    static get_blueprint(self = this) {
        return {
            name: "Rectangle",
            tooltips: "This is a rectangle",
            icon_representation: "",
            create_fn: RectObject.create
        }
    }

    export_params() {
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
            linked_object: this
        }
    }
}








