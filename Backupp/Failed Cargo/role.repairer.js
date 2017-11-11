var roleBuilder = require("role.builder");

module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
           creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
    
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax
                                                                                       && s.structureType != STRUCTURE_WALL
                                                                                       && s.structureType != STRUCTURE_RAMPART
            });
            
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
        else {
            var source = creep.pos.findClosestByPath (FIND_STRUCTURES, { filter: (source) => source.structureType == STRUCTURE_CONTAINER
            && source.store[RESOURCE_ENERGY] > 200
            });
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo (source);
            }
        }
    }
};