module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath (FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
            || s.structureType == STRUCTURE_EXTENSION
            || s.structureType == STRUCTURE_TOWER)
            && s.energy < s.energyCapacity
            });

            if (Game.rooms.E52S8.energyCapacityAvailable == Game.rooms.E52S8.energyAvailable) {
                if (creep.transfer(Game.rooms.E52S8.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.rooms.E52S8.storage);
                }
            }

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
        else {
            var source = creep.pos.findClosestByPath (FIND_SOURCES, {
                filter: (c) => c.source.energy > 0
            });
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo (source);
            }
        }
    }
};