const input_types = {
    STRING: "string",
    INT: "int",
    FLOAT: "float",
    DROPDOWN: "dropdown",
    SELECTOR: "selector",
    BOOLEAN: "boolean"
}

class GraphicalObject {
    constructor(width, height, type) {
        this.type = type;
        this.name = null;
        this.total_width = width;
        this.total_height = height;
        this.x = 100;
        this.y = 50;
        this.opacity = 0;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.track = new Track(this);
        this.data = null;
        this.svg_container = null;
        this.unique_id = null;
        this.graph_width = this.total_width - this.margin.left - this.margin.right;
        this.graph_height = this.total_height - this.margin.top - this.margin.bottom;
        this.bounding_box = null;
    }

    get_default_parameters(self = this) {
        return {
            "name": {
                "type": input_types.STRING,
                "range": "",
                "tooltips": "The name of the graphical object",
                "setter": null,
            },
            "width": {
                "type": input_types.INT,
                "range": [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
            },
            "height": {
                "type": input_types.INT,
                "range": [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
            },
            "x": {
                "type": input_types.INT,
                "range": [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
            },
            "y": {
                "type": input_types.INT,
                "range": [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
            },
            "opacity": {
                "type": input_types.FLOAT,
                "range": [0, 1]
            },
            "margin_top": {
                "type": input_types.INT,
                "range": [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
            },
            "margin_right": {
                "type": input_types.INT,
                "range": [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
            }
            ,
            "margin_left": {
                "type": input_types.INT,
                "range": [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
            },
            "margin_bottom": {
                "type": input_types.INT,
                "range": [-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
            },
            "data": {
                "type": input_types.SELECTOR,
                "range": null
            }
        }
    }

    set_width(width) {
        this.total_width = width;
    }

    set_height(height) {
        this.total_height = height;
    }

    set_x(x) {
        this.x = x;
        this.svg_container.attr("x", x);
    }

    set_y(y) {
        this.y = y;
        this.svg_container.attr("y", y);

    }
    set_opacity(opacity) {
        this.opacity = opacity;
        this.svg_container.attr("opacity", opacity);
    }

    set_margin_top(i) {
        this.margin.top = i;
    }
    set_margin_left(i) {
        this.margin.left = i;
    }
    set_margin_right(i) {
        this.margin.right = i;
    }
    set_margin_bottom(i) {
        this.margin.bottom = i;
    }

    set_data(data_file) {
        this.data = data_file;
    }

    set_name(name) {
        this.name = name;
    }


    resize(x, y, width, height, self = this) {
        // set the new attributes
        var scale_x = width / this.total_width;
        var scale_y = height / this.total_height;
        this.x = x;
        this.y = y;
        this.total_width = width;
        this.total_height = height;
        this.graph_width = this.total_width - this.margin.left - this.margin.right;
        this.graph_height = this.total_height - this.margin.top - this.margin.bottom;
        self.svg_container
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("width", this.total_width)
            .attr("height", this.total_height)
    }

    construct_svg_container(self = this) {
        // create svg container
        self.svg_container = d3.select("#canvas")
            .append("svg")
            .attr("width", this.total_width)
            .attr("height", this.total_height)
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("opacity", 0.2)
            .attr("id", self.name);
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
        self.bounding_box.hide();
        self.bounding_box.on('resizing', function (event) {
            console.log("resizing");
            self.resize(self.bounding_box.attr('x'), self.bounding_box.attr('y'), self.bounding_box.attr('width'), self.bounding_box.attr('height'));
        });



        this.bounding_box.on('dragmove', function (event) {
            console.log("moving");
            self.resize(self.bounding_box.attr('x'), self.bounding_box.attr('y'), self.bounding_box.attr('width'), self.bounding_box.attr('height'));
        });

        var target = SVG.adopt(document.getElementById(self.name));
        target.click(function () {
            self.bounding_box.show();
        })
    }
}
