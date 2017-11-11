module.exports = {
    run: function(creep) {
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTROLLER
            });

            if (structure != undefined) {
                if (creep.claimController(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                    creep.claimController(structure);
                    creep.say("Locating", true);
                }
            }
            else {
                creep.moveTo(Game.flags.ClaimFlag);
            }
        }
    }
}
;