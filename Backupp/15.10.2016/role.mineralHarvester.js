module.exports = {
    run: function(creep){
        var total = _.sum(creep.carry);
        if (creep.memory.working == true && total == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && total == creep.carryCapacity) {
            creep.memory.working = true;
        }
        var structure = 0;
        if (creep.memory.working == true) {
            if (creep.memory.room == "R1") {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER
                });
                if ( structure != undefined ) {
                    if (creep.transfer(structure, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
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
        }
        else {
            var source = 0;
            if (creep.memory.room == "R1") {
                source = Game.getObjectById("57efa11b08bd77920836f0a1");
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            if (creep.memory.room == "R2") {
                source = Game.getObjectById("57efa0c2b8c6899106eaee4f");
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};