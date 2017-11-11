module.exports = {
    run: function(creep){
        if (creep.memory.working == true) {
            var target = creep.pos.findClosestByPath (FIND_HOSTILE_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER
            });

            if (target != undefined) {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};