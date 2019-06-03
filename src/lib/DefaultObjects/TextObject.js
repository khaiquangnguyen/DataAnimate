
import GraphObject from './GraphObject';
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
import { editAttribute, setObject, addObject } from '../../actions/index'
import { input_types } from "../Scene";
import SVG from 'svg.js';
import WebFont from 'webfontloader';

class TextObject extends GraphObject {
    constructor(x, y, width, height, name, text, bounding_box) {
        super(x, y, width, height, 'Text', name, bounding_box);
        const drawing = SVG.adopt(document.getElementById('canvas'));
        this.data = text;
        this.text = drawing.text(text);
        this.SVG_reference.add(this.text);
        this.font_family = "Lobster";
        this.font_styling = '"size":"30","style":"normal"';
        this.apply_string_style();
        store.dispatch(addObject(this));
        store.dispatch(setObject(this));
        let self = this;
        this.bounding_box.on('dragend', (e) => {
            store.dispatch(editAttribute(this, 'x', this.bounding_box.attr('x')));
            store.dispatch(editAttribute(this, 'y', this.bounding_box.attr('y')));
            // events are still bound e.g. dragend will fire anyway
        })
        this.bounding_box.on('resizedone', (e) => {
            store.dispatch(editAttribute(this, 'x', this.bounding_box.attr('x')));
            store.dispatch(editAttribute(this, 'y', this.bounding_box.attr('y')));
            store.dispatch(editAttribute(this, 'width', this.bounding_box.attr('width')));
            store.dispatch(editAttribute(this, 'height', this.bounding_box.attr('height')));
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

    select(self = this) {
        this.bounding_box.draggable().selectize().resize();

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
            rect.attr("fill", "none");
            rect.attr("stroke", "black");
            rect.attr("stroke-width", "2");
        }
        const end_draw = (e) => {
            rect.draw('stop', e);
            // add the circle to the list of new objects
            var x = rect.x();
            var y = rect.y();
            var width = rect.attr('width');
            var height = rect.attr('height');
            // should be some sort of dispatch action here
            rect.addClass('bounding-box');
            const new_rect = new TextObject(x, y, width, height, "test_rectangle", 'dummy text', rect);
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
            case "font_styling":
                this.font_styling = value;
                this.apply_string_style();
                return;
            case "name":
                this.text.text(value);
                this.data = value;
                return;
            case "family":
                this.font_family = value;
                this.apply_string_style();
                return;

            default:
                break;
        }

        this.SVG_reference
            .attr('viewBox', `0 0 ${this.total_width} ${this.total_height}`);
    }

    apply_string_style(self = this) {
        WebFont.load({
            google: {
                families: [this.font_family]
            }
        });
        try {
            let style_dict = JSON.parse("{" + this.font_styling + "}");
            this.text.font(style_dict);
            this.text.font('family', this.font_family)
        }
        catch (error) {
            return;
        }
    }


    export_attributes(self = this) {
        const new_attr = {
            name: {
                type: input_types.STRING,
                range: "",
                tooltips: "The name of the graphical object",
                value: this.text.text()
            },
            family: {
                type: input_types.STRING,
                range: "",
                tooltips: "The name of the graphical object",
                value: this.font_family
            },
            font_style: {
                type: input_types.TEXT_AREA,
                range: "",
                tooltips: "The name of the graphical object",
                value: this.font_styling
            },
        }
        return { ...this.export_default_attributes(), ...new_attr };
    }
}
export default TextObject;

