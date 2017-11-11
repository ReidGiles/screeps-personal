module.exports = {
    run: function(creep){
    	var total = _.sum(creep.carry);
        if (creep.memory.working == true && total == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && total == creep.carryCapacity) {
            creep.memory.working = true;
        }

        var R2Terminal = Game.getObjectById("580bdbfc68d28e4e5062b997");
        var R3Storage = Game.getObjectById("5807ea975477d28967b6e840");

        if (creep.memory.working == true) {
        	creep.moveTo(R2Terminal);
            creep.transfer(R2Terminal, RESOURCE_HYDROGEN);
        }

        else {
        	creep.moveTo(R3Storage);
        	creep.withdraw(R3Storage, RESOURCE_HYDROGEN);
        }
    }
};