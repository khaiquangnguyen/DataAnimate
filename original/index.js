// create actor

// main_scene = new Scene(10000);
// bar_chart = new SimpleBarChart(500, 500);
// bar_chart.construct_svg();
// bar_chart.import_data();
// main_scene.add_actor(bar_chart);

// effect_stack = new EffectStack(bar_chart, 500, 500);
// fadein = new FadeInEffect(bar_chart, effect_stack);
// second_effect_stack = new EffectStack(bar_chart, 1500, 500)
// fadeout = new FadeOutEffect(bar_chart, second_effect_stack);
// effect_stack.add_effect(fadein);

// // second_effect_stack.add_effect(fadeout);
// bar_chart.track.add_effect_stack(effect_stack);
// // bar_chart.track.add_effect_stack(second_effect_stack);

// console.log(fadeout);
// setTimeout(() => {
//     bar_chart.track.play(500);
// }, 100);
// console.log(bar_chart.track);

// const FadeInEffect = new FadeinEffect("FadeIn", chart, 1000);
// const resize = new ResizeEffect(chart, 1000);
// setTimeout(() => {
//     // FadeInEffect.executeEffect();
//     resize.executeEffect();
// }, 500);

// bar_chart = new SimpleBarChart(500, 500);
// bar_chart.name = "SimpleBar";
// bar_chart.set_data("sales.csv");
// bar_chart.import_data();
// setTimeout(() => {
//     // console.log(bar_chart.get_parameters());
//     // bar_chart.set_x_data('salesperson')
//     // bar_chart.set_y_data('sales')
//     // bar_chart.construct_svg_container();
//     // bar_chart.construct_inner_graph();
//     // bar_chart.construct_x_axis();
//     // bar_chart.construct_y_axis();
//     // bar_chart.construct_graph();
//     // bar_chart.construct_bounding_box();

// }, 100);

// var line = drawing.line().draw();
// line.selectize().draggable().resize();


// var drawing = SVG.adopt(document.getElementById('canvas'));
// rect = drawing.rect();

// const test1 = new RectObject(100, 100, 200, 200, 'a', rect);
// const test2 = new RectObject(100, 100, 200, 200, 'a', this);
// console.log(test1.unique_id);
// console.log(test2.unique_id);

// var current_focus_object = null;


// var first_effect_stack;
// var move_effect;

//     if (event.key === "1") {
//         create_rectangle();
//     }
//     else if (event.key === "2") {
//         first_effect_stack = new EffectStack(current_focus_object, 2000, 5000);
//         move_effect = new SVG_Move(first_effect_stack);
//         move_effect.set_attributes(50, 50, 400, 400);
//         first_effect_stack.add_effect(move_effect);

//     }
//     else if (event.key === "3") {
//         console.log(first_effect_stack);
//         first_effect_stack.reachTo(3000);
//         // current_focus_object.track.play();
//     }
//     else if (event.key === "4") {
//         console.log(first_effect_stack);
//         first_effect_stack.play(3000);
//         // current_focus_object.track.play();
//     }
//     else if (event.key === "5") {
//         console.log(first_effect_stack);
//         first_effect_stack.pause();
//         // current_focus_object.track.play();
//     }
//     else if (event.key === "6") {
//         console.log(first_effect_stack);
//         first_effect_stack.resume();
//         // current_focus_object.track.play();
//     }
//     else if (event.key === "s") {
//         current_focus_object.track.pause();

//         current_focus_object.track.resume();
//     }
// });



// setTimeout(() => {
//     console.log(current_focus_object);
//     track = current_focus_object.track;
//     console.log(track);
//     const second_effect_stack = new EffectStack(current_focus_object, 4000, 5000);

//     track.add_effect_stack(second_effect_stack);
//     track.add_effect_stack(first_effect_stack);
//     track.play();
// }, 1000);




// const scene = new Scene(1000);

// document.addEventListener("keypress", function onEvent(event) {

//     if (event.key === "1") {
//         scene.import_graphical_object_blueprint();
//         // scene.create_circle();
//     }
//     else if (event.key === "2") {
//         scene.create_rectangle();
//     }
//     else if (event.key === "3") {
//         scene.set_curr_graphical_object(scene.graphical_objects[0]);
//     }
//     else if (event.key === "4") {
//         scene.set_curr_graphical_object(scene.graphical_objects[1]);
//     }
// });