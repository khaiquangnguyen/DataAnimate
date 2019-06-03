

class EffectStack {
    constructor(actor, start_time = 0, duration = 500) {
        this.actor = actor;
        this.duration = duration;
        this.track = this.actor.track;
        this.start_time = start_time;
        this.effects = [];
        this.enabled = true;
        this.scheduled = [];
    }

    set_duration(duration, self = this) {
        if (parseFloat(duration) + parseFloat(self.start_time) > this.track.duration) {
            return;
        }
        self.duration = duration;
        self.effects.forEach(effect => {
            effect.duration = self.duration;
        });
    }

    set_start_time(start_time, self = this) {
        self.start_time = start_time;
        self.effects.forEach(effect => {
            effect.start_time = self.start_time;
        });
    }

    add_effect(effect_bp, self = this) {
        const new_effect = effect_bp.create_fn(this);
        self.effects.push(new_effect);
        console.log(new_effect);
        return new_effect;
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
        if (self.start_time !== 0) self.actor.SVG_reference.hide();
        let schedule = setTimeout(() => {
            self.actor.SVG_reference.show();
        }, self.start_time);
        self.scheduled.push(schedule);

        schedule = setTimeout(() => {
            self.actor.SVG_reference.hide();
        }, self.start_time + self.duration);
        self.scheduled.push(schedule);

        self.effects.forEach(effect => {
            if (play_time < self.start_time + self.duration) {
                if (self.start_time >= play_time) {
                    let schedule = setTimeout(() => {
                        effect.play();
                    }, self.start_time - play_time);
                    self.scheduled.push(schedule);
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
        self.actor.SVG_reference.show();
        self.effects.forEach(effect => {
            effect.stop();
        });
        self.scheduled.forEach(schedule => {
            clearTimeout(schedule);;
        });
        self.scheduled = [];
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
            reference_object: this,
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
