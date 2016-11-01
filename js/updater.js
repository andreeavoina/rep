var Updater = (function () {

	var updater = {};
	
	var objects = [];
	
	updater.Add = function(obj){
		objects.push(obj);
	}
	
	updater.Remove = function(obj){
		var index = objects.indexOf(obj);
		if(index !== -1)
			objects.splice(index, 1);
	}
	
	updater.Update = function(){
		
		for(var i = 0; i < objects.length; i++){
			objects[i].Update();
		}
		
	};
	
	return updater;

}());