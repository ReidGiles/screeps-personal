var roleUpgrader = require("role.upgrader");

module.exports = {
    run: function(creep){
        creep.moveTo(Game.flags.ClaimFlag);
    }
};