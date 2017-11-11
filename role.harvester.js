var roleUpgrader = require("role.upgrader");

module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                 creep.memory.working = true;
        }
        var structure = 0;
        if (creep.memory.working == true) {
            if (creep.memory.room == "R1") {
                //creep.drop(RESOURCE_ENERGY);
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                                                        //|| s.structureType == STRUCTURE_LINK
                                                                                        || s.structureType == STRUCTURE_EXTENSION
                                                                                        || s.structureType == STRUCTURE_CONTAINER
                                                                                        || s.structureType == STRUCTURE_TOWER)
                });
                if ( structure != undefined ) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }

                var source = 0;
                if (creep.memory.room == "R1") {
                    source = Game.getObjectById("59f1a59882100e1594f3ec44");
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }

            }
            else if (creep.memory.room == "R2") {
                //creep.drop(RESOURCE_ENERGY);
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                                                                        || s.structureType == STRUCTURE_LINK
                                                                                        || s.structureType == STRUCTURE_EXTENSION
                                                                                        || s.structureType == STRUCTURE_CONTAINER
                                                                                        || s.structureType == STRUCTURE_TOWER)
                });
                if ( structure != undefined ) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
            }
            else if (creep.memory.room == "R3") {
                if (creep.room.name == "E61S59") {
                    creep.drop(RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(Game.spawns.Spawn3);
                }
            }
            else if (creep.memory.room == "R4") {
                //creep.drop(RESOURCE_ENERGY);
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER
                });
                if ( structure != undefined ) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
            }
        }
        else {
            var source = 0;
            if (creep.memory.room == "R1") {
                source = Game.getObjectById("59f1a59882100e1594f3ec44");
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            if (creep.memory.room == "R2") {
                source = Game.getObjectById("57ef9e6886f108ae6e60f419");
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            if (creep.memory.room == "R3") {
                source = Game.getObjectById("57ef9e6886f108ae6e60f41c");
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            if (creep.memory.room == "R4") {
                source = Game.getObjectById("57ef9e7b86f108ae6e60f5e2");
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};