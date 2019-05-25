const input_types = {
    STRING:"string", 
    INT:"int", 
    FLOAT:"float", 
    DROPDOWN:"dropdown",
    SELECTOR:"selector",
    BOOLEAN:"boolean"
}

class GraphicalObject {
    constructor(width, height, type) {
        this.type = type;
        this.name = null;
        this.total_width = width;
        this.total_height = height;
        this.x = 0;
        this.y = 0;
        this.opacity = 0;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.track = new Track(this);
        this.data = null;
        this.svg_container = null;
        this.unique_id = null;
    }

    get_default_parameters(self = this) {
        return {
            "name": {
                "type": input_types.STRING,
                "range": "",
                "tooltips":"The name of the graphical object",
                "setter":
                "getter":
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
        this.svg_container.attr("x",x);
    }

    set_y(y) {
        this.y = y;
        this.svg_container.attr("y",y);

    }
    set_opacity(opacity) {
        this.opacity = opacity;
        this.svg_container.attr("opacity",opacity);
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

    set_name(name){
        this.name = name;
    }

    update_graph(self = this) {
        // remove the current svg container, and replace it with a new one with the new attributes
    }

    construct_svg_container(self=this){
        self.svg_container = d3.select("#canvas").append("svg")
        .attr("width", self.total_width)
        .attr("height", self.total_height)
        .attr("id", self.name)
        .attr("x",this.x)
        .attr("y",this.y)
        .attr("opacity",0.2);
    }

}
