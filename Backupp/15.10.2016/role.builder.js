var roleUpgrader = require("role.upgrader");

module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
           creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        var constructionSite = 0;
        if (creep.memory.working == true) {
            if (creep.memory.room == "R1") {
                constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (constructionSite != undefined) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite);

                    }
                }
                else {
                    roleUpgrader.run(creep);
                }
            }
            if (creep.memory.room == "R2") {
                constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (constructionSite != undefined) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite);

                    }
                }
                else {
                    roleUpgrader.run(creep);
                }
            }
        }
        else {
            if (creep.memory.room == "R1") {
                if (Game.rooms.E62S58.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.withdraw(Game.rooms.E62S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S58.storage);
                    }
                }
                /*source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (source) => source.energy > 0
                });
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }*/
            }
            else if (creep.memory.room == "R2") {
                if (Game.rooms.E61S58.storage.store[RESOURCE_ENERGY] > 5000) {
                    if (creep.withdraw(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }
                }
            }
        }
    }
};