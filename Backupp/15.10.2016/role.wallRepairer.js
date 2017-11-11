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
            var walls = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_WALL
                                                                       || s.structureType == STRUCTURE_RAMPART
            });

            var target = undefined;

            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001 ) {
                target = creep.pos.findClosestByPath(walls, { filter: (w) => w.hits / w.hitsMax < percentage
                });

                if (target != undefined) {
                    break;
                }
            }

            if (target != undefined) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(target);
                }
            }

            else {
                roleBuilder.run(creep);
            }
        }
        else {
            var source = 0;
            if (creep.memory.room == "R1") {
                if (Game.rooms.E62S58.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.withdraw(Game.rooms.E62S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S58.storage);
                    }
                }
            }
            if (creep.memory.room == "R2") {
                var dropEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, { filter: (d) => d.resourceType == RESOURCE_ENERGY
                });
                if (dropEnergy) {
                    if (creep.pickup(dropEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropEnergy);
                    }
                }
                else {
                    source = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (source) => source.energy > 0
                    });
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        }
    }
};