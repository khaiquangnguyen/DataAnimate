class Scene {
    constructor(duration) {
        this.duration = duration;
        this.actors = {};
    }

    add_actor(actor, self = this) {
        this.actors.push(actor);
    }
    remove_actor(actor, self = this) {
        for (var i = 0; i < self.actors.length; i++) {
            if (self.actors[i] === actor) {
                arr.splice(i, 1);
            }
        }
    }
    generate_id(self=this){
        return this.actors.length;
    }

    add_object(type, self=this) {
        this.actors.push(type);
    }

    export_state(self=this) {
        return { scene: this, currentSomething: this.actors }
    }
}