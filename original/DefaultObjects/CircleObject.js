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

// create_circle(self = this) {
//     const drawing = SVG.adopt(document.getElementById('canvas'));
//     var circle;
//     const start_draw = (e) => {
//         circle = drawing.circle();
//         circle.draw(e);
//     }
//     const end_draw = (e) => {
//         circle.draw('stop', e);
//         // add the circle to the list of new objects
//         var cx = circle.attr("cx")
//         var cy = circle.attr("cy")
//         var r = circle.attr('r');
//         // set it as the currently chosen circle
//         self.set_curr_graphical_object(new CircleObject(cx, cy, r, "test_circle", circle));
//         self.add_graphical_object(self.curr_graphical_object);
//         // unbind the listener
//         console.log(drawing);
//         drawing.off('mousedown', start_draw);
//         drawing.off('mouseup', end_draw);
//     }
//     drawing.on('mousedown', start_draw, false);
//     drawing.on('mouseup', end_draw, false);
// }