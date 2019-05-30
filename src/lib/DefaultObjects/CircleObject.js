import GraphicalObject from './GraphicalObject';
import SVG from 'svg.js';
import { scene } from "../Scene";
import '../SVG_plugins/svg.draggable';
import '../SVG_plugins/svg.draw';
import '../SVG_plugins/circle';
import '../SVG_plugins/ellipse';
import '../SVG_plugins/lineable';
import '../SVG_plugins/rectable';
import '../SVG_plugins/svg.resize';
import '../SVG_plugins/svg.select';
import { store } from '../../index';
import { editAttribute } from '../../actions/index'

class CircleObject extends GraphicalObject {
    constructor(cx, cy, r, name, circle) {
        const x = cx - r;
        const y = cy - r;
        super(x, y, r * 2, r * 2, name);
        this.r = r;
        this.cx = cx;
        this.cy = cy;
        this.type = "Circle";
        this.SVG_reference = circle;
        this.SVG_reference.attr("id", this.unique_id);
        this.set_on_click();
    }

    select(self = this) {
        this.SVG_reference.draggable().selectize().resize();
        this.SVG_reference.on('dragend', (e) => {
            store.dispatch(editAttribute('cx', this.SVG_reference.attr('cx')));
            store.dispatch(editAttribute('cy', this.SVG_reference.attr('cy')));
            // events are still bound e.g. dragend will fire anyway
        })
        this.SVG_reference.on('resizedone', (e) => {
            store.dispatch(editAttribute('cx', this.SVG_reference.attr('cx')));
            store.dispatch(editAttribute('cy', this.SVG_reference.attr('cy')));
            store.dispatch(editAttribute('r', this.SVG_reference.attr('r')));
        })
    }

    deselect(self = this) {
        this.SVG_reference.selectize(false).draggable(false).resize(false);;
    }

    static create(callback, self = this) {
        const drawing = SVG.adopt(document.getElementById('canvas'));
        // first, let's clear all other listener on drawing
        drawing.off('mousedown');
        drawing.off('mouseup');
        var circle;
        const start_draw = (e) => {
            circle = drawing.circle();
            circle.draw(e);
        }
        const end_draw = (e) => {
            circle.draw('stop', e);
            // add the circle to the list of new objects
            var cx = circle.attr('cx');
            var cy = circle.attr('cy');
            var r = circle.attr('r');
            console.log(cx,cy,r);
            // should be some sort of dispatch action here
            const new_circle = new CircleObject(cx,cy,r,'test_circle',circle);
            scene.add_graphical_object(new_circle);
            // unbind the listener
            drawing.off('mousedown', start_draw);
            drawing.off('mouseup', end_draw);
        }
        drawing.on('mousedown', start_draw, false);
        drawing.on('mouseup', end_draw, false);
    }

    edit_attr(d) {
        if (!d) return;
        this.edit_default_attr(d);
        const attr = d.attribute;
        const value = d.value;
        switch (attr) {
            case "cx":
                this.cx = value;
                this.SVG_reference
                .attr("cx", this.cx);
                return;
            case "cy":
                this.cy = value;
                this.SVG_reference
                    .attr("cy", this.cy);
                return;
            case 'r':
                this.r = value;
                this.SVG_reference.attr('r',this.r);
                break;
            default:
                break;
    }
}
    static get_blueprint(self = this) {
        return {
            type: "Circle",
            tooltips: "This is a circle",
            icon_representation: "",
            create_fn: CircleObject.create
        }
    }
}

export default CircleObject;