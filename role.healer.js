module.exports = {
    run: function(creep){
        if (creep.memory.working == true) {
            var target = creep.pos.findClosestByPath (FIND_MY_CREEPS, { filter: (h) => h.hits < h.hitsMax
            });
        }
            if (target != undefined) {
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say("Healing", true);
                }
            }
            else if (creep.room.name == "E63S58") {
                var follow = creep.pos.findClosestByPath (FIND_MY_CREEPS);
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                //creep.say("Zzz", true);
                }
            }
            else {
                creep.moveTo(Game.flags.RampartAssault)
            }
    }
};