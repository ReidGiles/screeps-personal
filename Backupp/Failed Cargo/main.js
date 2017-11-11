require("prototype.spawn")();
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer")
var roleWallRepairer = require("role.wallRepairer")
var roleAttacker = require("role.attacker");
var roleClaimer = require("role.claimer");
var roleConvoy = require("role.convoy");
var roleCargo = require("role.cargo");
var roleSurplusUpgrader = require("role.SurplusUpgrader");
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
        else if (creep.memory.role == "attacker") {
            roleAttacker.run(creep);
        }
        else if (creep.memory.role == "claimer") {
            roleClaimer.run(creep);
        }
        else if (creep.memory.role == "convoy") {
            roleConvoy.run(creep);
        }
        else if (creep.memory.role == "cargo") {
            roleCargo.run(creep);
        }
        else if (creep.memory.role == "surplusUpgrader") {
            roleSurplusUpgrader.run(creep);
        }
    }

    var towers = Game.rooms.E62S58.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
        else {
            target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (r) => r.structureType == STRUCTURE_RAMPART
                && r.hits < 50000
            });
            tower.repair(target);
        }
    }

    var minimumNumberOfHarvesters = 0;
    var minimumNumberOfUpgraders = 0;
    var minimumNumberOfBuilders = 0;
    var minimumNumberOfRepairers = 0;
    var minimumNumberOfWallRepairers = 0;
    var minimumNumberOfAttackers = 0;
    var minimumNumberOfCargo = 3;
    var minimumNumberOfSurplusUpgraders = 0;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => (c.memory.role == "harvester" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfUpgraders = _.sum(Game.creeps, (c) => (c.memory.role == "upgrader" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfBuilders = _.sum(Game.creeps, (c) => (c.memory.role == "builder" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfRepairers = _.sum(Game.creeps, (c) => (c.memory.role == "repairer" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => (c.memory.role == "wallRepairer" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfAttackers = _.sum(Game.creeps, (c) => (c.memory.role == "attacker" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfCargo = _.sum(Game.creeps, (c) => (c.memory.role == "cargo" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfSurplusUpgraders = _.sum(Game.creeps, (c) => (c.memory.role == "surplusUpgrader" && c.room.name == Game.spawns.Spawn1.room.name) );

    var name = undefined;

    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,MOVE,MOVE,CARRY], undefined,
            { role: 'harvester', working: false});

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
                { role: 'harvester', working: false});
        }

    }
    else if ( (numberOfUpgraders < minimumNumberOfUpgraders) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    }
    else if ( (numberOfRepairers < minimumNumberOfRepairers) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'repairer', working: false});
    }
    else if ( (numberOfBuilders < minimumNumberOfBuilders) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'builder', working: false});
    }
    else if ( (numberOfWallRepairers < minimumNumberOfWallRepairers) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'wallRepairer', working: false});
    }
    else if ( (numberOfCargo < minimumNumberOfCargo) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'cargo', working: false});
    }
    else if ( (numberOfSurplusUpgraders < minimumNumberOfSurplusUpgraders) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'surplusUpgrader', working: false});
    }
    else if ( (numberOfAttackers < minimumNumberOfAttackers) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([MOVE,MOVE,ATTACK,ATTACK], undefined,
            { role: 'attacker', working: true});
    }

    else {
        //name = Game.spawns.Spawn1.createCreep([MOVE,RANGED_ATTACK], undefined,
        //{ role: 'attacker', working: true});
        name = -1;
    }

    if (!(name < 0)) {
        console.log("R1: Spawned new " + Game.creeps[name].memory.role + " creep: " + name);
    }

    var minimumNumberOfHarvestersS2 = 2;
    var minimumNumberOfUpgradersS2 = 1;
    var minimumNumberOfBuildersS2 = 2;
    var minimumNumberOfRepairersS2 = 0;
    var minimumNumberOfWallRepairersS2 = 0;
    var minimumNumberOfAttackersS2 = 0;
    var numberOfHarvestersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "harvester" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfUpgradersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "upgrader" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfBuildersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "builder" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfRepairersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "repairer" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfWallRepairersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "wallRepairer" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfAttackersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "attacker" && c.room.name == Game.spawns.Spawn2.room.name) );



    if (numberOfHarvestersS2 < minimumNumberOfHarvestersS2) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false});

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvestersS2 == 0) {
            name = Game.spawns.Spawn2.createCreep([WORK,CARRY,MOVE], undefined,
                { role: 'harvester', working: false});
        }

    }
    else if (numberOfUpgradersS2 < minimumNumberOfUpgradersS2) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'upgrader', working: false});
    }
    else if ( (numberOfRepairersS2 < minimumNumberOfRepairersS2) && (numberOfHarvestersS2 == minimumNumberOfHarvestersS2) ) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'repairer', working: false});
    }
    else if (numberOfBuildersS2 < minimumNumberOfBuildersS2) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'builder', working: false});
    }
    else if ( (numberOfWallRepairersS2 < minimumNumberOfWallRepairersS2) && (numberOfHarvestersS2 == minimumNumberOfHarvestersS2) ) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'wallRepairer', working: false});
    }
    else if ( (numberOfAttackersS2 < minimumNumberOfAttackersS2) && (numberOfHarvestersS2 == minimumNumberOfHarvestersS2) ) {
        name = Game.spawns.Spawn2.createCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK], undefined,
            { role: 'attacker', working: true});
    }

    else {
        name = Game.spawns.Spawn2.createCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK], undefined,
        { role: 'attacker', working: true});
        //name = -1;
    }

    if (!(name < 0)) {
        console.log("R2: Spawned new " + Game.creeps[name].memory.role + " creep: " + name);
    }
    if (creepCount) {
        console.log("Harvesters: " + numberOfHarvesters);
        console.log("Upgraders: " + numberOfUpgraders);
        console.log("Repairers: " + numberOfRepairers);
        console.log("Builders: " + numberOfBuilders);
        console.log("Wall Repairers: " + numberOfWallRepairers);
        console.log("R1: Energy Available: " + Game.rooms.E62S58.energyAvailable);
    }
};