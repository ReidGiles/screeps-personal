module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy >= 192) {
            creep.memory.working = true;
        }
        var structure = 0;
        if (creep.memory.working == true) {
            if (creep.memory.room == "R1") {
                creep.drop(RESOURCE_ENERGY)
                /*structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_LINK
                });
                if ( structure != undefined ) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }*/
            }
            else if (creep.memory.room == "R2") {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_LINK
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
                source = Game.getObjectById("59f1a59882100e1594f3ec43");
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