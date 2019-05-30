
class Track {
    constructor(actor) {
        this.actor = actor;
        this.effect_stacks = [];
        this.duration = 0;
    }

    add_effectstack(effect_stack, self = this) {
        self.effect_stacks.push(effect_stack);
        self.effect_stacks = self.effect_stacks.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1);

    }
    remove_effect_stack(remove_stack, self = this) {
        for (let i = 0; i < self.effect_stacks.length; i++) {
            if (self.effect_stacks[i] === remove_stack) {
                self.effect_stacks.splice(i, 1);
            }
        }
    }

    set_duration(duration, self = this) {
        self.duration = duration;
    }

    play(play_time = 0, self = this) {
        console.log("playing");

        self.effect_stacks.forEach(effect_stack => {
            effect_stack.play(play_time);
        });
    }

    pause(self = this) {
        self.effect_stacks.forEach(effect_stack => {
            effect_stack.pause();
        });
    }

    resume(self = this) {
        self.effect_stacks.forEach(effect_stack => {
            effect_stack.resume();
        });
    }

    stop(self = this) {
        self.effect_stacks.forEach(effect_stack => {
            effect_stack.stop();
        });
    }

    reachTo(play_time, self = this) {
        self.effect_stacks.forEach(effect_stack => {
            effect_stack.reachTo(play_time);
        });
    }

    edit_duration(duration) {
        this.duration = duration;
    }

    export_state(self = this) {
        return {
            duration: this.duration,
            effect_stacks: (() => {
                var effect_stacks = [];
                self.effect_stacks.forEach(stack => {
                    self.effect_stacks.push(stack.export_state());
                });
                return effect_stacks;
            })()
        }
    }
}

export default Track;