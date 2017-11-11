module.exports = {
    run: function(creep){
        if (creep.memory.working == true) {
            var target = creep.pos.findClosestByPath (FIND_HOSTILE_CREEPS, { filter: (t) => t.owner.username == "ethanol"
            });
            if (target != undefined) {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say("Assaulting", true);
                }
            }
            else if (creep.room.name == "E63S58") {
                target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: (s) => s.structureType != STRUCTURE_CONTROLLER
                && s.owner.username == "ethanol"
                });
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say("Assaulting", true);
                }
            }
            else {
                var flag = creep.moveTo(Game.flags.AssaultFlag);
                creep.moveTo(flag, { filter: target == undefined });
                //creep.say("Zzz", true);
            }
        }
    }
};