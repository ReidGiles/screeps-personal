module.exports = {
    run: function(creep) {
        var linkMainR1 = Game.getObjectById("58021c880a6a814c35a31519");
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var structure = 0;
            if (creep.memory.room == "R1") {
                if (Game.rooms.E38S9.energyCapacityAvailable != Game.rooms.E38S9.energyAvailable) {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                                                           || s.structureType == STRUCTURE_EXTENSION)
                                                                                           //|| s.structureType == STRUCTURE_TOWER)
                                                                                           && (s.energy < s.energyCapacity)
                                                                                           //|| s.store < s.storeCapacity)
                });
                }
                if (Game.rooms.E38S9.energyCapacityAvailable == Game.rooms.E38S9.energyAvailable) {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER
                                                                                           && (s.energy < s.energyCapacity)
                                                                                           //|| s.store < s.storeCapacity)
                });
                }
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }

                /*if (Game.rooms.E38S9.energyCapacityAvailable == Game.rooms.E38S9.energyAvailable) {
                    if (creep.transfer(Game.rooms.E38S9.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E38S9.storage);
                    }
                }*/
            }
            if (creep.memory.room == "R2") {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                                                           || s.structureType == STRUCTURE_EXTENSION
                                                                                           || s.structureType == STRUCTURE_TOWER)
                                                                                           && (s.energy < s.energyCapacity
                                                                                           || s.store < s.storeCapacity)
                });
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
                /*if (Game.rooms.E61S58.energyCapacityAvailable == Game.rooms.E61S58.energyAvailable) {
                    if (creep.transfer(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }
                }*/
            }
            if (creep.memory.room == "R3") {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                                                           || s.structureType == STRUCTURE_EXTENSION
                                                                                           || s.structureType == STRUCTURE_TOWER)
                                                                                          && (s.energy < s.energyCapacity
                                                                                           || s.store < s.storeCapacity)
                });
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
                /*if (Game.rooms.E61S58.energyCapacityAvailable == Game.rooms.E61S58.energyAvailable) {
                 if (creep.transfer(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(Game.rooms.E61S58.storage);
                 }
                 }*/
            }
            if (creep.memory.room == "R4") {
                if (Game.rooms.E62S59.energyCapacityAvailable != Game.rooms.E62S59.energyAvailable) {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                                                           || s.structureType == STRUCTURE_EXTENSION)
                                                                                           //|| s.structureType == STRUCTURE_TOWER)
                                                                                           && (s.energy < s.energyCapacity)
                                                                                           //|| s.store < s.storeCapacity)
                });
                }
                if (Game.rooms.E62S59.energyCapacityAvailable == Game.rooms.E62S59.energyAvailable) {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER
                                                                                           && (s.energy < s.energyCapacity)
                                                                                           //|| s.store < s.storeCapacity)
                });
                }
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }

                /*if (Game.rooms.E62S59.energyCapacityAvailable == Game.rooms.E62S59.energyAvailable) {
                    if (creep.transfer(Game.rooms.E62S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S59.storage);
                    }
                }*/
            }
        }
        else {
            if (creep.memory.room == "R1") {
                //if (Game.rooms.E38S9.energyCapacityAvailable > Game.rooms.E38S9.energyAvailable)
                    if (creep.withdraw(Game.rooms.E38S9.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E38S9.storage);
                    }

            }
            if (creep.memory.room == "R2") {
                //if (Game.rooms.E61S58.energyCapacityAvailable > Game.rooms.E61S58.energyAvailable)
                    if (creep.withdraw(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }

            }
            if (creep.memory.room == "R3") {
                //if (Game.rooms.E61S58.energyCapacityAvailable > Game.rooms.E61S58.energyAvailable)
                if (creep.withdraw(Game.rooms.E61S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.rooms.E61S59.storage);
                }

            }
            if (creep.memory.room == "R4") {
                //if (Game.rooms.E62S59.energyCapacityAvailable > Game.rooms.E62S59.energyAvailable)
                if (creep.withdraw(Game.rooms.E62S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.rooms.E62S59.storage);
                }

            }
        }
    }
};