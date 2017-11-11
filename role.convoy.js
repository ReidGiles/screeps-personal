var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");

module.exports = {
    run: function(creep){
        if (creep.room.name != "E62S59") {
            creep.moveTo(Game.flags.R4Rally);
        }
        else {
            roleBuilder.run(creep);
        }
    }
};