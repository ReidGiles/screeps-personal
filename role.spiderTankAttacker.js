module.exports = {
    run: function(creep){

        var healTarget = creep.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (r) => r.hits < r.hitsMax
        });
        var target = creep.pos.findClosestByPath (FIND_HOSTILE_CREEPS);
        if (healTarget) {
            if (creep.heal(healTarget) == ERR_NOT_IN_RANGE) {
                creep.heal(healTarget);
            }
        }
        if (target != undefined) {
            if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                //creep.say("Assaulting", true);
            }
        }
        else if (creep.room.name == "E63S58") {
            target = Game.getObjectById("57fab00f085ae8d53db25828");
            if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                //creep.say("Assaulting", true);
            }
        }
        else {
            var flag = creep.moveTo(Game.flags.HealFlag);
            creep.moveTo(flag, { filter: target == undefined });
            //creep.say("Zzz", true);
        }

    }
};