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
            if (creep.memory.room == "R1") {
                if (Game.rooms.E62S58.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.withdraw(Game.rooms.E62S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S58.storage);
                    }
                }
            }
            if (creep.memory.room == "R2") {
                if (Game.rooms.E61S58.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.withdraw(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }
                }
            }
            if (creep.memory.room == "R3") {
                if (Game.rooms.E61S59.storage.store[RESOURCE_ENERGY] > 6000) {
                    if (creep.withdraw(Game.rooms.E61S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S59.storage);
                    }
                }
            }
            if (creep.memory.room == "R4") {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                                                                            && s.store[RESOURCE_ENERGY] >= 400)
                });

                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
            }
        }
    }
};