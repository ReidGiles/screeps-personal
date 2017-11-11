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
            else if (creep.memory.room == "R2") {
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


            if (Game.rooms.E62S58.energyCapacityAvailable == Game.rooms.E62S58.energyAvailable) {
                /*if (creep.transfer(Game.rooms.E62S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(Game.rooms.E62S58.storage);
                 }*/
            }


        }
        else {
            var source = 0;
            if (creep.memory.room == "R1") {
                source = Game.getObjectById("57ef9e7b86f108ae6e60f5df");
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            if (creep.memory.room == "R2") {
                source = Game.getObjectById("57ef9e6886f108ae6e60f417");
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};