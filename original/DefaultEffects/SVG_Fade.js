
// class FadeOutEffect extends AnimationEffect {
//     constructor(actor) {
//         super("Fade Out", actor, 'svg_container', false);
//     }

//     execute_halfway(self = this, time_left) {
//         const targetable_components = self.get_targetable_components();
//         const target_component_selector = targetable_components[self.target_component];
//         target_component_selector._groups[0].forEach(e => {
//             const effect_dummy = {};
//             d3.select(effect_dummy).transition()
//                 .duration(time_left)
//                 .tween("attr:opacity", function () {
//                     const element = d3.select(e);
//                     var i_scale = d3.interpolateNumber(time_left / self.duration, 0);
//                     return function (t) {
//                         element.attr("transform", i_scale(t));
//                     }
//                 });
//         });
//     }

//     execute(self = this) {
//         const targetable_components = self.get_targetable_components();
//         const target_component_selector = targetable_components[self.target_component];
//         console.log(target_component_selector);
//         target_component_selector._groups[0].forEach(e => {
//             const effect_dummy = {};
//             d3.select(effect_dummy).transition()
//                 .duration(self.duration)
//                 .tween("attr:opacity", function () {
//                     const element = d3.select(e);
//                     var i = d3.interpolateNumber(1, 0);
//                     return function (t) {
//                         element.attr("opacity", i(t));
//                     }
//                 });
//         });
//     }
// }


// class FadeInEffect extends AnimationEffect {
//     constructor(actor) {
//         super("Fade In", actor, 'bars', false);
//     }

//     execute(self = this) {
//         const targetable_components = self.get_targetable_components();
//         const target_component_selector = targetable_components[self.target_component];
//         console.log(target_component_selector);
//         target_component_selector._groups[0].forEach(e => {
//             const effect_dummy = {};
//             d3.select(effect_dummy).transition()
//                 .duration(self.duration)
//                 .tween("attr:opacity", function () {
//                     const element = d3.select(e);
//                     var i = d3.interpolateNumber(0, 1);
//                     return function (t) {
//                         element.attr("opacity", i(t));
//                     }
//                 });
//         });
//     }
// }
