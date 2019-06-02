
import GraphObject from './GraphObject';
import { scene } from "../Scene";
import '../SVG_plugins/svg.draggable';
import '../SVG_plugins/svg.draw';
import '../SVG_plugins/circle';
import '../SVG_plugins/ellipse';
import '../SVG_plugins/lineable';
import '../SVG_plugins/rectable';
import '../SVG_plugins/svg.resize';
import '../SVG_plugins/svg.select';
import * as d3 from "d3";
import { store } from '../../index';
import { editAttribute, setObject } from '../../actions/index'
import { input_types } from "../Scene";
import SVG from 'svg.js';

class TextObject extends GraphObject {
    constructor(x, y, width, height, name, text, bounding_box) {
        super(x, y, width, height, 'Text', name, bounding_box);
        const drawing = SVG.adopt(document.getElementById('canvas'));
        console.log(text);
        this.data = text;
        this.text = drawing.text(text);
        this.SVG_reference.add(this.text);
        store.dispatch(setObject(this));

    }

    select(self = this) {
        this.bounding_box.draggable().selectize().resize();
        this.bounding_box.on('dragend', (e) => {
            store.dispatch(editAttribute('x', this.bounding_box.attr('x')));
            store.dispatch(editAttribute('y', this.bounding_box.attr('y')));
            // events are still bound e.g. dragend will fire anyway
        })
        this.bounding_box.on('resizedone', (e) => {
            store.dispatch(editAttribute('x', this.bounding_box.attr('x')));
            store.dispatch(editAttribute('y', this.bounding_box.attr('y')));
            store.dispatch(editAttribute('width', this.bounding_box.attr('width')));
            store.dispatch(editAttribute('height', this.bounding_box.attr('height')));
        })

        this.bounding_box.on('resizing', function (event) {
            var x = self.bounding_box.attr('x');
            var y = self.bounding_box.attr('y');
            var width = self.bounding_box.attr('width');
            var height = self.bounding_box.attr('height');
            self.edit_attr({ attribute: 'x', value: x });
            self.edit_attr({ attribute: 'y', value: y });
            self.edit_attr({ attribute: 'width', value: width });
            self.edit_attr({ attribute: 'height', value: height });
        });
        this.bounding_box.on('dragmove', function (event) {
            var x = self.bounding_box.attr('x');
            var y = self.bounding_box.attr('y');
            var width = self.bounding_box.attr('width');
            var height = self.bounding_box.attr('height');
            self.edit_attr({ attribute: 'x', value: x });
            self.edit_attr({ attribute: 'y', value: y });
            self.edit_attr({ attribute: 'width', value: width });
            self.edit_attr({ attribute: 'height', value: height });

        });
    }

    deselect(self = this) {
        this.bounding_box.selectize(false).draggable(false).resize(false);;
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
            rect.attr('fill', 'red');
            const new_rect = new TextObject(x, y, width, height, "test_rectangle", 'dummy text', rect);
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
            type: "Text",
            tooltips: "This is a Text box",
            icon_representation: "fa-font",
            create_fn: TextObject.create
        }
    }

    edit_attr(d) {
        if (!d) return;
        this.edit_default_attr(d);
        const attr = d.attribute;
        const value = d.value;
        switch (attr) {
            case "text":

                this.text.text(value);
                this.data = value;
                return;
            default:
                break;
        }

        this.SVG_reference
            .attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`);
    }

    export_attributes(self = this) {
        console.log(this);
        return {
            text: {
                type: input_types.STRING,
                range: "",
                tooltips: "The name of the graphical object",
                value: this.text.text()
            },
            name: {
                type: "",
                range: "",
                tooltips: "The name of the graphical object",
                value: this.text.text()
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
            linked_object: {
                type: undefined,
                range: undefined,
                value: this
            },
            show: {
                type: input_types.BOOLEAN,
                range: [true, false],
                value: this.show
            }
        }
    }
}
export default TextObject;

