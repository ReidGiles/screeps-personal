require("prototype.spawn")();
var roleHarvester = require("role.harvester");
var roleHarvester2 = require("role.harvester2");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer")
var roleWallRepairer = require("role.wallRepairer")
var roleAttacker = require("role.attacker");
var roleClaimer = require("role.claimer");
var roleConvoy = require("role.convoy");
var roleCargo = require("role.cargo");
var roleSurplusUpgrader = require("role.SurplusUpgrader");
var roleExtensionFiller = require("role.extensionFiller");
var roleHealer = require("role.healer");
var roleTowerBait = require("role.towerBait")
var roleSpiderTankAttacker = require("role.spiderTankAttacker");
var roleMineralHarvester = require("role.mineralHarvester");
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
        if (creep.memory.role == "harvester2") {
            roleHarvester2.run(creep);
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
        else if (creep.memory.role == "extensionFiller") {
            roleExtensionFiller.run(creep);
        }
        else if (creep.memory.role == "healer") {
            roleHealer.run(creep);
        }
        else if (creep.memory.role == "towerBait") {
            roleTowerBait.run(creep);
        }
        else if (creep.memory.role == "spiderTankAttacker") {
            roleSpiderTankAttacker.run(creep);
        }
        else if (creep.memory.role == "mineralHarvester") {
            roleMineralHarvester.run(creep);
        }
    }

    var towers = Game.rooms.E62S58.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var healTarget = tower.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (r) => r.hits < r.hitsMax
        });
        var repairTarget = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: (r) => r.structureType == STRUCTURE_RAMPART
        && r.hits < 200000
        });
        if (target != undefined) {
            tower.attack(target);
        }
        else if (target == undefined && healTarget == undefined) {
            tower.repair(repairTarget);
        }
        else {
            tower.heal(healTarget);
        }
    }

    var towers2 = Game.rooms.E61S58.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers2) {
        var target2 = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target2 != undefined) {
            tower.attack(target2);
        }
        else {
            target2 = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (r) => r.structureType == STRUCTURE_RAMPART
                && r.hits < 50000
            });
            tower.repair(target2);
        }
    }

    var linkMainR1 = Game.getObjectById("58021c880a6a814c35a31519");
    var linkSource2R1 = Game.getObjectById("57f98b704f6b4a4070afeb37");
    if (linkSource2R1.energy == linkSource2R1.energyCapacity) {
        if (linkMainR1.energy == 0) {
            linkSource2R1.transferEnergy(linkMainR1, linkSource2R1.energyCapacity)
        }
    }
    var linkMainR2 = Game.getObjectById("57ff3f1c42003d3e6513f88d");
    var linkSource2R2 = Game.getObjectById("57ff53632683b1b321b2a9e9");
    if (linkSource2R2.energy == linkSource2R2.energyCapacity) {
        if (linkMainR2.energy == 0) {
            linkSource2R2.transferEnergy(linkMainR2, linkSource2R2.energyCapacity)
        }
    }

    var minimumNumberOfHarvesters = 1;
    var minimumNumberOfHarvesters2 = 1;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 1;
    var minimumNumberOfWallRepairers = 0;
    var minimumNumberOfAttackers = 0;
    var minimumNumberOfSpiderTankAttackers = 0;
    var minimumNumberOfCargo = 2;
    var minimumNumberOfSurplusUpgraders = 0;
    var minimumNumberOfExtensionFillers = 1;
    var minimumNumberOfHealers = 0;
    var minimumNumberOfTowerBait = 0;
    var minimumNumberOfMineralHarvesters = 1;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => (c.memory.role == "harvester" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfHarvesters2 = _.sum(Game.creeps, (c) => (c.memory.role == "harvester2" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfUpgraders = _.sum(Game.creeps, (c) => (c.memory.role == "upgrader" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfBuilders = _.sum(Game.creeps, (c) => (c.memory.role == "builder" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfRepairers = _.sum(Game.creeps, (c) => (c.memory.role == "repairer" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => (c.memory.role == "wallRepairer" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfAttackers = _.sum(Game.creeps, (c) => (c.memory.role == "attacker") );
    var numberOfSpiderTankAttackers = _.sum(Game.creeps, (c) => (c.memory.role == "spiderTankAttacker") );
    var numberOfCargo = _.sum(Game.creeps, (c) => (c.memory.role == "cargo" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfSurplusUpgraders = _.sum(Game.creeps, (c) => (c.memory.role == "surplusUpgrader" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfExtensionFillers = _.sum(Game.creeps, (c) => (c.memory.role == "extensionFiller" && c.room.name == Game.spawns.Spawn1.room.name) );
    var numberOfHealers = _.sum(Game.creeps, (c) => (c.memory.role == "healer") );
    var numberOfTowerBait = _.sum(Game.creeps, (c) => (c.memory.role == "towerBait") );
    var numberOfMineralHarvesters = _.sum(Game.creeps, (c) => (c.memory.role == "mineralHarvester" && c.room.name == Game.spawns.Spawn1.room.name) );

    var name = undefined;

    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], undefined,
            { role: 'harvester', working: false, room: "R1", sourceId: -1});

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0 && numberOfCargo != 0) {
            name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
                { role: 'harvester', working: false, room: "R1"});
        }

    }
    if (numberOfHarvesters2 < minimumNumberOfHarvesters2) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], undefined,
            { role: 'harvester2', working: false, room: "R1", sourceId: -1});
    }
    else if ( (numberOfUpgraders < minimumNumberOfUpgraders) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false, room: "R1", sourceId: -1});
    }
    else if ( (numberOfCargo < minimumNumberOfCargo) ) {
        name = Game.spawns.Spawn1.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'cargo', working: false, mode: "energy", room: "R1", sourceId: -1});

        /*if (name == ERR_NOT_ENOUGH_ENERGY && numberOfCargo == 0) {
         name = Game.spawns.Spawn1.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined,
         { role: 'cargo', working: false, room: "R1"});
         }*/
    }
    else if ( (numberOfExtensionFillers < minimumNumberOfExtensionFillers) ) {
        name = Game.spawns.Spawn1.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined,
            { role: 'extensionFiller', working: false, room: "R1", sourceId: -1});

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfCargo == 0) {
            name = Game.spawns.Spawn1.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE], undefined,
                { role: 'extensionFiller', working: false, room: "R1", sourceId: -1});
        }
    }
    else if ( (numberOfRepairers < minimumNumberOfRepairers) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined,
            { role: 'repairer', working: false, room: "R1", sourceId: -1});
    }
    else if ( (numberOfBuilders < minimumNumberOfBuilders) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'builder', working: false, room: "R1", sourceId: -1});
    }
    else if ( (numberOfMineralHarvesters < minimumNumberOfMineralHarvesters) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'mineralHarvester', working: false, room: "R1", sourceId: -1});
    }
    else if ( (numberOfWallRepairers < minimumNumberOfWallRepairers) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'wallRepairer', working: false, room: "R1", sourceId: -1});
    }
    else if ( (numberOfSurplusUpgraders < minimumNumberOfSurplusUpgraders) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'surplusUpgrader', working: false, room: "R1", sourceId: -1});
    }
    else if ( (numberOfAttackers < minimumNumberOfAttackers) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], undefined,
            { role: 'attacker', working: true, room: "R1", sourceId: -1});
    }
    else if ( (numberOfSpiderTankAttackers < minimumNumberOfSpiderTankAttackers) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL], undefined,
            { role: 'spiderTankAttacker', working: true, room: "R1", sourceId: -1});
    }
    else if ( (numberOfHealers < minimumNumberOfHealers) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([HEAL,HEAL,HEAL,MOVE,MOVE], undefined,
            { role: 'healer', working: true, room: "R1", sourceId: -1});
    }
    else if ( (numberOfTowerBait < minimumNumberOfTowerBait) && (numberOfHarvesters == minimumNumberOfHarvesters) ) {
        name = Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'towerBait', working: true, room: "R1", sourceId: -1});
    }

    else {
        //name = Game.spawns.Spawn1.createCreep([MOVE,RANGED_ATTACK], undefined,
        //{ role: 'attacker', working: true});
        name = -1;
    }

    if (!(name < 0)) {
        console.log("R1: Spawned new " + Game.creeps[name].memory.role + " creep: " + name);
    }

    var minimumNumberOfHarvestersS2 = 1;
    var minimumNumberOfHarvesters2S2 = 1;
    var minimumNumberOfUpgradersS2 = 1;
    var minimumNumberOfBuildersS2 = 5;
    var minimumNumberOfRepairersS2 = 1;
    var minimumNumberOfWallRepairersS2 = 0;
    var minimumNumberOfAttackersS2 = 0;
    var minimumNumberOfCargoS2 = 2;
    var minimumNumberOfExtensionFillersS2 = 1;
    var numberOfHarvestersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "harvester" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfHarvesters2S2 = _.sum(Game.creeps, (c) => (c.memory.role == "harvester2" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfUpgradersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "upgrader" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfBuildersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "builder" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfRepairersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "repairer" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfWallRepairersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "wallRepairer" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfAttackersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "attacker" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfCargoS2 = _.sum(Game.creeps, (c) => (c.memory.role == "cargo" && c.room.name == Game.spawns.Spawn2.room.name) );
    var numberOfExtensionFillersS2 = _.sum(Game.creeps, (c) => (c.memory.role == "extensionFiller" && c.room.name == Game.spawns.Spawn2.room.name) );



    if (numberOfHarvestersS2 < minimumNumberOfHarvestersS2) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], undefined,
            { role: 'harvester', working: false, room: "R2"});

        /*if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvestersS2 == 0) {
         name = Game.spawns.Spawn2.createCreep([WORK,WORK,CARRY,MOVE], undefined,
         { role: 'harvester', working: false, room: "R2", sourceId: -1});
         }*/
    }
    else if (numberOfCargoS2 < minimumNumberOfCargoS2) {
        name = Game.spawns.Spawn2.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'cargo', working: false, room: "R2", sourceId: -1});

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfCargoS2 == 0) {
            name = Game.spawns.Spawn2.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined,
                { role: 'cargo', working: false, room: "R2", sourceId: -1});
        }
    }
    else if ( (numberOfExtensionFillersS2 < minimumNumberOfExtensionFillersS2) ) {
        name = Game.spawns.Spawn2.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'extensionFiller', working: false, room: "R2", sourceId: -1});

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfCargoS2 == 0) {
            name = Game.spawns.Spawn2.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined,
                { role: 'extensionFiller', working: false, room: "R2", sourceId: -1});
        }
    }
    else if (numberOfHarvesters2S2 < minimumNumberOfHarvesters2S2) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'harvester2', working: false, room: "R2"});
    }
    else if (numberOfUpgradersS2 < minimumNumberOfUpgradersS2) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false, room: "R2", sourceId: -1});
    }
    else if ( (numberOfRepairersS2 < minimumNumberOfRepairersS2) && (numberOfHarvestersS2 == minimumNumberOfHarvestersS2) ) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined,
            { role: 'repairer', working: false, room: "R2", sourceId: -1});
    }
    else if (numberOfBuildersS2 < minimumNumberOfBuildersS2) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'builder', working: false, room: "R2", sourceId: -1});
    }
    else if ( (numberOfWallRepairersS2 < minimumNumberOfWallRepairersS2) && (numberOfHarvestersS2 == minimumNumberOfHarvestersS2) ) {
        name = Game.spawns.Spawn2.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined,
            { role: 'wallRepairer', working: false, room: "R2", sourceId: -1});
    }
    else if ( (numberOfAttackersS2 < minimumNumberOfAttackersS2) && (numberOfHarvestersS2 == minimumNumberOfHarvestersS2) ) {
        name = Game.spawns.Spawn2.createCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK], undefined,
            { role: 'attacker', working: true, room: "R2", sourceId: -1});
    }

    else {
        //name = Game.spawns.Spawn2.createCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK], undefined,
        //{ role: 'attacker', working: true});
        name = -1;
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
        console.log("CPU Bucket: " + Game.cpu.bucket);
    }
};