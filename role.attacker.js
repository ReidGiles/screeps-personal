module.exports = {
    run: function(creep){
        if (creep.memory.working == true) {
            var target = creep.pos.findClosestByPath (FIND_HOSTILE_CREEPS, { filter: (t) => t.owner.username == "ethanol"
            });
            if (creep.hits < 2000) {
                creep.moveTo(Game.flags.Staging)
            }
            if (creep.room.name == "E63S58") {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType != STRUCTURE_CONTROLLER
                });
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say("Assaulting", true);
                }
            }
            else if (creep.hits == creep.hitsMax) {
                var flag = creep.moveTo(Game.flags.Staging);
                creep.moveTo(flag, { filter: target == undefined });
                //creep.say("Zzz", true);
            }
        }
    }
};