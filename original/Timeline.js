

var global_current_time = 0;

class Track {
    constructor(actor) {
        this.actor = actor;
        this.effect_stacks = [];
        this.duration = 0;
    }

    add_effect_stack(effect_stack, self = this) {
        self.effect_stacks.push(effect_stack);
        self.effect_stacks = self.effect_stacks.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1);

    }
    remove_effect_stack(remove_stack, self = this) {
        for (var i = 0; i < self.effect_stacks.length; i++) {
            if (self.effect_stacks[i] === remove_stack) {
                arr.splice(i, 1);
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

    reachTo(play_time, self = this) {
        self.effect_stacks.forEach(effect_stack => {
            effect_stack.reachTo(play_time);
        });
    }
}

class EffectStack {
    constructor(actor, start_time = 0, duration = 500) {
        this.actor = actor;
        this.duration = duration;
        this.track = this.actor.track;
        this.start_time = start_time;
        this.effects = [];
        this.enable = true;
    }

    set_duration(duration, self = this) {
        self.duration = duration;
    }

    set_start_time(start_time, self = this) {
        self.start_time = start_time;
    }

    add_effect(effect, self = this) {
        effect.set_duration(self.duration);
        effect.set_effect_stack(this);
        effect.set_actor(self.actor);
        self.effects.push(effect);
    }

    remove_effect(effect, self = this) {
        for (var i = 0; i < self.effects.length; i++) {
            if (self.effects[i] === effect) {
                self.effects.splice(i, 1);
            }
        }
    }

    enable_effect(effect, self = this) {
        effect.enable();
    }

    disable_effect(effect, self = this) {
        effect.disable();
    }

    enable(self = this) {
        self.enable = true;
    }
    disable(self = this) {
        self.enable = false;
    }

    play(play_time = 0, self = this) {
        self.effects.forEach(effect => {
            if (play_time < self.start_time + self.duration) {
                if (self.start_time >= play_time) {
                    setTimeout(() => {
                        effect.play();
                    }, self.start_time - play_time);
                }
                else {
                    effect.play(play_time - self.start_time);

                }
            }
        });
    }

    pause(self = this) {
        self.effects.forEach(effect => {
            effect.pause();
        });
    }

    resume(self = this) {
        self.effects.forEach(effect => {
            effect.resume();
        });
    }

    reachTo(play_time, self = this) {
        self.effects.forEach(effect => {
            if (self.start_time <= play_time <= self.start_time + self.duration) {
                effect.reachTo(play_time - self.start_time);
            }
        });
    }
}

