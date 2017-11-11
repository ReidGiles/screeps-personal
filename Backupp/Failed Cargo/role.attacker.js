module.exports = {
    run: function(creep){
        if (creep.memory.working == true) {

            var target = creep.pos.findClosestByPath (FIND_HOSTILE_CREEPS);
            if (target != undefined) {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say("Defending", true);
                }
            }
            else if (creep.attack(target) == ERR_NOT_FOUND) {
                var target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: (s) => s.structureType != STRUCTURE_CONTROLLER });
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say("Defending", true);
                }
            }
            else {
                var flag = creep.moveTo(Game.flags.S2Rally);
                creep.moveTo(flag, { filter: target == undefined });
                //creep.say("Zzz", true);
            }
        }
    }
};