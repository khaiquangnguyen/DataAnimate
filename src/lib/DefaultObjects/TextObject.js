class TextObject extends GraphicalObject {
    constructor(x, y, width, height, name, text) {
        super(x, y, width, height, 'Text', name);
        this.text = text;
        this.construct_svg_container();
        this.construct_bounding_box();
        var drawing = SVG.adopt(document.getElementById(this.unique_id));
        this.SVG_reference = drawing.text(this.text);
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
            .attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`)
    }
}