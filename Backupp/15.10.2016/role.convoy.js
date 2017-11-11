var roleBuilder = require("role.builder");

module.exports = {
    run: function(creep){
        if (creep.room.name != Game.spawns.Spawn2.room.name) {
            creep.moveTo(Game.flags.R2Rally);
        }
        else {
            //roleBuilder.run(creep);
        }
    }
};