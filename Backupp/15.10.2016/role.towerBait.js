module.exports = {
    run: function(creep){

        if (creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }

        if (creep.hits < 300) {
            creep.moveTo(Game.flags.HealFlag);
        }
        else if (creep.hits >= 1200) {
            creep.moveTo(Game.flags.TowerBait);
        }
    }
};