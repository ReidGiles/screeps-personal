module.exports = {
    run: function(creep){
        if (creep.memory.working == true) {
            var target = creep.pos.findClosestByPath (FIND_MY_CREEPS, { filter: (h) => h.hits < h.hitsMax
            });
            if (target != undefined) {
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say("Healing", true);
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