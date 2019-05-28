const input_types = {
    STRING: "string",
    INT: "int",
    FLOAT: "float",
    DROPDOWN: "dropdown",
    SELECTOR: "selector",
    BOOLEAN: "boolean",
}

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
    set_on_click(sel = this) {
        this.SVG_reference.on('click', e => {
            console.log(e);
        })
    }

    export_defaults(self = this) {
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

    export_state(self = this) {
        return this.export_defaults();
    }

}
