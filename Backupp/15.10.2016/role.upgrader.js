module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            if (creep.memory.room == "R1") {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            if (creep.memory.room == "R2") {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else {
            if (creep.memory.room == "R1") {
                if (Game.rooms.E62S58.storage.store[RESOURCE_ENERGY] > 9000) {
                    if (creep.withdraw(Game.rooms.E62S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S58.storage);
                    }
                }
            }
            else if (creep.memory.room == "R2") {
                if (Game.rooms.E61S58.storage.store[RESOURCE_ENERGY] > 4000) {
                    if (creep.withdraw(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }
                }
            }
        }
    }
};