class CircleObject extends GraphicalObject {
    constructor(x, y, r, name, circle) {
        super(x, y, r * 2, r * 2, 'Circle', name);
        this.r = r;
        this.SVG_reference = circle;
        this.SVG_reference.attr("id", this.unique_id);
        this.set_on_click();
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
}
