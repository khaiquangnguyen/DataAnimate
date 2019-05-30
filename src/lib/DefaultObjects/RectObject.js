import GraphicalObject from './GraphicalObject';
import SVG from 'svg.js';
import { scene, input_types } from "../Scene";
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
class RectObject extends GraphicalObject {
    constructor(x, y, width, height, name, rect) {
        super(x, y, width, height, name);
        this.type = "Rectangle";
        this.opacity = 0.1;
        this.SVG_reference = rect;
        this.SVG_reference.attr("id", this.unique_id);
        this.set_on_click();
    }

    select(self = this) {
        this.SVG_reference.draggable().selectize().resize();
        this.SVG_reference.on('dragend', (e) => {
            store.dispatch(editAttribute('x', this.SVG_reference.attr('x')));
            store.dispatch(editAttribute('y', this.SVG_reference.attr('y')));
            // events are still bound e.g. dragend will fire anyway
        })
        this.SVG_reference.on('resizedone', (e) => {
            store.dispatch(editAttribute('x', this.SVG_reference.attr('x')));
            store.dispatch(editAttribute('y', this.SVG_reference.attr('y')));
            store.dispatch(editAttribute('width', this.SVG_reference.attr('width')));
            store.dispatch(editAttribute('height', this.SVG_reference.attr('height')));
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
            const new_rect = new RectObject(x, y, width, height, "test_rectangle", rect);
            scene.add_graphical_object(new_rect);
            // unbind the listener
            drawing.off('mousedown', start_draw);
            drawing.off('mouseup', end_draw);
        }
        drawing.on('mousedown', start_draw, false);
        drawing.on('mouseup', end_draw, false);
    }

    static get_blueprint(self = this) {
        return {
            type: "Rectangle",
            tooltips: "This is a rectangle",
            icon_representation: "",
            create_fn: RectObject.create
        }
    }

}

export default RectObject;







