

var global_current_time = 0;


class EffectStack {
    constructor(actor, start_time = 0, duration = 500) {
        this.actor = actor;
        this.duration = duration;
        this.track = this.actor.track;
        this.start_time = start_time;
        this.effects = [];
        this.enabled = true;
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

    stop(self = this) {
        self.effects.forEach(effect => {
            effect.stop();
        });
    }

    reachTo(play_time, self = this) {
        self.effects.forEach(effect => {
            if (self.start_time <= play_time <= self.start_time + self.duration) {
                effect.reachTo(play_time - self.start_time);
            }
        });
    }

    export_state(self = this) {
        return {
            duration: this.duration,
            start_time: this.start_time,
            enabled: this.enabled,
            effects: (() => {
                var effects = [];
                self.effects.forEach(effect => {
                    effects.push(effect.export_state());
                });
                return effects;
            })()
        }
    }
}

export default EffectStack;