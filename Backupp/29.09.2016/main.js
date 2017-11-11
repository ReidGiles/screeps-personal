require("prototype.spawn")();
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer")
var roleWallRepairer = require("role.wallRepairer")
var creepCount = 0;

module.exports.loop = function () {
    // clear memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    
    
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (creep.memory.role == "harvester") {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == "upgrader") {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == "builder") {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == "repairer") {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == "wallRepairer") {
            roleWallRepairer.run(creep);
        }

    }

    var towers = Game.rooms.E52S8.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }

    var minimumNumberOfHarvesters = 3;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 1;
    var minimumNumberOfWallRepairers = 1;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester" );
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader" );
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder" );
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == "repairer" );
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == "wallRepairer" );

    var name = undefined;
    
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'harvester', working: false});
        
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined,
                { role: 'harvester', working: false});
        }
        
    }
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    }
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'repairer', working: false});
    }
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'builder', working: false});
    }
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'wallRepairer', working: false});
    }

    else {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'builder', working: false});
    }
    
    if (!(name < 0)) {
        console.log("Spawned new " + Game.creeps[name].memory.role + " creep: " + name);
    }
    if (creepCount) {
        console.log("Harvesters: " + numberOfHarvesters);
        console.log("Upgraders: " + numberOfUpgraders);
        console.log("Repairers: " + numberOfRepairers);
        console.log("Builders: " + numberOfBuilders);
        console.log("Wall Repairers: " + numberOfWallRepairers);
    }
};