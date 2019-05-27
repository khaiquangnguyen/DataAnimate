class RectObject extends GraphicalObject {
    constructor(x, y, width, height, name) {
        super(x, y, width, height, 'Rectangle', name, rect);
        this.opacity = 0.1;
        this.SVG_reference = rect;
        this.SVG_reference.attr("id", this.name);
        this.construct_bounding_box();
        this.SVG_reference.click(function () {
            this.bounding_box.show();
        })
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

}

class CircleObject extends GraphicalObject {
    constructor(x, y, r, name) {
        super(x, y, r * 2, r * 2, 'Circle', name, circle);
        this.r = r;
        this.SVG_reference = circle;
        this.construct_bounding_box();
        this.SVG_reference.attr("id", this.name);
    }

    update_defaults(x = this.x, y = this.y, r = this.r, opacity = this.opacity, self = this) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.name = name;
        this.opacity = opacity;
        this.total_height = this.r * 2;
        this.total_width = this.r * 2;
        this.SVG_reference
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", r)
            .attr("opacity", this.opacity)
    }

    construct_bounding_box(self = this) {
        var drawing = SVG.adopt(document.getElementById('canvas'));
        var cx = self.x;
        var cy = self.y;
        self.bounding_box = drawing.circle(self.r * 2);
        self.bounding_box.attr("cx", cx);
        self.bounding_box.attr("cy", cy);
        self.bounding_box.opacity(0.2);
        self.bounding_box.selectize().draggable().resize();
        console.log(self.bounding_box);
        self.bounding_box.on('resizing', function (event) {
            console.log("resizing");
            var x = self.bounding_box.attr('cx');
            var y = self.bounding_box.attr('cy');
            var r = self.bounding_box.attr('r');
            self.update_defaults(x, y, r);
        });
        this.bounding_box.on('dragmove', function (event) {
            var x = self.bounding_box.attr('cx');
            var y = self.bounding_box.attr('cy');
            var r = self.bounding_box.attr('r');
            self.update_defaults(x, y, r);
        });
    }
}


class GraphObject extends GraphicalObject {
    constructor(x, y, width, height, type, name) {
        super(x, y, width, height, type, name);
        construct_svg_container();
        this.SVG_reference = SVG.adopt(document.getElementById(self.name));
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
            .attr("id", self.name);
        self.svg_container.attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`)
            .attr('preserveAspectRatio', 'none')
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