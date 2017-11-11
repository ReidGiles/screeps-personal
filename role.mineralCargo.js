module.exports = {
    run: function(creep) {
        var total = _.sum(creep.carry);
        if (creep.memory.working == true && total == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && total == creep.carryCapacity) {
            creep.memory.working = true;
        }
        var mineralContainerR1 = "58022236a3a11f7867de5323";

        if (creep.memory.working == true) {
            var structure = 0;
            if (creep.memory.room == "R1") {
                if (creep.room.name == "E62S58") {
                    if (creep.transfer(Game.rooms.E62S58.storage, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S58.storage);
                    }
                    
                }
                else {
                    creep.moveTo(Game.spawns.Spawn1);
                }
            }
            if (creep.memory.room == "R2") {
                if (creep.room.name == "E61S58") {
                    if (creep.transfer(Game.rooms.E61S58.storage, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }
                    
                }
                else {
                    creep.moveTo(Game.spawns.Spawn2);
                }
            }
            if (creep.memory.room == "R3") {
                if (creep.room.name == "E61S59") {
                    if (creep.transfer(Game.rooms.E61S59.storage, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S59.storage);
                    }
                }
                else {
                    creep.moveTo(Game.spawns.Spawn3);
                }
            }
            if (creep.memory.room == "R4") {
                if (creep.room.name == "E62S59") {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                                                               || s.structureType == STRUCTURE_EXTENSION
                                                                                               || s.structureType == STRUCTURE_TOWER)
                                                                                               && (s.energy < s.energyCapacity
                                                                                               || s.store < s.storeCapacity)
                    });
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                    if (Game.rooms.E62S59.energyCapacityAvailable == Game.rooms.E62S59.energyAvailable) {
                        if (creep.transfer(Game.rooms.E62S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.rooms.E62S59.storage);
                        }
                    }
                }
                else {
                    creep.moveTo(Game.spawns.Spawn4);
                }
            }
            if (creep.memory.room == "haul") {
                if (creep.room.name == Game.spawns.Spawn2.room.name) {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                                                               || s.structureType == STRUCTURE_EXTENSION
                                                                                               || s.structureType == STRUCTURE_TOWER)
                                                                                               && (s.energy < s.energyCapacity
                                                                                               || s.store < s.storeCapacity)
                    });
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                    /*if (Game.rooms.E62S58.energyCapacityAvailable == Game.rooms.E62S58.energyAvailable) {
                     if (creep.transfer(Game.rooms.E62S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(Game.rooms.E62S58.storage);
                     }
                     }*/
                }
                else {
                    creep.moveTo(Game.spawns.Spawn2);
                }
            }
        }
        else {
            if (creep.memory.room == "R1") {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                                                                            && s.store[RESOURCE_LEMERGIUM] >= 200)
                });

                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
            }
            if (creep.memory.room == "R2") {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                                                                            && s.store[RESOURCE_LEMERGIUM] >= 200)
                });

                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
                else creep.moveTo(Game.flags.R2Rally);
            }
            else if (creep.memory.room == "R3") {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                                                                            && s.store[RESOURCE_HYDROGEN] >= 200)
                });

                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
                else creep.moveTo(Game.flags.R3Rally);
            }
            else if (creep.memory.room == "R4") {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                                                                            && s.store[RESOURCE_ENERGY] >= 200)
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