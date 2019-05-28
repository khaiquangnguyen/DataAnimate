// class LineObject extends GraphicalObject {
//     constructor(x, y, x_end, y_end, name) {
//         this.x_end = x_end;
//         this.y_end = y_end;
//         const height = abs(this.y_end - this.y);
//         const width = abs(this.x_end - this.x);
//         super(x, y, x_end, y_end, 'Circle', name, circle);

//         this.SVG_reference = circle;
//         this.SVG_reference.attr("id", this.name);
//         this.SVG_reference.selectize().draggable().resize();
//     }

//     update_defaults(x = this.x, y = this.y, r = this.r, opacity = this.opacity, self = this) {
//         this.x = x;
//         this.y = y;
//         this.r = r;
//         this.name = name;
//         this.opacity = opacity;
//         this.total_height = this.r * 2;
//         this.total_width = this.r * 2;
//         this.SVG_reference
//             .attr("cx", x)
//             .attr("cy", y)
//             .attr("r", r)
//             .attr("opacity", this.opacity)
//     }
// }
