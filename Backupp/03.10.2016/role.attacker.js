module.exports = {
    run: function(creep){
        if (creep.memory.working == true) {
            creep.moveTo(Game.flags.TowerBait);
        }
    }
};