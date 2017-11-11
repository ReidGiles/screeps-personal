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
            if (creep.memory.room == "R2") {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax
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
            if (creep.memory.room == "R3") {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax
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
            if (creep.memory.room == "R4") {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax
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
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                                                                            && s.store[RESOURCE_ENERGY] >= 400)
                                                                                            || (s.structureType == STRUCTURE_CONTAINER
                                                                                            && s.store[RESOURCE_LEMERGIUM] > 4000)
                                                                                            || (s.structureType == STRUCTURE_LINK
                                                                                            && s.energy > 0
                                                                                            && s.id == "58021c880a6a814c35a31519")
                });

                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
                /*if (Game.rooms.E38S9.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.withdraw(Game.rooms.E38S9.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E38S9.storage);
                    }
                }*/
            }
            if (creep.memory.room == "R2") {
                if (Game.rooms.E61S58.storage.store[RESOURCE_ENERGY] > 0) {
                    if (creep.withdraw(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }
                }
            }
            else if (creep.memory.room == "R3") {
                if (Game.rooms.E61S58.storage.store[RESOURCE_ENERGY] > 0) {
                    if (creep.withdraw(Game.rooms.E61S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S59.storage);
                    }
                }
            }
            else if (creep.memory.room == "R4") {
                if (Game.rooms.E62S59.storage.store[RESOURCE_ENERGY] > 1000) {
                    if (creep.withdraw(Game.rooms.E62S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S59.storage);
                    }
                }
            }
        }
    }
};