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

bar_chart = new SimpleBarChart(500, 500);
bar_chart.name = "SimpleBar";
bar_chart.set_data("sales.csv");
bar_chart.import_data();
setTimeout(() => {
    console.log(bar_chart.get_parameters());
    console.log(bar_chart);
    bar_chart.set_x_data('salesperson')
    bar_chart.set_y_data('sales')
    bar_chart.construct_svg_container();
    bar_chart.construct_inner_graph();
    bar_chart.construct_x_axis();
    bar_chart.construct_y_axis();
    bar_chart.construct_graph();

}, 100);

