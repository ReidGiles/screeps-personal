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
            if (creep.memory.room == "R3") {
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
            if (creep.memory.room == "R4") {
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
                /*var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_CONTAINER
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
                }*/
                /*var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy);
                }*/
                if (Game.rooms.E38S9.storage.store[RESOURCE_ENERGY] > 200) {
                    if (creep.withdraw(Game.rooms.E38S9.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E38S9.storage);
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
                /*var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy);
                }*/
                if (Game.rooms.E61S58.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.withdraw(Game.rooms.E61S58.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S58.storage);
                    }
                }
                else creep.moveTo(Game.flags.R2Rally);
            }
            else if (creep.memory.room == "R3") {
                if (Game.rooms.E61S59.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.withdraw(Game.rooms.E61S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E61S59.storage);
                    }
                }
                else creep.moveTo(Game.flags.R3Rally);
            }
            else if (creep.memory.room == "R4") {
                if (Game.rooms.E62S59.storage.store[RESOURCE_ENERGY] > 100) {
                    if (creep.withdraw(Game.rooms.E62S59.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms.E62S59.storage);
                    }
                }
            } 
        }
    }
};