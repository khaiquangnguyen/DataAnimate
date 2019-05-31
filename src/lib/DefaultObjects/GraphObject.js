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
import * as d3 from "d3";
import { store } from '../../index';
import { editAttribute } from '../../actions/index';
import GraphicalObject from './GraphicalObject';

class GraphObject extends GraphicalObject {
    constructor(x, y, width, height, type, name, bounding_box) {
        super(x, y, width, height, type, name);
        this.svg_container = null;
        this.bounding_box = null;
        this.construct_svg_container();
        this.SVG_reference = SVG.adopt(document.getElementById(this.unique_id));
        this.bounding_box = bounding_box;
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
            self.edit_attr({attribute: 'x',value:x});
            self.edit_attr({attribute: 'y',value:y});
            self.edit_attr({attribute: 'width',value:width});
            self.edit_attr({attribute: 'height',value:height});
        });
        this.bounding_box.on('dragmove', function (event) {
            var x = self.bounding_box.attr('x');
            var y = self.bounding_box.attr('y');
            var width = self.bounding_box.attr('width');
            var height = self.bounding_box.attr('height');
            self.edit_attr({attribute: 'x',value:x});
            self.edit_attr({attribute: 'y',value:y});
            self.edit_attr({attribute: 'width',value:width});
            self.edit_attr({attribute: 'height',value:height});

        });
    }

    deselect(self = this) {
        this.bounding_box.selectize(false).draggable(false).resize(false);;
    }




}

export default GraphObject;


