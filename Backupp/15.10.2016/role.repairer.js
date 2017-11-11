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
            var structure = 0;
            if (creep.memory.room == "R1") {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax
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
        }
        if (creep.memory.working == true) {
            if (creep.memory.room == "R2") {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax
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
        }
        else {
            if (creep.memory.room == "R1") {
                if (Game.rooms.E62S58.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.withdraw(Game.rooms.E62S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S58.storage);
                    }
                }
            }
            if (creep.memory.room == "R2") {
                if (Game.rooms.E61S58.storage.store[RESOURCE_ENERGY] > 0) {
                    if (creep.withdraw(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }
                }
            }
        }
    }
};